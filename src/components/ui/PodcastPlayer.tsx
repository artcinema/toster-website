'use client';

import * as React from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

interface PodcastPlayerProps {
  src: string;
  title: string;
  subtitle?: string;
  autoPlay?: boolean;
}

function formatTime(s: number): string {
  if (isNaN(s) || !isFinite(s)) return '--:--';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

// Deterministic waveform heights seeded from the title
function makeWaveBars(count: number): number[] {
  return Array.from({ length: count }, (_, i) => {
    const v = Math.abs(Math.sin(i * 1.3) * 0.5 + Math.sin(i * 0.4) * 0.3 + Math.sin(i * 2.1) * 0.2);
    return 12 + v * 52;
  });
}

const BARS = makeWaveBars(56);

export function PodcastPlayer({ src, title, subtitle, autoPlay = false }: PodcastPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number>(0);

  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [dragging, setDragging] = React.useState(false);

  // RAF tick — kept in a ref so the recursive `requestAnimationFrame(tick)`
  // call doesn't self-reference inside a useCallback (which the React
  // Compiler flags as "variable used before declared"). `tick` itself
  // is stable (returns the same identity every render) so it's safe
  // to use as a useEffect dependency.
  const draggingRef = React.useRef(dragging);
  draggingRef.current = dragging;
  const tick = React.useCallback(function tickImpl() {
    if (audioRef.current && !draggingRef.current) setCurrentTime(audioRef.current.currentTime);
    rafRef.current = requestAnimationFrame(tickImpl);
  }, []);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onMeta = () => setDuration(audio.duration);
    const onEnded = () => { setPlaying(false); cancelAnimationFrame(rafRef.current); };
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnded);
    if (autoPlay) audio.play().then(() => { setPlaying(true); rafRef.current = requestAnimationFrame(tick); }).catch(() => {});
    return () => {
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, [autoPlay, tick]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); cancelAnimationFrame(rafRef.current); }
    else { a.play(); rafRef.current = requestAnimationFrame(tick); }
    setPlaying(!playing);
  };

  const skip = (delta: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(duration, a.currentTime + delta));
    setCurrentTime(a.currentTime);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    const a = audioRef.current;
    if (!bar || !a || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    a.currentTime = ratio * duration;
    setCurrentTime(a.currentTime);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="overflow-hidden rounded-2xl bg-[#0A0A0A] shadow-2xl">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex flex-col sm:flex-row">
        {/* Cover art */}
        <div className="flex-shrink-0 flex items-center justify-center bg-[#FFD600] sm:w-52 sm:h-52 h-40">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A0A0A]">
              <span className="text-3xl font-black text-[#FFD600]">T</span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A]/60">Podcast</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-6 gap-5">
          {/* Title */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FFD600] mb-1.5">
              Toster · Episode 1
            </p>
            <h3 className="text-lg font-semibold text-white leading-snug">{title}</h3>
            {subtitle && <p className="mt-1 text-sm text-white/40">{subtitle}</p>}
          </div>

          {/* Waveform */}
          <div className="flex items-end gap-[2px] h-12 cursor-pointer" onClick={seek}>
            {BARS.map((h, i) => {
              const barPct = (i / BARS.length) * 100;
              const isPast = barPct <= progress;
              const isNear = Math.abs(barPct - progress) < 4;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-colors duration-150"
                  style={{
                    height: `${h}px`,
                    maxHeight: '48px',
                    backgroundColor: isPast
                      ? isNear && playing ? '#FFE566' : '#FFD600'
                      : 'rgba(255,255,255,0.12)',
                  }}
                />
              );
            })}
          </div>

          {/* Progress bar */}
          <div>
            <div
              ref={progressRef}
              className="relative h-1 w-full cursor-pointer rounded-full bg-white/10 mb-2.5 group"
              onClick={seek as React.MouseEventHandler<HTMLDivElement>}
              onMouseDown={() => setDragging(true)}
              onMouseUp={() => setDragging(false)}
              onMouseMove={(e) => dragging && seek(e)}
            >
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-[#FFD600]"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${progress}% - 7px)` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] tabular-nums text-white/30">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Skip back */}
            <button
              onClick={() => skip(-30)}
              className="group flex flex-col items-center gap-0.5 text-white/40 hover:text-white transition-colors"
              aria-label="Back 30s"
            >
              <SkipBack className="h-4 w-4" />
              <span className="text-[9px] font-medium">30</span>
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFD600] text-[#0A0A0A] shadow-lg hover:bg-[#FFE566] active:scale-95 transition-all"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing
                ? <Pause className="h-6 w-6 fill-[#0A0A0A]" />
                : <Play className="h-6 w-6 fill-[#0A0A0A] translate-x-0.5" />
              }
            </button>

            {/* Skip forward */}
            <button
              onClick={() => skip(30)}
              className="group flex flex-col items-center gap-0.5 text-white/40 hover:text-white transition-colors"
              aria-label="Forward 30s"
            >
              <SkipForward className="h-4 w-4" />
              <span className="text-[9px] font-medium">30</span>
            </button>

            {/* Restart */}
            <button
              onClick={() => skip(-currentTime)}
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Restart"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const a = audioRef.current;
                  if (!a) return;
                  a.muted = !muted;
                  setMuted(!muted);
                }}
                className="text-white/40 hover:text-white transition-colors"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted || volume === 0
                  ? <VolumeX className="h-4 w-4" />
                  : <Volume2 className="h-4 w-4" />
                }
              </button>
              <input
                type="range" min={0} max={1} step={0.02}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setVolume(v);
                  if (audioRef.current) {
                    audioRef.current.volume = v;
                    if (v === 0) setMuted(true);
                    else if (muted) { audioRef.current.muted = false; setMuted(false); }
                  }
                }}
                className="w-20 accent-[#FFD600] cursor-pointer h-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
