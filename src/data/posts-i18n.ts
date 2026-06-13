// Localized blog content for priority markets (uk, pl).
// Keyed by post slug -> locale -> { title, excerpt, content }.
// Only the posts/locales present here are treated as real translations; every
// other locale falls back to English and is consolidated to the /en canonical
// (see getPostLocales / getLocalizedPost in posts.ts). HTML structure mirrors
// the English source exactly. Machine-assisted translation — native review
// recommended before large-scale promotion.

export interface PostTranslation {
  title: string;
  excerpt: string;
  content: string;
}

export const postTranslations: Record<string, Partial<Record<string, PostTranslation>>> = {
  'what-is-food-delivery-crm': {
    uk: {
      title: 'Що таке CRM для доставки їжі та навіщо вона вашій мережі',
      excerpt:
        'CRM для доставки їжі — це набагато більше, ніж база клієнтів: вона поєднує замовлення, кухню, кур’єрів, маркетинг і лояльність в один операційний кістяк.',
      content: `
<h2>Що насправді робить CRM для доставки їжі</h2>
<p>Більшість людей, чуючи «CRM», уявляють базу контактів. Для мереж доставки їжі CRM — це щось принципово інше: операційна нервова система, яка в реальному часі поєднує кожну рухому частину бізнесу — замовлення, кухню, кур’єрів, клієнтів, маркетинг і фінанси.</p>
<p>CRM для доставки їжі відстежує не лише те, <em>хто</em> ваші клієнти, а й <em>що</em> вони замовляли, <em>коли</em> замовляли востаннє, скільки витратили за весь час і наскільки ймовірно замовлять знову наступного тижня. Ці дані керують кожним рішенням — від того, кого включити в кампанію реактивації, до того, скільки кур’єрів вивести у дощовий вівторок.</p>

<h2>5 ключових модулів, які повинні бути в кожній CRM для доставки</h2>
<h3>1. Управління замовленнями</h3>
<p>Кожна CRM для доставки починається із замовлень. Але не просто список — а жива Kanban-дошка, що показує кожне замовлення від оформлення до доставки, по всіх каналах: телефон, веб, Telegram-бот, агрегатори на кшталт Bolt Food, Glovo чи Wolt, і ваш власний застосунок. Замовлення мають надходити автоматично, призначатися на правильний кухонний підрозділ за його завантаженням і бути видимими менеджерам, диспетчерам і клієнтам одночасно.</p>

<h3>2. Профілі клієнтів з RFM-оцінкою</h3>
<p>Належна CRM для доставки будує 360° профіль кожного клієнта: історія замовлень, життєва цінність, RFM-оцінка (Recency, Frequency, Monetary), ризик відтоку, журнал комунікацій, бонусний баланс і прогноз майбутніх витрат на основі ШІ. Саме ці дані відрізняють мережу доставки, що зростає, від тієї, що стоїть на місці.</p>

<h3>3. Двигун лояльності та промо</h3>
<p>Кешбек, промокоди, реферальні програми, корпоративні рахунки — усе це має жити всередині CRM, а не в окремому інструменті. Коли лояльність відірвана від управління замовленнями, ви втрачаєте здатність прив’язувати кампанії до виручки та запобігати шахрайству.</p>

<h3>4. Автоматизація маркетингу</h3>
<p>CRM має запускати кампанії автоматично: вітальне повідомлення після першого замовлення, пропозицію реактивації після 14 днів мовчання, знижку до дня народження за тиждень до нього. Ці автоматизації працюють цілодобово й зазвичай дають 15–25% усієї виручки у зрілих операціях доставки.</p>

<h3>5. Аналітика та звітність</h3>
<p>Виручка за локаціями, утримання когорт, атрибуція маркетингу, P&L по підрозділах — ваша CRM має показувати це без потреби в BI-аналітику. Оператори, які щодня дивляться на свої цифри, приймають кращі рішення щодо персоналу, раніше помічають слабкі локації та запускають розумніші акції.</p>

<h2>CRM vs. POS vs. панель агрегатора</h2>
<p>Багато операторів доставки плутають ці три інструменти. POS обробляє оплату в точці продажу. Панель агрегатора (Bolt, Glovo, Wolt) показує замовлення лише з цієї платформи. CRM володіє відносинами з клієнтом по всіх каналах і точках контакту. Без CRM ви летите наосліп — знаєте, що замовлено, але не знаєте, хто замовляє, чому йдуть і як їх повернути.</p>

<h2>Коли мережі доставки потрібна CRM?</h2>
<p>Чесна відповідь: якомога раніше, але точно до того, як у вас з’явиться більше однієї локації. Оператори з однією точкою можуть обходитися простішими інструментами. Багатолокаційні мережі одразу стикаються з проблемами координації — синхронізація запасів, відстеження ефективності по підрозділах, маршрутизація кур’єрів між зонами — які може вирішити лише спеціалізована CRM для доставки.</p>
<p>Прихована ціна відсутності CRM — це не лише втрачені кампанії. Це менеджери, які щодня годинами перекладають дані між інструментами, дубльована робота між локаціями і дані клієнтів, розкидані по таблицях, чатах WhatsApp та експортах агрегаторів, які нікому звіряти.</p>

<h2>На що звертати увагу при виборі CRM для доставки їжі</h2>
<ul>
<li><strong>Багатоканальний прийом замовлень</strong> — телефон, веб, застосунок, агрегатори в одній черзі</li>
<li><strong>Видимість кухні та кур’єрів у реальному часі</strong> — менеджери не мають здогадуватися</li>
<li><strong>Вбудована лояльність, а не сторонній плагін</strong> — фрагментація вбиває атрибуцію</li>
<li><strong>Автоматизація маркетингу із сегментацією</strong> — на основі RFM, а не просто масові розсилки</li>
<li><strong>Підтримка кількох локацій від першого дня</strong> — додавання локації не має вимагати ІТ-робіт</li>
<li><strong>Фіскальна відповідність для вашої країни</strong> — особливо критично у Східній Європі та ЄС</li>
</ul>

<h2>Підсумок</h2>
<p>CRM для доставки їжі — не розкіш для великих мереж. Це інфраструктура, яка робить масштабування можливим без пропорційного нарощування штату. Мережі, які рано інвестують у належні CRM-інструменти, стабільно випереджають тих, хто намагається зліпити докупи таблиці, панелі агрегаторів і розрізнені маркетингові інструменти.</p>
<p>Якщо ви працюєте на 2+ локаціях і не маєте єдиної CRM, ви щодня залишаєте гроші на столі.</p>
    `,
    },
    pl: {
      title: 'Czym jest CRM dla dostaw jedzenia i dlaczego twoja sieć go potrzebuje',
      excerpt:
        'CRM dla dostaw jedzenia to znacznie więcej niż baza klientów — łączy zamówienia, kuchnię, kurierów, marketing i lojalność w jeden operacyjny kręgosłup.',
      content: `
<h2>Co CRM dla dostaw jedzenia naprawdę robi</h2>
<p>Większość osób, słysząc „CRM”, myśli o bazie kontaktów. Dla sieci dostaw jedzenia CRM to coś zupełnie innego: operacyjny układ nerwowy, który w czasie rzeczywistym łączy każdy ruchomy element firmy — zamówienia, kuchnię, kurierów, klientów, marketing i finanse.</p>
<p>CRM dla dostaw jedzenia śledzi nie tylko to, <em>kim</em> są twoi klienci, ale też <em>co</em> zamówili, <em>kiedy</em> zamówili ostatnio, ile wydali przez cały okres i jak prawdopodobne jest, że zamówią ponownie w przyszłym tygodniu. Te informacje napędzają każdą decyzję — od tego, których klientów objąć kampanią reaktywacyjną, po to, ilu kurierów zaplanować na deszczowy wtorek.</p>

<h2>5 kluczowych modułów, które musi mieć każdy CRM dla dostaw</h2>
<h3>1. Zarządzanie zamówieniami</h3>
<p>Każdy CRM dla dostaw zaczyna się od zamówień. Ale nie zwykła lista — żywa tablica Kanban pokazująca każde zamówienie od złożenia po dostawę, we wszystkich kanałach: telefon, web, bot Telegram, agregatory takie jak Bolt Food, Glovo czy Wolt oraz twoja własna aplikacja. Zamówienia powinny napływać automatycznie, trafiać do właściwego oddziału kuchni według jego obciążenia i być widoczne jednocześnie dla menedżerów, dyspozytorów i klientów.</p>

<h3>2. Profile klientów z oceną RFM</h3>
<p>Prawdziwy CRM dla dostaw buduje profil 360° każdego klienta: historię zamówień, wartość życiową, ocenę RFM (Recency, Frequency, Monetary), ryzyko odejścia, dziennik komunikacji, saldo lojalnościowe oraz prognozę przyszłych wydatków opartą na AI. To właśnie te dane odróżniają rosnącą sieć dostaw od tej, która stoi w miejscu.</p>

<h3>3. Silnik lojalności i promocji</h3>
<p>Cashback, kody promocyjne, programy poleceń, konta firmowe — wszystko to musi żyć wewnątrz CRM, a nie w osobnym narzędziu. Gdy lojalność jest odłączona od zarządzania zamówieniami, tracisz możliwość przypisania kampanii do przychodu i zapobiegania nadużyciom.</p>

<h3>4. Automatyzacja marketingu</h3>
<p>CRM powinien uruchamiać kampanie automatycznie: wiadomość powitalną po pierwszym zamówieniu, ofertę reaktywacyjną po 14 dniach ciszy, zniżkę urodzinową tydzień przed urodzinami. Te automatyzacje działają całą dobę i zwykle odpowiadają za 15–25% całego przychodu w dojrzałych operacjach dostawczych.</p>

<h3>5. Analityka i raportowanie</h3>
<p>Przychód według lokalizacji, retencja kohort, atrybucja marketingu, P&L na oddział — twój CRM powinien to pokazywać bez potrzeby analityka BI. Operatorzy, którzy codziennie sprawdzają swoje liczby, podejmują lepsze decyzje kadrowe, wcześniej wychwytują słabsze lokalizacje i prowadzą mądrzejsze promocje.</p>

<h2>CRM vs. POS vs. panel agregatora</h2>
<p>Wielu operatorów dostaw myli te trzy narzędzia. POS obsługuje płatność w punkcie sprzedaży. Panel agregatora (Bolt, Glovo, Wolt) pokazuje zamówienia tylko z tej platformy. CRM jest właścicielem relacji z klientem we wszystkich kanałach i punktach styku. Bez CRM lecisz na ślepo — wiesz, co zamówiono, ale nie wiesz, kto zamawia, dlaczego odchodzi i jak go odzyskać.</p>

<h2>Kiedy sieć dostaw powinna wdrożyć CRM?</h2>
<p>Szczera odpowiedź: jak najwcześniej, ale na pewno zanim będziesz mieć więcej niż jedną lokalizację. Operatorzy z jednym punktem poradzą sobie prostszymi narzędziami. Sieci wielolokalizacyjne natychmiast napotykają problemy koordynacji — synchronizację zapasów, śledzenie wyników na poziomie oddziału, trasowanie kurierów między strefami — które rozwiązać może tylko dedykowany CRM dla dostaw.</p>
<p>Ukryty koszt braku CRM to nie tylko pominięte kampanie. To menedżerowie spędzający codziennie godziny na przerzucaniu danych między narzędziami, zdublowana praca między lokalizacjami i dane klientów rozproszone po arkuszach, wątkach WhatsApp i eksportach agregatorów, których nikt nie ma czasu uzgodnić.</p>

<h2>Na co zwrócić uwagę przy wyborze CRM dla dostaw jedzenia</h2>
<ul>
<li><strong>Wielokanałowy przyjm zamówień</strong> — telefon, web, aplikacja, agregatory w jednej kolejce</li>
<li><strong>Widoczność kuchni i kurierów w czasie rzeczywistym</strong> — menedżerowie nie powinni zgadywać</li>
<li><strong>Wbudowana lojalność, a nie wtyczka zewnętrzna</strong> — fragmentacja zabija atrybucję</li>
<li><strong>Automatyzacja marketingu z segmentacją</strong> — oparta na RFM, a nie zwykłe masowe maile</li>
<li><strong>Obsługa wielu lokalizacji od pierwszego dnia</strong> — dodanie lokalizacji nie powinno wymagać prac IT</li>
<li><strong>Zgodność fiskalna dla twojego kraju</strong> — szczególnie istotna w Europie Środkowo-Wschodniej i UE</li>
</ul>

<h2>Podsumowanie</h2>
<p>CRM dla dostaw jedzenia to nie luksus dla dużych sieci. To infrastruktura, która umożliwia skalowanie bez proporcjonalnego zwiększania zatrudnienia. Sieci, które wcześnie inwestują w porządne narzędzia CRM, konsekwentnie wyprzedzają te, które próbują sklejać arkusze, panele agregatorów i rozłączone narzędzia marketingowe.</p>
<p>Jeśli działasz w 2+ lokalizacjach i nie masz jednolitego CRM, codziennie zostawiasz pieniądze na stole.</p>
    `,
    },
  },

  'kitchen-display-system-guide': {
    uk: {
      title: 'Система кухонного дисплея (KDS): повний посібник для мереж доставки',
      excerpt:
        'Паперові чеки сповільнюють кухню та спричиняють помилки. KDS поєднує потік замовлень напряму з екраном кожного кухаря — без чеків, без криків, без помилок.',
      content: `
<h2>Що таке система кухонного дисплея?</h2>
<p>Система кухонного дисплея (KDS) — це екранний інтерфейс, що показує замовлення кухонному персоналу в реальному часі. Замість паперових чеків, надрукованих із POS, замовлення з’являються на екрані миттєво в момент оформлення клієнтом — через застосунок, сайт, телефон чи агрегатор доставки.</p>
<p>Саме для мереж доставки їжі KDS не є опціональним. Це різниця між кухнею, що обробляє 80 замовлень за зміну, і тією, що «згорає» на 50.</p>

<h2>Як KDS працює в мережі доставки</h2>
<p>Коли замовлення надходить — з будь-якого каналу — CRM скеровує його на правильний кухонний підрозділ за зоною доставки клієнта, поточним завантаженням підрозділу та доступністю кур’єрів. Замовлення одразу з’являється на екрані KDS, показуючи кожну позицію, особливі побажання та цільовий час приготування.</p>
<p>В операціях із кількома типами продуктів (суші, піца, гарячі страви) KDS може розділити замовлення між станціями. Кожен кухар бачить лише свою частину. Таймер запускається автоматично. Коли його частина готова, він позначає її виконаною. Система чекає завершення всіх станцій, перш ніж перевести замовлення на пакування.</p>

<h2>KDS vs. паперові чеки: реальні цифри</h2>
<p>Системи паперових чеків підводять трьома конкретними способами, що коштують мережам доставки грошей:</p>
<ul>
<li><strong>Втрата чеків</strong> — паперові чеки намокають, губляться або плутаються в порядку в години пік. Загублені чеки означають скасовані замовлення та повернення коштів.</li>
<li><strong>Відсутність видимості</strong> — менеджер, що дивиться на паперові чеки, не має уявлення, скільки кожне замовлення вже готується. KDS показує час очікування для кожного активного замовлення, підсвічений червоним при простроченні.</li>
<li><strong>Ручна праця</strong> — хтось має друкувати, сортувати й розподіляти паперові чеки. Час цієї людини краще витратити на контроль якості.</li>
</ul>
<p>Операції, що переходять із паперових чеків на KDS, зазвичай бачать зростання пропускної здатності кухні на 20–30% уже в перший місяць і відчутне зниження кількості помилок у замовленнях.</p>

<h2>Ключові функції, на які варто звертати увагу в KDS</h2>
<h3>Потік замовлень у реальному часі</h3>
<p>Замовлення мають з’являтися за секунди після оформлення. Будь-яка затримка між замовленням і відображенням створює вікно для помилок і скарг клієнтів на пізні доставки.</p>

<h3>Призначення по станціях</h3>
<p>На кухнях із кількома продуктами один кухар не повинен бачити все. Хороший KDS скеровує позиції на правильну станцію: суші-роли на один екран, гарячі страви на інший, перевірку пакування на третій.</p>

<h3>Пріоритет на основі таймера</h3>
<p>KDS має візуально підсвічувати замовлення, що відстають від графіка. Колірне кодування (зелений → жовтий → червоний) дає кухарям і менеджерам миттєвий огляд статусу без потреби перевіряти окрему панель.</p>

<h3>Інтеграція з диспетчеризацією кур’єрів</h3>
<p>KDS, ізольований від диспетчеризації кур’єрів, створює проблему координації: кухня завершує замовлення, але немає готового кур’єра. Найкращі впровадження KDS обмінюються живими даними з системою диспетчеризації, тож кур’єри призначаються до того, як замовлення готове, а не після.</p>

<h2>KDS і відстеження ефективності кухарів</h2>
<p>Добре впроваджений KDS автоматично збирає дані про ефективність на рівні кухаря: скільки позицій кожен кухар приготував за зміну, його середній час на позицію та частоту помилок. Ці дані цінні для складання графіків, оцінювання ефективності та виявлення потреб у навчанні — без ручного обліку часу чи спостереження керівника.</p>

<h2>Впровадження KDS на вашій кухні</h2>
<p>Фізичне налаштування простіше, ніж очікує більшість операторів. Екран на підставці чи настінному кріпленні, підключений до мережі, з ПЗ KDS. Дисплей має бути видимим з усіх позицій кухні — комерційні екрани 32–43 дюйми добре підходять для більшості розмірів кухонь.</p>
<p>Важливіший виклик — зміна процесів: кухарям, звиклим до паперових чеків, потрібен тиждень-два на адаптацію. Перехідний період зазвичай показує тимчасове падіння пропускної здатності перед стійким покращенням. Заплануйте це й чітко комунікуйте зі своєю кухонною командою.</p>
    `,
    },
    pl: {
      title: 'System wyświetlania zamówień w kuchni (KDS): kompletny przewodnik dla sieci dostaw',
      excerpt:
        'Papierowe bony spowalniają kuchnię i powodują błędy. KDS łączy przepływ zamówień bezpośrednio z ekranem każdego kucharza — bez bonów, bez krzyku, bez pomyłek.',
      content: `
<h2>Czym jest system wyświetlania zamówień w kuchni?</h2>
<p>System wyświetlania zamówień w kuchni (KDS) to ekranowy interfejs pokazujący napływające zamówienia personelowi kuchni w czasie rzeczywistym. Zamiast papierowych bonów drukowanych z POS, zamówienia pojawiają się na ekranie natychmiast w chwili złożenia przez klienta — czy to przez aplikację, stronę, telefon czy agregatora dostaw.</p>
<p>Właśnie dla sieci dostaw jedzenia KDS nie jest opcjonalny. To różnica między kuchnią obsługującą 80 zamówień na zmianę a taką, która „wypala się” przy 50.</p>

<h2>Jak KDS działa w sieci dostaw</h2>
<p>Gdy zamówienie napływa — z dowolnego kanału — CRM kieruje je do właściwego oddziału kuchni na podstawie strefy dostawy klienta, bieżącego obciążenia oddziału i dostępności kurierów. Zamówienie natychmiast pojawia się na ekranie KDS, pokazując każdą pozycję, ewentualne uwagi specjalne i docelowy czas przygotowania.</p>
<p>W operacjach z wieloma typami produktów (sushi, pizza, dania gorące) KDS może podzielić zamówienie między stanowiska. Każdy kucharz widzi tylko swoją część. Timer startuje automatycznie. Gdy jego część jest gotowa, oznacza ją jako wykonaną. System czeka na ukończenie wszystkich stanowisk, zanim przeniesie zamówienie do pakowania.</p>

<h2>KDS vs. papierowe bony: realne liczby</h2>
<p>Systemy papierowych bonów zawodzą na trzy konkretne sposoby, które kosztują sieci dostaw pieniądze:</p>
<ul>
<li><strong>Utrata bonów</strong> — papierowe bony moczą się, gubią lub mieszają w kolejności w godzinach szczytu. Zgubione bony to anulowane zamówienia i zwroty.</li>
<li><strong>Brak widoczności</strong> — menedżer patrzący na papierowe bony nie ma pojęcia, jak długo każde zamówienie już się gotuje. KDS pokazuje czas oczekiwania dla każdego aktywnego zamówienia, podświetlony na czerwono przy przekroczeniu terminu.</li>
<li><strong>Praca ręczna</strong> — ktoś musi drukować, sortować i rozdzielać papierowe bony. Czas tej osoby lepiej spożytkować na kontrolę jakości.</li>
</ul>
<p>Operacje przechodzące z papierowych bonów na KDS zwykle obserwują wzrost przepustowości kuchni o 20–30% już w pierwszym miesiącu i wymierny spadek liczby błędów w zamówieniach.</p>

<h2>Kluczowe funkcje, na które warto zwrócić uwagę w KDS</h2>
<h3>Przepływ zamówień w czasie rzeczywistym</h3>
<p>Zamówienia powinny pojawiać się w ciągu sekund od złożenia. Każde opóźnienie między zamówieniem a wyświetleniem tworzy okno na błędy i skargi klientów na spóźnione dostawy.</p>

<h3>Przypisanie według stanowisk</h3>
<p>W kuchniach wieloproduktowych jeden kucharz nie powinien widzieć wszystkiego. Dobry KDS kieruje pozycje na właściwe stanowisko: rolki sushi na jeden ekran, dania gorące na drugi, weryfikację pakowania na trzeci.</p>

<h3>Priorytet oparty na timerze</h3>
<p>KDS powinien wizualnie podświetlać zamówienia, które wypadają z grafiku. Kodowanie kolorami (zielony → żółty → czerwony) daje kucharzom i menedżerom natychmiastowy przegląd statusu bez potrzeby sprawdzania osobnego panelu.</p>

<h3>Integracja z dyspozycją kurierów</h3>
<p>KDS odizolowany od dyspozycji kurierów tworzy problem koordynacji: kuchnia kończy zamówienie, ale nie ma gotowego kuriera. Najlepsze wdrożenia KDS wymieniają dane na żywo z systemem dyspozycji, więc kurierzy są przydzielani zanim zamówienie jest gotowe, a nie po.</p>

<h2>KDS i śledzenie wydajności kucharzy</h2>
<p>Dobrze wdrożony KDS automatycznie zbiera dane o wydajności na poziomie kucharza: ile pozycji każdy kucharz przygotował na zmianę, jego średni czas na pozycję i wskaźnik błędów. Te dane są cenne przy układaniu grafików, ocenach wydajności i identyfikowaniu potrzeb szkoleniowych — bez ręcznej ewidencji czasu czy obserwacji przełożonego.</p>

<h2>Wdrożenie KDS w twojej kuchni</h2>
<p>Konfiguracja fizyczna jest prostsza, niż oczekuje większość operatorów. Ekran na stojaku lub uchwycie ściennym, podłączony do sieci, z oprogramowaniem KDS. Wyświetlacz powinien być widoczny ze wszystkich pozycji w kuchni — komercyjne ekrany 32–43 cale dobrze sprawdzają się przy większości rozmiarów kuchni.</p>
<p>Ważniejszym wyzwaniem jest zmiana procesu: kucharze przyzwyczajeni do papierowych bonów potrzebują tygodnia lub dwóch na adaptację. Okres przejściowy zwykle pokazuje chwilowy spadek przepustowości przed trwałą poprawą. Zaplanuj to i jasno komunikuj się ze swoim zespołem kuchni.</p>
    `,
    },
  },

  'ai-voice-operator-food-delivery': {
    uk: {
      title: 'Голосові ШІ-оператори для доставки їжі: як це працює і що вони можуть',
      excerpt:
        'Голосові ШІ-оператори можуть автономно обробляти 70–80% вхідних дзвінків доставки — оформлення замовлень, статуси, зміни адреси — без участі людини.',
      content: `
<h2>Проблема телефонних замовлень</h2>
<p>Телефонні замовлення залишаються значущим каналом для мереж доставки їжі, особливо для старших вікових сегментів і на ринках із нижчим рівнем користування застосунками. Проблема: телефонні замовлення потребують операторів-людей, оператори мають обмежену пропускну здатність, а пропущені дзвінки в години пік означають втрачену виручку та роздратованих клієнтів.</p>
<p>Голосові ШІ-оператори — розмовні ШІ-системи, здатні провести повну телефонну взаємодію із замовленням без участі людини — вирішують цю проблему за частку вартості людського персоналу.</p>

<h2>Що може обробляти голосовий ШІ-оператор</h2>
<p>Сучасні голосові ШІ-системи, побудовані на великих мовних моделях і технології синтезу мовлення, можуть обробляти весь спектр типових сценаріїв дзвінків доставки:</p>
<ul>
<li><strong>Оформлення нового замовлення</strong> — ШІ проводить клієнта через вибір меню, модифікатори, підтвердження адреси та спосіб оплати</li>
<li><strong>Запити про статус замовлення</strong> — ШІ звертається до живої системи замовлень і озвучує поточний статус та орієнтовний час доставки</li>
<li><strong>Зміни замовлення</strong> — зміна адреси, додавання позицій, скасування (де ще можливо)</li>
<li><strong>Запити про бонусний баланс</strong> — ШІ може озвучити бонусний баланс клієнта</li>
<li><strong>Прийом скарг</strong> — ШІ фіксує деталі скарги й ескалює до оператора-людини за потреби</li>
</ul>
<p>Сценарії, де ШІ передає дзвінок людині: складні скарги, що потребують судження, незвичні запити поза структурою меню, і будь-яка ситуація, коли клієнт явно просить людину.</p>

<h2>Технологічний стек за ШІ-операторами доставки</h2>
<p>Голосовий ШІ-оператор для доставки їжі виробничого рівня потребує трьох компонентів: рушія розпізнавання мовлення, що в реальному часі перетворює голос абонента на текст; великої мовної моделі (як-от Claude від Anthropic), що обробляє текст і генерує відповідь; і рушія синтезу мовлення, що перетворює відповідь назад на природне звучання.</p>
<p>Критична інтеграція — між мовною моделлю та живою системою управління замовленнями. ШІ має вміти читати меню, перевіряти наявність позицій, запитувати історію замовлень клієнта, оформлювати замовлення та оновлювати статус — усе в реальному часі під час дзвінка. Без цієї інтеграції ви маєте чат-бота, який вміє говорити, але нічого не може реально зробити.</p>

<h2>Реальність впровадження: що насправді означає 70–80% автоматизації</h2>
<p>Голосові ШІ-оператори у виробництві зазвичай обробляють автономно 70–80% вхідних дзвінків. Решта 20–30% ескалюються до операторів-людей — складні ситуації, літні клієнти, яким важко із системою, або дзвінки під час технічних проблем.</p>
<p>Вплив на бізнес: мережа, що отримує 300 дзвінків на день у пікові періоди, може скоротити штат операторів на 60–70%, при цьому фактично покращивши доступність (у ШІ ніколи немає черги в години пік). Економія зазвичай окупає технологію за 3–6 місяців.</p>

<h2>Багатомовна підтримка</h2>
<p>Для мереж, що працюють через мовні кордони, голосові ШІ-оператори дають те, що оператори-люди рідко можуть: безшовне багатомовне обслуговування. Дзвінок польською, українською, німецькою чи іспанською обробляється цією мовою без переведення на оператора конкретної мови. Для багатокраїнних мереж лише це виправдовує інвестицію.</p>

<h2>Питання якості</h2>
<p>Найпоширеніше занепокоєння щодо голосових ШІ-операторів — прийняття клієнтами. Чесна відповідь: багато клієнтів надають перевагу саме цьому. ШІ завжди доступний, ніколи не нетерплячий, не відволікається й ніколи не дає відчути, що замовлення — це незручність. Ключовий принцип дизайну — прозорість: ШІ має представлятися як ШІ-асистент на початку дзвінка й легко давати змогу зв’язатися з людиною за бажанням.</p>
    `,
    },
    pl: {
      title: 'Głosowi operatorzy AI dla dostaw jedzenia: jak to działa i co obsłużą',
      excerpt:
        'Głosowi operatorzy AI mogą autonomicznie obsłużyć 70–80% przychodzących połączeń — składanie zamówień, statusy, zmiany adresu — bez udziału człowieka.',
      content: `
<h2>Problem zamówień telefonicznych</h2>
<p>Zamówienia telefoniczne pozostają istotnym kanałem dla sieci dostaw jedzenia, zwłaszcza w starszych segmentach demograficznych i na rynkach o niższym poziomie korzystania z aplikacji. Problem: zamówienia telefoniczne wymagają operatorów-ludzi, operatorzy mają ograniczoną przepustowość, a nieodebrane połączenia w godzinach szczytu oznaczają utracony przychód i sfrustrowanych klientów.</p>
<p>Głosowi operatorzy AI — konwersacyjne systemy AI zdolne przeprowadzić pełną telefoniczną interakcję zamówienia bez udziału człowieka — rozwiązują ten problem za ułamek kosztu obsady ludzkiej.</p>

<h2>Co głosowy operator AI potrafi obsłużyć</h2>
<p>Nowoczesne systemy głosowe AI, oparte na dużych modelach językowych i technologii syntezy mowy, potrafią obsłużyć cały zakres typowych scenariuszy połączeń dostawczych:</p>
<ul>
<li><strong>Złożenie nowego zamówienia</strong> — AI przeprowadza klienta przez wybór z menu, modyfikatory, potwierdzenie adresu i metodę płatności</li>
<li><strong>Zapytania o status zamówienia</strong> — AI odpytuje system zamówień na żywo i odczytuje bieżący status oraz szacowany czas dostawy</li>
<li><strong>Modyfikacje zamówienia</strong> — zmiany adresu, dodawanie pozycji, anulowanie (gdy jeszcze możliwe)</li>
<li><strong>Zapytania o saldo lojalnościowe</strong> — AI może odczytać saldo bonusów klienta</li>
<li><strong>Przyjęcie reklamacji</strong> — AI zapisuje szczegóły reklamacji i eskaluje do operatora-człowieka, gdy to konieczne</li>
</ul>
<p>Scenariusze, w których AI eskaluje do człowieka: złożone reklamacje wymagające oceny, nietypowe prośby spoza struktury menu oraz każda sytuacja, gdy klient wyraźnie prosi o człowieka.</p>

<h2>Stos technologiczny za operatorami AI dla dostaw</h2>
<p>Głosowy operator AI dla dostaw jedzenia klasy produkcyjnej wymaga trzech komponentów: silnika zamiany mowy na tekst, który w czasie rzeczywistym przekształca głos dzwoniącego w tekst; dużego modelu językowego (jak Claude od Anthropic), który przetwarza tekst i generuje odpowiedź; oraz silnika syntezy mowy, który zamienia odpowiedź z powrotem na naturalnie brzmiącą mowę.</p>
<p>Kluczowa jest integracja między modelem językowym a systemem zarządzania zamówieniami na żywo. AI musi umieć czytać menu, sprawdzać dostępność pozycji, odpytywać historię zamówień klienta, składać zamówienia i aktualizować ich status — wszystko w czasie rzeczywistym podczas połączenia. Bez tej integracji masz chatbota, który potrafi mówić, ale nic realnie zrobić.</p>

<h2>Rzeczywistość wdrożenia: co naprawdę oznacza 70–80% automatyzacji</h2>
<p>Głosowi operatorzy AI w produkcji zwykle obsługują autonomicznie 70–80% połączeń przychodzących. Pozostałe 20–30% jest eskalowane do operatorów-ludzi — sytuacje złożone, starsi klienci mający trudność z systemem, lub połączenia podczas problemów technicznych.</p>
<p>Wpływ na biznes: sieć odbierająca 300 połączeń dziennie w okresach szczytu może zmniejszyć obsadę operatorów o 60–70%, jednocześnie faktycznie poprawiając dostępność (AI nigdy nie ma kolejki w godzinach szczytu). Oszczędności zwykle zwracają koszt technologii w 3–6 miesięcy.</p>

<h2>Obsługa wielojęzyczna</h2>
<p>Dla sieci działających ponad granicami językowymi głosowi operatorzy AI dają coś, co operatorzy-ludzie rzadko potrafią: bezszwową obsługę wielojęzyczną. Połączenie po polsku, ukraińsku, niemiecku czy hiszpańsku jest obsługiwane w tym języku bez przekierowania do operatora konkretnego języka. Dla sieci wielokrajowych już samo to uzasadnia inwestycję.</p>

<h2>Kwestie jakości</h2>
<p>Najczęstszą obawą dotyczącą głosowych operatorów AI jest akceptacja klientów. Szczera odpowiedź: wielu klientów to woli. AI jest zawsze dostępne, nigdy niecierpliwe, nierozproszone i nigdy nie sprawia, że klient czuje, iż jego zamówienie to kłopot. Kluczową zasadą projektową jest przejrzystość — AI powinno przedstawić się jako asystent AI na początku połączenia i ułatwiać kontakt z człowiekiem, gdy klient woli.</p>
    `,
    },
  },

  'food-delivery-fiscalization-europe': {
    uk: {
      title: 'Фіскалізація доставки їжі в Європі: посібник з відповідності UA, PL, CZ, DE, ES',
      excerpt:
        'Кожна країна має власні фіскальні вимоги до чеків доставки та податкової звітності. Недотримання означає штрафи. Ось що потрібно на кожному ринку.',
      content: `
<h2>Чому фіскалізація важлива для багатокраїнних мереж доставки</h2>
<p>Фіскалізація — електронна передача даних про продажі податковим органам у реальному чи близькому до реального часі — є обов’язковою в кількох європейських країнах. Для мереж доставки їжі, що працюють через кордони, помилка тут означає штрафи, перевірки та потенційну втрату ліцензій на діяльність. Зробити це правильно — нетривіальний технічний виклик, бо кожна країна має власні протоколи, вимоги до сертифікатів і формати звітності.</p>

<h2>Україна: фіскалізація через Checkbox</h2>
<p>Україна використовує систему Checkbox для генерації фіскальних чеків. Кожне замовлення доставки має генерувати фіскальний чек через API Checkbox, який реєструє чек у Державній податковій службі в реальному часі. Чек має містити фіскальний номер оператора, назви та ціни позицій, розбивку ПДВ і QR-код із посиланням на сторінку перевірки Державної податкової служби.</p>
<p>Невидача фіскальних чеків в Україні тягне штрафи до 200% від вартості незареєстрованої операції. Україна агресивно посилює фіскальні вимоги з 2021 року, і інспектори активно перевіряють, щоб доставлені замовлення супроводжувалися дійсними фіскальними чеками.</p>

<h2>Польща: KSeF (Національна система е-фактур)</h2>
<p>Польща переходить на обов’язкову систему KSeF (Krajowy System e-Faktur) для B2B-операцій, з обов’язковим запровадженням для всіх компаній. Для доставки їжі ключова вимога — генерація структурованих XML-фактур для корпоративних клієнтів і узгодження звітності з ПДВ із даними KSeF. Споживчі (B2C) чеки не потребують KSeF, але все одно мають відповідати польським правилам щодо чеків.</p>

<h2>Чехія: EET (Електронна реєстрація продажів)</h2>
<p>Чехія вимагає електронної реєстрації продажів (EET) для операцій доставки їжі. Дані про продажі мають передаватися Податковій і митній адміністрації Чехії в реальному часі, причому кожна операція отримує код підтвердження, який має з’являтися на чеку клієнта. Система EET використовує автентифікацію на основі сертифікатів — оператори мають отримати сертифікат від податкового органу перед запуском.</p>

<h2>Німеччина: Fiskaly / TSE</h2>
<p>Німеччина вимагає, щоб усі касові системи використовували сертифікований модуль технічного захисту (TSE). Для хмарних систем доставки це зазвичай реалізується через провайдерів на кшталт Fiskaly, які пропонують хмарний TSE API. Кожна операція має бути підписана TSE, і підпис має з’являтися на чеку. Чеки обов’язково пропонувати всім клієнтам.</p>

<h2>Іспанія: VeriFacTu</h2>
<p>Іспанія запроваджує VeriFacTu — систему перевірюваних податкових записів, що переходить з добровільної в обов’язкову. Операціям доставки в Іспанії потрібно генерувати сумісні з VeriFacTu фактури для B2B-продажів і бути готовими звітувати безпосередньо до AEAT (Agencia Estatal de Administración Tributaria) у міру того, як система стає обов’язковою.</p>

<h2>США: Stripe Tax</h2>
<p>Хоча це не фіскалізація в європейському розумінні, операції доставки в США мають правильно розраховувати та сплачувати податок із продажів, що різниться за штатом, а іноді й містом. Stripe Tax інтегрується з обробкою платежів, щоб автоматично розраховувати правильний податок і генерувати документацію, потрібну для сплати податку.</p>

<h2>Виклик технічної інтеграції</h2>
<p>Система кожної країни використовує різні API, різні формати сертифікатів, різні вимоги до чеків і різні вимоги до обробки помилок. Мережа доставки, що виходить у нову країну, має закласти 4–8 тижнів розробки на впровадження сумісної фіскалізації — або використати платформу, де ці інтеграції вже готові.</p>
<p>Найважливіше зробити правильно: чеки мають видаватися в момент оплати, а не під час доставки. Якщо ваша система генерує чеки під час доставки, ви вже не відповідаєте вимогам у країнах з фіскальними вимогами в реальному часі.</p>
    `,
    },
    pl: {
      title: 'Fiskalizacja dostaw jedzenia w Europie: przewodnik zgodności UA, PL, CZ, DE, ES',
      excerpt:
        'Każdy kraj ma własne wymogi fiskalne dotyczące paragonów dostaw i raportowania podatkowego. Brak zgodności oznacza kary. Oto czego potrzebujesz na każdym rynku.',
      content: `
<h2>Dlaczego fiskalizacja jest ważna dla wielokrajowych sieci dostaw</h2>
<p>Fiskalizacja — elektroniczne raportowanie danych sprzedażowych organom podatkowym w czasie rzeczywistym lub zbliżonym — jest obowiązkowa w kilku krajach europejskich. Dla sieci dostaw jedzenia działających ponad granicami błąd w tym obszarze oznacza kary, kontrole i potencjalną utratę licencji na działalność. Zrobienie tego dobrze to nietrywialne wyzwanie techniczne, bo każdy kraj ma własne protokoły, wymogi certyfikatów i formaty raportowania.</p>

<h2>Ukraina: fiskalizacja przez Checkbox</h2>
<p>Ukraina używa systemu Checkbox do generowania paragonów fiskalnych. Każde zamówienie dostawy musi wygenerować paragon fiskalny przez API Checkbox, które rejestruje paragon w Państwowej Służbie Podatkowej w czasie rzeczywistym. Paragon musi zawierać numer fiskalny operatora, nazwy i ceny pozycji, rozbicie VAT oraz kod QR linkujący do strony weryfikacji Państwowej Służby Podatkowej.</p>
<p>Niewydanie paragonów fiskalnych na Ukrainie grozi karami do 200% wartości niezarejestrowanej transakcji. Ukraina agresywnie egzekwuje wymogi fiskalne od 2021 roku, a inspektorzy aktywnie sprawdzają, czy dostarczone zamówienia mają ważne paragony fiskalne.</p>

<h2>Polska: KSeF (Krajowy System e-Faktur)</h2>
<p>Polska przechodzi na obowiązkowy KSeF (Krajowy System e-Faktur) dla transakcji B2B, z obowiązkowym wdrożeniem dla wszystkich firm. Dla dostaw jedzenia kluczowym wymogiem jest generowanie ustrukturyzowanych faktur XML dla klientów firmowych oraz zapewnienie zgodności raportowania VAT z danymi KSeF. Paragony konsumenckie (B2C) nie wymagają KSeF, ale wciąż muszą być zgodne z polskimi przepisami dotyczącymi paragonów.</p>

<h2>Czechy: EET (Elektroniczna ewidencja sprzedaży)</h2>
<p>Czechy wymagają elektronicznej ewidencji sprzedaży (EET) dla operacji dostaw jedzenia. Dane sprzedażowe muszą być raportowane czeskiej Administracji Podatkowej i Celnej w czasie rzeczywistym, przy czym każda transakcja otrzymuje kod potwierdzenia, który musi pojawić się na paragonie klienta. System EET używa uwierzytelniania opartego na certyfikatach — operatorzy muszą uzyskać certyfikat od organu podatkowego przed uruchomieniem.</p>

<h2>Niemcy: Fiskaly / TSE</h2>
<p>Niemcy wymagają, aby wszystkie systemy kasowe używały certyfikowanego modułu technicznego zabezpieczenia (TSE). Dla chmurowych systemów dostaw realizuje się to zwykle przez dostawców takich jak Fiskaly, oferujących chmurowe API TSE. Każda transakcja musi być podpisana przez TSE, a podpis musi pojawić się na paragonie. Paragony muszą być oferowane wszystkim klientom.</p>

<h2>Hiszpania: VeriFacTu</h2>
<p>Hiszpania wdraża VeriFacTu — system weryfikowalnych zapisów podatkowych, przechodzący z dobrowolnego na obowiązkowy. Operacje dostaw w Hiszpanii muszą generować faktury zgodne z VeriFacTu dla sprzedaży B2B i być gotowe raportować bezpośrednio do AEAT (Agencia Estatal de Administración Tributaria) w miarę jak system staje się obowiązkowy.</p>

<h2>USA: Stripe Tax</h2>
<p>Choć nie jest to fiskalizacja w europejskim rozumieniu, operacje dostaw w USA muszą prawidłowo obliczać i odprowadzać podatek od sprzedaży, który różni się w zależności od stanu, a czasem miasta. Stripe Tax integruje się z obsługą płatności, aby automatycznie obliczać właściwy podatek i generować dokumentację potrzebną do jego odprowadzenia.</p>

<h2>Wyzwanie integracji technicznej</h2>
<p>System każdego kraju używa innych API, innych formatów certyfikatów, innych wymogów paragonowych i innych wymogów obsługi błędów. Sieć dostaw wchodząca na nowy rynek musi założyć 4–8 tygodni prac programistycznych na wdrożenie zgodnej fiskalizacji — albo użyć platformy, która ma te integracje gotowe.</p>
<p>Najważniejsze, by zrobić to dobrze: paragony muszą być wydawane w momencie płatności, a nie przy dostawie. Jeśli twój system generuje paragony przy dostawie, już jesteś niezgodny w krajach z fiskalnymi wymogami czasu rzeczywistego.</p>
    `,
    },
  },

  'glovo-bolt-wolt-aggregator-management': {
    uk: {
      title: 'Керування Glovo, Bolt Food і Wolt: посібник з кількох агрегаторів',
      excerpt:
        'Робота з кількома агрегаторами потужна для охоплення, але складна в керуванні. Ось як високооборотні мережі роблять це, не втрачаючи операційного контролю.',
      content: `
<h2>Чому кілька агрегаторів — це вже базова вимога</h2>
<p>На більшості європейських ринків доставку їжі домінують 2–4 агрегатори: Bolt Food, Glovo, Wolt і Uber Eats разом покривають переважну більшість замовлень, згенерованих агрегаторами. Мережа доставки, присутня лише на одній платформі, залишає на столі 60–70% потенційної виручки від агрегаторів.</p>
<p>Заковика: кожен агрегатор — це окрема система замовлень зі своїм планшетом, своїм інтерфейсом керування меню, своєю панеллю звітності та своєю структурою комісій. Робота з трьома агрегаторами вручну означає потрійний планшетний хаос, потрійне обслуговування меню й жодної єдиної картини загального обсягу замовлень.</p>

<h2>Основна проблема: фрагментація</h2>
<p>Без інтеграції багатоагрегаторна операція виглядає так: три планшети на стійці, кожен показує замовлення з іншої платформи. Кухонний персонал читає замовлення з трьох екранів. Кількість замовлень рахується окремо. Оновлення меню робляться тричі. Дані клієнтів з кожної платформи живуть в екосистемі цієї платформи — ви ними не володієте, не можете їх змістовно експортувати й використати для власної CRM.</p>
<p>Бізнес-наслідок цієї фрагментації: вищі рівні помилок (пропущені замовлення з конкретного планшета), неможливість бачити загальний обсяг замовлень у реальному часі та нуль даних клієнтів від замовлень агрегаторів для власного маркетингу.</p>

<h2>Інтеграція з агрегаторами: що це насправді означає</h2>
<p>Справжня інтеграція з агрегаторами означає, що замовлення з Bolt Food, Glovo та Wolt усі автоматично надходять у вашу центральну систему управління замовленнями, з’являючись на кухонному дисплеї поряд із прямими замовленнями. Окремого планшета немає — або, якщо є, він мовчазний і лише підтверджує замовлення, які ваша центральна система вже прийняла.</p>
<p>Синхронізація меню — друга половина: коли ви змінюєте ціну чи позначаєте позицію як відсутню (86’d) у CRM, ця зміна поширюється на всі лістинги агрегаторів за лічені хвилини. Це усуває розбіжність версій, через яку роздратовані клієнти замовляють недоступні позиції.</p>

<h2>Керування комісіями між платформами</h2>
<p>Комісії агрегаторів коливаються від 15% до 35% залежно від платформи, ринку та узгодженої ставки. Багатоагрегаторна операція має відстежувати виручку, комісію та фактичну маржу окремо за кожною платформою. Якщо структура комісій одного агрегатора робить певні позиції меню збитковими, ви маєте це знати — і або перепогодити умови, або виключити ці позиції з тієї платформи, або підняти ціни саме на ній.</p>
<p>Більшість агрегаторів дозволяють ціноутворення для кожної платформи окремо — ваші ціни на Glovo можуть відрізнятися від цін на Bolt. Оператори, які не використовують цю можливість, зазвичай або завищують ціни на всіх платформах (втрачаючи обсяг), або занижують на високо-комісійних платформах (втрачаючи маржу).</p>

<h2>Канал прямих замовлень</h2>
<p>Стратегічна мета кожної мережі доставки — нарощувати власний канал прямих замовлень (свій застосунок, сайт і телефонні замовлення) за рахунок обсягу агрегаторів. Прямі замовлення мають нульову комісію, і ви володієте відносинами з клієнтом. Агрегатори це знають, тому й обмежують дані, якими діляться з операторами.</p>
<p>Практичний шлях: використовувати агрегатори для виявлення та залучення, а потім конвертувати клієнтів агрегаторів у прямих клієнтів через програми лояльності, кращий сервіс і цілеспрямований маркетинг. Клієнт, що замовляє через Glovo двічі, а потім переходить на ваш прямий застосунок, економить вам 25% комісії на кожному майбутньому замовленні.</p>

<h2>Аналіз ефективності агрегаторів</h2>
<p>Відстежуйте за кожним агрегатором: обсяг замовлень, середній чек, рейтинг клієнтів, вартість комісії та залучення нових клієнтів (на відміну від повторних, що знайшли вас на агрегаторах). Мета — зрозуміти роль кожної платформи у вашій воронці залучення й утримання клієнтів — і відповідно розподіляти промо-бюджет на кожній платформі.</p>
    `,
    },
    pl: {
      title: 'Zarządzanie Glovo, Bolt Food i Wolt: poradnik wielu agregatorów',
      excerpt:
        'Praca z wieloma agregatorami daje zasięg, ale jest złożona w zarządzaniu. Oto jak sieci o dużym wolumenie robią to bez utraty kontroli operacyjnej.',
      content: `
<h2>Dlaczego wiele agregatorów to dziś standard</h2>
<p>Na większości rynków europejskich dostawy jedzenia są zdominowane przez 2–4 agregatory: Bolt Food, Glovo, Wolt i Uber Eats razem pokrywają zdecydowaną większość zamówień generowanych przez agregatory. Sieć dostaw obecna tylko na jednej platformie zostawia na stole 60–70% potencjalnego przychodu z agregatorów.</p>
<p>Haczyk: każdy agregator to osobny system zamówień z własnym tabletem, własnym interfejsem zarządzania menu, własnym panelem raportów i własną strukturą prowizji. Obsługa trzech agregatorów ręcznie oznacza potrójny chaos tabletów, potrójne utrzymanie menu i brak jednolitego obrazu całkowitego wolumenu zamówień.</p>

<h2>Główny problem: fragmentacja</h2>
<p>Bez integracji operacja wieloagregatorowa wygląda tak: trzy tablety na ladzie, każdy pokazuje zamówienia z innej platformy. Personel kuchni czyta zamówienia z trzech ekranów. Liczby zamówień są zliczane osobno. Aktualizacje menu robione są trzykrotnie. Dane klientów z każdej platformy żyją w jej ekosystemie — nie jesteś ich właścicielem, nie możesz ich sensownie wyeksportować ani użyć do własnego CRM.</p>
<p>Biznesowy skutek tej fragmentacji: wyższe wskaźniki błędów (pominięte zamówienia z konkretnego tabletu), brak możliwości zobaczenia całkowitego wolumenu zamówień w czasie rzeczywistym i zero danych klientów z zamówień agregatorów do własnego marketingu.</p>

<h2>Integracja z agregatorami: co to naprawdę oznacza</h2>
<p>Prawdziwa integracja z agregatorami oznacza, że zamówienia z Bolt Food, Glovo i Wolt napływają automatycznie do twojego centralnego systemu zarządzania zamówieniami, pojawiając się na wyświetlaczu kuchennym obok zamówień bezpośrednich. Nie ma osobnego tabletu — albo, jeśli jest, jest cichy i tylko potwierdza zamówienia, które twój system centralny już przyjął.</p>
<p>Synchronizacja menu to druga połowa: gdy zmieniasz cenę lub oznaczasz pozycję jako niedostępną (86'd) w CRM, ta zmiana propaguje się na wszystkie listingi agregatorów w ciągu kilku minut. Eliminuje to rozbieżność wersji, przez którą sfrustrowani klienci zamawiają niedostępne pozycje.</p>

<h2>Zarządzanie prowizjami między platformami</h2>
<p>Prowizje agregatorów wahają się od 15% do 35% w zależności od platformy, rynku i wynegocjowanej stawki. Operacja wieloagregatorowa musi śledzić przychód, prowizję i efektywną marżę osobno dla każdej platformy. Jeśli struktura prowizji jednego agregatora czyni pewne pozycje menu nierentownymi, musisz to wiedzieć — i albo renegocjować, albo wykluczyć te pozycje z tej platformy, albo podnieść na niej ceny.</p>
<p>Większość agregatorów pozwala na osobne ceny dla każdej platformy — twoje ceny na Glovo mogą różnić się od cen na Bolt. Operatorzy, którzy nie korzystają z tej funkcji, zwykle albo zawyżają ceny na wszystkich platformach (tracąc wolumen), albo zaniżają na platformach o wysokiej prowizji (tracąc marżę).</p>

<h2>Kanał zamówień bezpośrednich</h2>
<p>Strategicznym celem każdej sieci dostaw powinno być rozwijanie własnego kanału zamówień bezpośrednich (własnej aplikacji, strony i zamówień telefonicznych) kosztem wolumenu agregatorów. Zamówienia bezpośrednie mają zerową prowizję, a ty jesteś właścicielem relacji z klientem. Agregatory o tym wiedzą, dlatego ograniczają dane, którymi dzielą się z operatorami.</p>
<p>Praktyczna droga: używaj agregatorów do odkrywania i pozyskiwania, a następnie konwertuj klientów agregatorów na klientów bezpośrednich przez programy lojalnościowe, lepszą obsługę i celowy marketing. Klient, który zamówi przez Glovo dwa razy, a potem przejdzie na twoją bezpośrednią aplikację, oszczędza ci 25% prowizji na każdym przyszłym zamówieniu.</p>

<h2>Analiza wydajności agregatorów</h2>
<p>Śledź dla każdego agregatora: wolumen zamówień, średnią wartość zamówienia, ocenę klientów, koszt prowizji i pozyskanie nowych klientów (w odróżnieniu od powracających, którzy znaleźli cię na agregatorach). Celem jest zrozumienie roli każdej platformy w twoim lejku pozyskania i utrzymania klientów — i odpowiednie rozdzielanie budżetu promocyjnego na każdą z nich.</p>
    `,
    },
  },
};
