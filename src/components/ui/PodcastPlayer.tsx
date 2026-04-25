'use client';

import * as React from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface PodcastPlayerProps {
  src: string;
  title: string;
  subtitle?: string;
  autoPlay?: boolean;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function PodcastPlayer({ src, title, subtitle, autoPlay = false }: PodcastPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const animRef = React.useRef<number>(0);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => { setDuration(audio.duration); setLoading(false); };
    const onEnded = () => setPlaying(false);
    const onError = () => setLoading(false);

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    if (autoPlay) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      cancelAnimationFrame(animRef.current);
    };
  }, [autoPlay]);

  const tick = React.useCallback(() => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    animRef.current = requestAnimationFrame(tick);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      cancelAnimationFrame(animRef.current);
    } else {
      audio.play();
      animRef.current = requestAnimationFrame(tick);
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      if (v === 0) setMuted(true);
      else if (muted) { audioRef.current.muted = false; setMuted(false); }
    }
  };

  const restart = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (!playing) {
      audioRef.current.play();
      animRef.current = requestAnimationFrame(tick);
      setPlaying(true);
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // Waveform bars (decorative, animate when playing)
  const bars = Array.from({ length: 40 }, (_, i) => {
    const h = 20 + Math.sin(i * 0.8) * 14 + Math.sin(i * 0.3) * 10;
    return Math.max(8, Math.min(44, h));
  });

  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Top: title + waveform */}
      <div className="flex items-start gap-4 mb-5">
        {/* Play button */}
        <button
          onClick={togglePlay}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] text-white shadow-md transition-transform hover:scale-105 active:scale-95"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <Pause className="h-5 w-5 fill-white" />
          ) : (
            <Play className="h-5 w-5 fill-white translate-x-0.5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#0A0A0A] text-sm leading-snug truncate">{title}</p>
          {subtitle && <p className="text-xs text-[#A3A3A3] mt-0.5">{subtitle}</p>}

          {/* Waveform */}
          <div className="mt-3 flex items-end gap-[2px] h-11">
            {bars.map((h, i) => {
              const barProgress = (i / bars.length) * 100;
              const isPast = barProgress <= progress;
              return (
                <div
                  key={i}
                  className={`w-[3px] rounded-full transition-colors ${
                    isPast ? 'bg-[#FFD600]' : 'bg-[#E5E5E5]'
                  } ${playing && isPast ? 'animate-pulse' : ''}`}
                  style={{
                    height: `${h}px`,
                    animationDelay: `${i * 30}ms`,
                    animationDuration: `${600 + (i % 5) * 80}ms`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        ref={progressRef}
        className="relative h-1.5 w-full cursor-pointer rounded-full bg-[#F0F0F0] mb-3"
        onClick={handleSeek}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-[#FFD600] transition-[width]"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-[#0A0A0A] border-2 border-white shadow transition-[left]"
          style={{ left: `calc(${progress}% - 7px)` }}
        />
      </div>

      {/* Bottom row: time + controls + volume */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs tabular-nums text-[#A3A3A3] w-[72px]">
          {loading ? '--:--' : formatTime(currentTime)} / {loading ? '--:--' : formatTime(duration)}
        </span>

        <button
          onClick={restart}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors"
          aria-label="Restart"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted || volume === 0 ? (
              <VolumeX className="h-3.5 w-3.5" />
            ) : (
              <Volume2 className="h-3.5 w-3.5" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 accent-[#FFD600] cursor-pointer h-1"
          />
        </div>
      </div>
    </div>
  );
}
