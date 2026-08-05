# Автоматизація лайт — TypeScript/Playwright: ретельний конспект плейліста

- Джерело: [YouTube-плейліст](https://www.youtube.com/playlist?list=PLULFH3b6unlfPHDl5hODSGbF6eR1UUWdn)
- Канал: QA Club Lviv
- Доступ: Unlisted
- Дата дослідження: 2026-07-31
- Покриття: 15 відео, загальна тривалість 13:55:50; timed auto-caption tracks доступні для 15/15 відео.

## Методологія та обмеження

Конспект підготовлено за автоматично створеними українськими субтитрами YouTube (`uk-orig`) і метаданими плейліста. Англомовні технічні терміни та назви API нормалізовано вручну, оскільки ASR часто спотворює `TypeScript`, `Playwright`, назви matcher-ів та фрагменти коду. Усі наведені таймкоди звірено з timed caption segments; приблизні перекази не видаються за дослівні цитати.

Документ не відтворює повний транскрипт і не переносить credentials, tokens, cookies, account data чи інші потенційно чутливі значення, які могли бути видимі або озвучені в unlisted-записах. Код із субтитрів слід сприймати як пояснення концепції, а не як синтаксично надійний snippet.

## 1. «1 заняття» — 01:02:40

Джерело: [YouTube](https://www.youtube.com/watch?v=xSHlDEBy0YU) · ID `xSHlDEBy0YU` · timed captions: `uk-orig` (auto-generated)

### Перевірена мапа тем

- [01:23](https://www.youtube.com/watch?v=xSHlDEBy0YU&t=83s) — створення базового Playwright-проєкту та структура, яку генерує initializer.
- [04:02](https://www.youtube.com/watch?v=xSHlDEBy0YU&t=242s) — чому для автотестів обирають TypeScript замість JavaScript: типи раніше ловлять тривіальні помилки.
- [07:03](https://www.youtube.com/watch?v=xSHlDEBy0YU&t=423s) — призначення `tests`, `package.json`, залежностей і `playwright.config`.
- [12:21](https://www.youtube.com/watch?v=xSHlDEBy0YU&t=741s) — `baseURL` і відносна навігація через `page.goto('/')` замість дублювання домену.
- [13:46](https://www.youtube.com/watch?v=xSHlDEBy0YU&t=826s) — DOM/HTML як дерево елементів і атрибутів.
- [17:38](https://www.youtube.com/watch?v=xSHlDEBy0YU&t=1058s) — семантичний пошук через `getByRole` та accessibility tree.
- [29:03](https://www.youtube.com/watch?v=xSHlDEBy0YU&t=1743s) — API `Locator`: дії, перевірки, `first`/`last`/`nth`, `count`.
- [35:55](https://www.youtube.com/watch?v=xSHlDEBy0YU&t=2155s) — значення `toBeVisible`; різниця між наявністю в DOM і реальною видимістю.
- [44:07](https://www.youtube.com/watch?v=xSHlDEBy0YU&t=2647s) — навігація, `click` і вбудоване очікування дій Playwright.
- [52:31](https://www.youtube.com/watch?v=xSHlDEBy0YU&t=3151s) — web-first assertions: `toBeVisible`, `toHaveText`/`toContainText`.
- [56:52](https://www.youtube.com/watch?v=xSHlDEBy0YU&t=3412s) — strict mode і небезпека маскувати неоднозначний локатор через `first()`.

### Ключові технічні тези

- Стартова вертикаль: ініціалізувати TypeScript + Playwright, визначити `baseURL`, написати один тест навігації, одну дію й одну спостережувану перевірку.
- DOM треба читати як структуру, а локатор — як контракт з користувацькою або тестовою семантикою, не як випадковий фрагмент верстки.
- `Locator` лінивий: елемент перевизначається під час дії/очікування. Це краще за збережений дескриптор елемента після ререндеру.
- `expect(locator)` має чекати потрібний стан; ручні паузи не є доказом готовності сторінки.
- Відносні URL прибирають дублювання оточення й полегшують запуск одного набору проти різних середовищ.

### Правила для майбутнього skill

- За замовчуванням створювати Playwright-проєкти на TypeScript і не послаблювати типи без локальної, поясненої причини.
- Перед написанням локатора перевірити accessible role/name або стабільний test id; CSS/XPath використовувати лише коли немає кращого контракту.
- Вимагати унікальності локатора. `first()`/`nth()` дозволяти лише з поясненням, чому порядок є частиною контракту.
- Після дії перевіряти бізнес-результат, а не тільки факт кліку чи відсутність exception.
- Використовувати `baseURL` + відносні шляхи й не хардкодити домени у тестах.

### Ризики й пастки

- Auto-captions спотворюють англомовні назви (`Playwright`, `TypeScript`, matcher names); приклади коду не слід копіювати дослівно з субтитрів.
- `toBeAttached` або проста присутність у DOM не доводить, що користувач бачить чи може використати елемент.
- `first()` може зробити тест зеленим на неправильному елементі.

## 2. «2 заняття» — 01:19:10

Джерело: [YouTube](https://www.youtube.com/watch?v=dDZ29JJLqiw) · ID `dDZ29JJLqiw` · timed captions: `uk-orig` (auto-generated)

### Перевірена мапа тем

- [01:00](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=60s) — які дії Playwright очікують actionability, а які низькорівневі операції можуть нічого не чекати.
- [04:10](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=250s) — `stable`/`visible` та чому не треба дублювати внутрішні очікування дії довільними waits.
- [10:10](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=610s) — CSS selector vs XPath expression.
- [11:40](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=700s) — `nth`/`first`/`last`; позиційний вибір як вимушений компроміс.
- [13:56](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=836s) — чому повні CSS class strings і нестабільні атрибути є крихким контрактом.
- [17:41](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=1061s) — звуження через `filter({ hasText })` та вкладені локатори.
- [21:08](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=1268s) — пошук конкретної product card усередині повторюваного списку.
- [25:25](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=1525s) — краще зробити локатор однозначним, ніж додати індекс.
- [32:21](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=1941s) — `isLoaded`/`waitFor...` як явний контракт готовності page/component object.
- [38:45](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=2325s) — перехід від лінійного сценарію до доменно названих функцій.
- [58:30](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=3510s) — `visible`, `hidden` і detached як різні стани.
- [59:33](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=3573s) — рекомендація на користь `expect(...).toBeVisible()` замість імперативного `waitFor`.
- [60:28](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=3628s) — виділення повторюваної product card у component object.
- [75:31](https://www.youtube.com/watch?v=dDZ29JJLqiw&t=4531s) — наступний крок: окремі файли/класи page objects.

### Ключові технічні тези

- Стабільний локатор має спершу знайти логічний контейнер, а потім конкретний елемент усередині нього.
- Page/component objects потрібні не для механічного перенесення кожного `click`, а для доменних операцій і контрактів стану.
- Вкладений компонент корисний, коли структура та поведінка повторюються: product card, search wrapper, modal, navigation.
- `visible`, `hidden` і відсутність у DOM — різні твердження; matcher має відповідати очікуваній поведінці.
- Допоміжні функції називаються за наміром (`searchFor`, `addProductToCart`, `waitForProductList`), а не за технічним кроком.

### Правила для майбутнього skill

- Будувати локатори від стабільного батьківського контейнера до нащадка; не шукати глобально те, що має локальну область.
- Заборонити позиційні локатори без зафіксованого контракту порядку.
- Page object має віддавати доменні дії; component object — локальну повторювану поведінку.
- Готовність сторінки перевіряти через один або кілька значущих користувацьких сигналів, а не `networkidle` чи sleep за замовчуванням.
- Грошові/форматовані значення нормалізувати та парсити явно; окремо перевіряти числовий зміст і формат, якщо обидва є вимогою.

### Ризики й пастки

- Повний class attribute часто містить кілька класів і змінюється під час редизайну/збирання CSS.
- `hasText` по великому контейнеру може випадково збігтися з прихованим або дочірнім текстом; область треба звузити.
- Надмірні `waitFor` створюють дублювання очікувань і можуть приховувати неправильний стан.

## 3. «продльонка 2го заняття» — 00:18:59

Джерело: [YouTube](https://www.youtube.com/watch?v=p_BCGnAy4n0) · ID `p_BCGnAy4n0` · timed captions: `uk-orig` (auto-generated)

### Перевірена мапа тем

- [00:24](https://www.youtube.com/watch?v=p_BCGnAy4n0&t=24s) — `testDir`/CLI filters як джерело істини для discovery тестів.
- [01:36](https://www.youtube.com/watch?v=p_BCGnAy4n0&t=96s) — розділення apps/tests за продуктовим доменом.
- [03:31](https://www.youtube.com/watch?v=p_BCGnAy4n0&t=211s) — групування файлів за сторінкою або бізнес-флоу, не за браузером.
- [05:02](https://www.youtube.com/watch?v=p_BCGnAy4n0&t=302s) — структура еволюціонує після появи реальних тестів; перегрупування через рефакторинг.
- [06:34](https://www.youtube.com/watch?v=p_BCGnAy4n0&t=394s) — спочатку наскрізний flow для пізнання системи, далі швидкі smoke/component перевірки.
- [08:03](https://www.youtube.com/watch?v=p_BCGnAy4n0&t=483s) — системні тести після deployment ловлять конфігураційні й інтеграційні розриви, яких не бачать локальні unit/integration tests.
- [09:34](https://www.youtube.com/watch?v=p_BCGnAy4n0&t=574s) — перевірка замовлення через кілька систем, admin UI та email як один реальний бізнес-контракт.
- [11:59](https://www.youtube.com/watch?v=p_BCGnAy4n0&t=719s) — діагностика проблеми запуску браузера після встановлення інструментів через `sudo`.
- [15:22](https://www.youtube.com/watch?v=p_BCGnAy4n0&t=922s) — відокремлення IDE-проблеми від Playwright через запуск у CLI.
- [16:48](https://www.youtube.com/watch?v=p_BCGnAy4n0&t=1008s) — permission errors у report/test-results як сигнал проблеми ownership/оточення.

### Ключові технічні тези

- Структура тестів повинна віддзеркалювати продукт, флоу, preconditions/postconditions і тест-менеджмент, а не конкретний браузер.
- E2E дає карту залежностей; після цього suite розкладають на швидкі gating checks і глибші набори.
- Системний тест перевіряє deployed topology: конфігурацію, доступність сервісів, auth, registry/gateway і міжсистемні наслідки.
- Для environment failure спочатку відтворити через CLI, перевірити версії/permissions/ownership, і лише тоді змінювати тест.

### Правила для майбутнього skill

- Перед редагуванням тесту перевіряти discovery: `testDir`, suffix, project/filter і правильний import.
- Організовувати тести за bounded product area/flow; різні браузери задавати Playwright projects.
- Починати з одного репрезентативного E2E, але швидко виділяти smoke/gating checks за реальними failure modes.
- При permission error не радити `sudo` як стандартне виправлення; встановити справжнього власника файлів/кешів і відтворити чистим CLI.
- Багатосистемний flow вважати завершеним лише після перевірки downstream state, якщо це частина вимоги.

### Ризики й пастки

- Один гігантський файл з усіма тестами змішує різні setup/cleanup і ускладнює паралельність.
- Suite лише з довгих E2E повільно локалізує причину й марнує CI час.
- Запуск package tooling через `sudo` може створити root-owned артефакти й повторювані permission failures.

## 4. «3 заняття» — 01:31:31

Джерело: [YouTube](https://www.youtube.com/watch?v=FPdsvxmFBzc) · ID `FPdsvxmFBzc` · timed captions: `uk-orig` (auto-generated)

### Перевірена мапа тем

- [15:30](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=930s) — узгодження стабільних атрибутів/змін з frontend через change request.
- [16:21](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=981s) — locator contract змінюється разом зі структурою компонента.
- [23:22](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=1402s) — `getByTestId` + `expect(...).toBeVisible()`.
- [27:02](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=1622s) — дія `Enter` і очікуваний перехід/результат пошуку.
- [40:57](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=2457s) — action timeout як діагностичний сигнал, не причина додати sleep.
- [41:36](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=2496s) — page objects як класи логічних частин UI.
- [42:36](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=2556s) — сторінка не обов'язково дорівнює одному класу; product list, popup і повторювані блоки можуть бути окремими компонентами.
- [44:17](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=2657s) — page object описує логічну область, а не весь HTML-документ.
- [51:17](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=3077s) — `export class` для page/component object.
- [51:31](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=3091s) — `isLoaded` як обов'язковий явний контракт кожного об'єкта в курсі.
- [54:55](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=3295s) — клас як опис, object/instance як створена runtime-сутність.
- [58:14](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=3494s) — передача Playwright `Page` як залежності.
- [70:12](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=4212s) — композиція: page object зберігає посилання на інший component object.
- [72:15](https://www.youtube.com/watch?v=FPdsvxmFBzc&t=4335s) — TypeScript parameter property (`private ...`) як скорочення конструктора.

### Ключові технічні тези

- Testability — спільна властивість продукту: стабільний test id або semantic role краще узгодити з frontend, ніж постійно ремонтувати крихкий CSS.
- Page Object Model корисний на рівні логічних областей. Сторінка компонується з search wrapper, delivery popup, product list тощо.
- Конструктор приймає валідні залежності (`Page`, component dependencies), але не повинен приховано виконувати навігацію чи network side effects.
- `isLoaded` має перевіряти найменший достатній набір сигналів, які доводять готовність конкретної області.
- Об'єкти з'єднуються композицією; тест читається через доменні методи, не через exposed locator fields.

### Правила для майбутнього skill

- Перед створенням page object намалювати межі page/component за поведінкою і повторним використанням.
- Інкапсулювати локатори; публічний API об'єкта — доменні дії та assertions/results.
- Передавати `Page`/`APIRequestContext` через constructor/fixture, без глобального mutable state.
- Створювати `isLoaded` лише зі спостережуваного стабільного контракту; не чекати весь сайт.
- Коли немає стабільного локатора, спершу запропонувати product change (`data-testid`, accessible name), а не складний XPath.

### Ризики й пастки

- «Один URL — один великий page class» швидко породжує God Page Object.
- Універсальні `click(selector)`/`fill(selector)` wrappers не додають доменної семантики й дублюють Playwright.
- Надто широкий `isLoaded` зв'язує незалежні компоненти й створює flaky failure через нерелевантний віджет.

## 5. «продльонка 3го заняття» — 00:09:10

Джерело: [YouTube](https://www.youtube.com/watch?v=5w5LdjHaY3U) · ID `5w5LdjHaY3U` · timed captions: `uk-orig` (auto-generated)

### Перевірена мапа тем

- [00:07](https://www.youtube.com/watch?v=5w5LdjHaY3U&t=7s) — огляд зв'язку `HomePage` → `SearchWrapper`.
- [00:30](https://www.youtube.com/watch?v=5w5LdjHaY3U&t=30s) — кожен page/component class має перевіряти власну готовність.
- [02:09](https://www.youtube.com/watch?v=5w5LdjHaY3U&t=129s) — пошук стабільних test ids і меж компонентів.
- [04:43](https://www.youtube.com/watch?v=5w5LdjHaY3U&t=283s) — питання про універсальний `isLoaded` і повторне використання.
- [05:40](https://www.youtube.com/watch?v=5w5LdjHaY3U&t=340s) — подальший refactor через page object і fixtures.
- [06:15](https://www.youtube.com/watch?v=5w5LdjHaY3U&t=375s) — `BasePage` варто вводити після реального дублювання, не наперед.

### Ключові технічні тези

- Готовність належить об'єкту, який знає власний DOM-контракт; один глобальний `isLoaded` рідко доводить готовність усіх сторінок.
- Спільний base class виправданий лише спільною стабільною поведінкою, а не бажанням «мати архітектуру».
- Fixture може зібрати залежності й створити page/component objects, не переносячи туди бізнес-перевірки.

### Правила для майбутнього skill

- Не створювати `BasePage` до другого/третього підтвердженого дублювання одного контракту.
- Не наслідувати page objects лише заради доступу до `Page`; краще constructor injection і композиція.
- Fixture відповідає за lifecycle/setup; page object — за UI behavior; test — за бізнес-очікування сценарію.

### Ризики й пастки

- Base class з десятками helpers стає прихованою глобальною залежністю.
- Універсальний loaded-check може дати false positive: спільний header видимий, але цільовий компонент ще не готовий.

## 6. «питання до 3го заняття» — 00:05:14

Джерело: [YouTube](https://www.youtube.com/watch?v=PiBA2SaDUqE) · ID `PiBA2SaDUqE` · timed captions: `uk-orig` (auto-generated; також доступний `en` track)

### Перевірена мапа тем

- [00:00](https://www.youtube.com/watch?v=PiBA2SaDUqE&t=0s) — розбір тесту, переважно згенерованого LLM, який «підсвічує» елементи, але не відтворює реальну поведінку.
- [02:27](https://www.youtube.com/watch?v=PiBA2SaDUqE&t=147s) — різниця між dropdown suggestions і переходом на search results; тест автоматизує не той контракт.
- [03:23](https://www.youtube.com/watch?v=PiBA2SaDUqE&t=203s) — 403 у runtime як доказ того, що невідповідність UI-поведінки може походити від відповіді сервера, а не локатора.
- [03:48](https://www.youtube.com/watch?v=PiBA2SaDUqE&t=228s) — відкриття Playwright report для перевірки фактичного виконання тесту.
- [04:23](https://www.youtube.com/watch?v=PiBA2SaDUqE&t=263s) — trace як наступне джерело діагностичних доказів.
- [04:38](https://www.youtube.com/watch?v=PiBA2SaDUqE&t=278s) — bot protection/automation blocking як нульова feasibility-перевірка автоматизації.

### Ключові технічні тези

- Зелений generated test може перевіряти не той user journey. Спочатку треба сформулювати конкретну спостережувану поведінку.
- DOM highlight або успішний locator не доводить, що control відреагував як у користувача.
- 403/anti-bot — системна умова середовища; селектором її не виправити.
- Trace/report/network response дають причину, тоді як повторні правки prompt/locator без доказів — вгадування.

### Правила для майбутнього skill

- Перед генерацією тесту записати Given/When/Then і окремо визначити: dropdown чи navigation є очікуваним результатом.
- Після першого failure відкривати trace/report і перевіряти status/network/DOM scope до редагування локатора.
- На старті проєкту перевіряти bot protection, тестове allowlisting і доступність контрольованого test environment.
- LLM output трактувати як кандидат на зміну; обов'язково запускати й звіряти з реальною поведінкою.

### Ризики й пастки

- Автоматизація production-like сайту спеціальним браузером може отримати іншу відповідь через anti-bot.
- «Виправити» 403 додатковим wait неможливо.
- Не можна переносити чутливі cookies/tokens з trace у документацію або prompt.

## 7. «4 те заняття, GIT здорової̈ людини» — 00:38:46

Джерело: [YouTube](https://www.youtube.com/watch?v=lvjkvTbWuc4) · ID `lvjkvTbWuc4` · timed captions: `uk-orig` (auto-generated)

### Перевірена мапа тем

- [02:02](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=122s) — SSH key як рекомендований спосіб доступу до Git remote.
- [04:01](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=241s) — clone/open проєкту.
- [06:00](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=360s) — локальний checkout і початковий стан проєкту.
- [08:00](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=480s) — changes → stage → commit.
- [16:00](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=960s) — target branch і створення pull request.
- [18:00](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=1080s) — як локальні commits співвідносяться з remote branch.
- [20:01](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=1201s) — огляд changes перед commit.
- [24:02](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=1442s) — history як спосіб зрозуміти походження змін.
- [26:03](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=1563s) — IDE/file-system cache troubleshooting.
- [28:01](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=1681s) — push після локальної перевірки.
- [30:00](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=1800s) — оновлення від target branch.
- [32:04](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=1924s) — демонстрація amend для переписування останнього commit.
- [32:52](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=1972s) — демонстрація force-push після amend. Це переписує remote history і не повинно ставати default workflow майбутнього skill без окремої явної авторизації.
- [36:00](https://www.youtube.com/watch?v=lvjkvTbWuc4&t=2160s) — синхронізація remote перед роботою для зменшення конфліктів.

### Ключові технічні тези

- Базовий delivery loop: синхронізувати target → створити task branch → змінити → перевірити diff → stage точних файлів → commit → push → PR.
- Commit — логічна перевірена одиниця, а не dump усього working tree.
- History/diff потрібні до commit і PR, щоб не включити generated reports, secrets чи чужі зміни.
- SSH key — credential; його приватна частина не потрапляє в repo, logs або навчальні нотатки.

### Правила для майбутнього skill

- Перед edit перевіряти `git status`, current branch, remote mapping і user-owned changes.
- Stage лише файли поточного slice; переглядати staged diff перед commit.
- Не додавати `.env`, storage state, traces з cookies, reports або приватні ключі.
- Не force-push/rewrite history без окремої явної авторизації.
- Конфлікти розв'язувати семантично, після чого запускати релевантні checks.

### Ризики й пастки

- IDE кнопка може приховати, які саме файли staged або яка target branch обрана.
- Без синхронізації з remote PR може містити неочікувані конфлікти або зайві commits.
- `git add .`/`-A` без review легко захоплює secrets і generated artifacts.

## 8. «5 те заняття АПІШЬКА початок» — 01:11:07

Джерело: [YouTube](https://www.youtube.com/watch?v=Upmpkfd9CSw) · ID `Upmpkfd9CSw` · timed captions: `uk-orig` (auto-generated)

### Перевірена мапа тем

- [04:01](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=241s) — exposed endpoints і gateway як зовнішня межа сервісів.
- [05:05](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=305s) — REST як правила комунікації consumer ↔ producer.
- [07:23](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=443s) — читання реальних browser network calls для пошуку потрібного запиту.
- [13:56](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=836s) — доменне ім'я операції `getProductsForQuery`.
- [23:57](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=1437s) — JSON як серіалізована структура даних/JavaScript object notation.
- [32:48](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=1968s) — GraphQL query variables для параметризації.
- [39:06](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=2346s) — REST resources і Swagger/OpenAPI як опис контракту.
- [41:29](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=2489s) — TypeScript API helper замість UI `Page`.
- [43:04](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=2584s) — параметризовані test data.
- [46:37](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=2797s) — async response/`Promise` flow.
- [54:00](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=3240s) — TypeScript interfaces/types для форми API payload.
- [59:02](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=3542s) — path/body parameters і required fields.
- [66:15](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=3975s) — DTO як модель даних на contract boundary.
- [67:49](https://www.youtube.com/watch?v=Upmpkfd9CSw&t=4069s) — CRUD helpers: create/get/delete та ID у path.

### Ключові технічні тези

- API automation починається з реального контракту: method/operation, path, headers/auth, params/variables, body, status/error semantics і schema.
- Browser DevTools/network показує, який запит справді виконує продукт; Swagger/OpenAPI/GraphQL schema пояснює офіційний контракт.
- API helper має доменний API (`createProduct`, `getProductById`), типізовані request/response DTO та явне повернення response/result.
- Test data параметризується і має унікальність; create повертає ID, який використовується для verify/cleanup.
- Компіляційний TypeScript type не валідовує runtime JSON. Для trust boundary потрібна assertion/schema validation.

### Правила для майбутнього skill

- Спершу трасувати реальний network request і звірити його з офіційною schema/docs.
- На REST межі перевіряти method/path/status/headers/body/schema; на GraphQL — transport status, `errors`, `data`, nullability і partial result.
- Не використовувати `any` для зовнішніх payload; визначати мінімальні DTO/types і runtime validation там, де дані недовірені.
- API setup має створювати лише owned data та повертати cleanup handle/ID.
- Secrets передавати через environment/secret store; не логувати Authorization headers або payload з персональними даними.

### Ризики й пастки

- Успішний HTTP transport не завжди означає успішну GraphQL operation.
- Типізація response через `as SomeType` лише приглушує компілятор і не доводить відповідність runtime даних.
- Cleanup через broad delete або спільний hardcoded ID небезпечний для паралельних tests.

## 9. «3 заняття міні налаштування для IDE, live template, shrotcuts» — 00:56:13

Джерело: [YouTube](https://www.youtube.com/watch?v=ZbPu9BONHUU) · ID `ZbPu9BONHUU` · timed captions: `uk-orig` (auto-generated)

### Перевірена мапа тем

- [00:00](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=0s) — IDE navigation і редагування без постійного перемикання на мишку.
- [04:00](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=240s) — пошук символів/файлів та навігація між usage/definition.
- [08:00](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=480s) — multi-cursor/selection і переміщення по коду.
- [12:01](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=721s) — вивчення та переналаштування shortcuts.
- [20:01](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=1201s) — Live Templates для повторюваних конструкцій.
- [24:05](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=1445s) — приклад template для `getByTestId`/Playwright statement.
- [28:03](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=1683s) — автоматичне reformatting.
- [32:02](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=1922s) — complete statement і швидке завершення синтаксичної конструкції.
- [40:01](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=2401s) — дослідження API бібліотеки через definitions/documentation, а не пам'ять.
- [46:04](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=2764s) — швидкий rerun конкретного тесту.
- [48:00](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=2880s) — inlay hints як допомога з типами/параметрами.
- [54:00](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=3240s) — збереження/синхронізація IDE settings.
- [56:01](https://www.youtube.com/watch?v=ZbPu9BONHUU&t=3361s) — практика: налаштувати власні templates і shortcuts під часті операції.

### Ключові технічні тези

- IDE — інструмент зворотного зв'язку: type errors, imports, usages, refactors і test runner скорочують цикл red/green.
- Live Template має генерувати лише маленьку безпечну форму; бізнес-логіку не варто ховати в приватному IDE snippet.
- Go to definition та офіційні type declarations надійніші за вгадування назви Playwright API.
- Reformat/rename/extract refactors зберігають механічну узгодженість, але результат все одно треба перевіряти tests/typecheck.

### Правила для майбутнього skill

- Перед вигадуванням API шукати existing usage, type definition та official docs.
- Використовувати IDE refactor для rename/extract, потім переглядати diff і запускати targeted checks.
- Project-critical conventions зберігати у repository tooling/config, а не лише в особистому WebStorm profile.
- Templates дозволяти для boilerplate, але вимагати осмислених locator names і assertions після вставки.

### Ризики й пастки

- Особистий Live Template не є командним стандартом і може непомітно застаріти.
- Auto-import може підтягнути raw `@playwright/test` замість project-specific extended fixture.
- Гаряча клавіша прискорює неправильну операцію так само добре, як правильну; diff/test залишаються обов'язковими.

## 10. «Як працює ЛЛМ» — 01:14:41

- **YouTube:** https://www.youtube.com/watch?v=5yGlNe7_q9U
- **Тривалість за таймованими субтитрами:** ≈ 1:14:39
- **Субтитри:** українська автоматична доріжка; технічні англомовні слова часто розпізнані неточно.

### Таймований конспект

- [00:00:14](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=14s) — LLM пояснюється як імовірнісний генератор наступних токенів, а не джерело гарантовано правильних фактів.
- [00:02:26](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=146s) — токенізатор ділить вхід на токени; поділ залежить від конкретної моделі.
- [00:07:40](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=460s) — ChatGPT, Claude і Gemini спочатку токенізують переданий текст.
- [00:18:19](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=1099s) — параметри вибору моделі: швидкість у токенах за секунду, контекстне вікно, ціна за токени та якість.
- [00:19:33](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=1173s) — різні моделі мають різну схильність до галюцинацій; це окремий критерій вибору.
- [00:24:16](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=1456s) — Playwright MCP і Selenium MCP як приклади інструментів, що додають моделі доступ до зовнішньої дії або контексту.
- [00:26:55](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=1615s) — RAG: пошук релевантної інформації у векторній базі та додавання її до контексту.
- [00:27:07](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=1627s) — agent flow: агент керує послідовністю кроків і перевіряє, чи правильно рухається виконання.
- [00:28:30](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=1710s) — важливе уточнення схеми: оркестрацію виконує агент, а LLM є його компонентом.
- [00:29:11](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=1751s) — MCP і tools передають агенту можливості та інформацію.
- [00:30:47](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=1847s) — для відомої детермінованої операції прямий API-клієнт може бути кращим за MCP: менше токенів і менше невизначеності у виборі дії.
- [00:34:40](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=2080s) — function/tool calling: модель обирає функцію та параметри, а код виконує реальну дію і повертає результат у контекст.
- [00:38:02](https://www.youtube.com/watch?v=5yGlNe7_q9U&t=2282s) — усе в чаті, системному промпті, відкритих файлах і результатах tools займає контекстне вікно.

### Ключові технічні концепції

- Токенізація залежить від моделі й мови; однаковий текст може мати різну вартість і різну якість обробки.
- Велике контекстне вікно не дорівнює високій якості відповіді.
- Модель потрібно вибирати за конкретною задачею: якість коду, галюцинації, швидкість, ціна, підтримка tools і обсяг потрібного контексту.
- RAG не «навчає» модель: він додає знайдені фрагменти до поточного запиту.
- Агент відповідає за пам’ять, контекст, tools, порядок дій і завершення; LLM генерує рішення всередині цього циклу.
- MCP дає універсальну інтеграцію, але опис tools і їхні результати витрачають контекст та можуть додавати недетермінований вибір.

### Правила для TypeScript automation skill

- Передавати лише релевантний контекст, а не весь репозиторій.
- Не приймати впевнений текст LLM за доказ: перевіряти код компілятором, тестами, runtime і фактичним станом UI/API.
- Для відомої операції надавати типовий прямий API-клієнт; MCP використовувати, коли потрібне універсальне дослідження або інтерактивна дія.
- RAG-відповіді мають повертати джерело або точний фрагмент, на якому ґрунтується висновок.
- Агент після кожного tool call має прочитати результат, перевірити помилки й лише тоді планувати наступну дію.
- Бюджетувати контекст: системні правила, схеми tools, код, логи та відповіді API конкурують за одне вікно.

### Ризики й типові помилки

- Вибирати модель лише за розміром контекстного вікна.
- Завантажувати надто багато файлів і погіршувати релевантність контексту.
- Дозволяти LLM самій обирати критичну зовнішню дію без валідації параметрів і результату.
- Використовувати MCP там, де один стабільний typed API call дає простіший і надійніший контракт.
- Плутати LLM, RAG і агента: це різні рівні системи з різними відповідальностями.

## 11. «llm promting» — 01:14:35

- **YouTube:** https://www.youtube.com/watch?v=5p3oGW7cldk
- **Тривалість за таймованими субтитрами:** ≈ 1:14:26
- **Субтитри:** українська автоматична доріжка; також доступна англійська доріжка. Відео фактично є live-сесією LLM-assisted рефакторингу TypeScript/Playwright.

### Таймований конспект

- [00:09:25](https://www.youtube.com/watch?v=5p3oGW7cldk&t=565s) — корисний запит: запропонувати кілька варіантів рефакторингу та додати конкретний тест як контекст.
- [00:09:53](https://www.youtube.com/watch?v=5p3oGW7cldk&t=593s) — не давати LLM доступ до всієї кодової бази; обмежити контекст кількома потрібними файлами.
- [00:17:49](https://www.youtube.com/watch?v=5p3oGW7cldk&t=1069s) — знання продукту і реальної поведінки системи важливіше за вміння попросити LLM написати тест.
- [00:18:14](https://www.youtube.com/watch?v=5p3oGW7cldk&t=1094s) — можна попросити модель сформулювати, які питання й контекст їй потрібні для тесту за заданих обмежень.
- [00:19:31](https://www.youtube.com/watch?v=5p3oGW7cldk&t=1171s) — стабільний тест має динамічно чекати на очікуваний стан, а не покладатися на фіксовану затримку.
- [00:25:37](https://www.youtube.com/watch?v=5p3oGW7cldk&t=1537s) — поділ helper-функцій виправданий, коли потрібні окремі перевірки flow, граничні значення, класи еквівалентності чи інші техніки тест-дизайну.
- [00:52:13](https://www.youtube.com/watch?v=5p3oGW7cldk&t=3133s) — `try/catch` безпосередньо в тесті небажаний; інколи допустимий як вузький workaround для precondition, але не повинен приховувати основну перевірку.
- [01:08:49](https://www.youtube.com/watch?v=5p3oGW7cldk&t=4129s) — live-приклад галюцинації: LLM запропонувала некоректний helper/API навколо очікування, що виявилося лише під час перевірки типів і запуску.

### Ключові технічні концепції

- Ефективний prompt для коду складається з цілі, релевантних файлів, перевіреного продуктового контексту, обмежень і очікуваного формату результату.
- Кілька варіантів перед редагуванням допомагають порівняти trade-offs і не фіксуватися на першій генерації.
- LLM не знає неявних правил продукту й часто не поставить критичних уточнювальних питань сама.
- Playwright stability будується на web-first assertions і polling очікуваного стану.
- Абстракція потрібна для чинних варіантів поведінки або повторюваного контракту, а не лише для скорочення рядків.

### Правила для TypeScript automation skill

- Спочатку відтворити продуктовий контракт: precondition, дія, спостережуваний результат і важливі негативні стани.
- Додавати до контексту target test і найближчі page object/fixture/type, не весь проєкт.
- Просити 2–3 варіанти лише коли рішення справді має trade-offs; після вибору реалізовувати мінімальний варіант.
- Явно наказувати ставити уточнювальні питання, якщо бракує продуктового контракту або тестових даних.
- Кожну генерацію перевіряти TypeScript typecheck, targeted test і фактичним UI/API результатом.
- Використовувати Playwright `expect`/polling замість `waitForTimeout`.
- Виносити precondition/setup окремо від поведінки, яку перевіряє тест.

### Ризики й типові помилки

- Широкий контекст створює хибні асоціації та знижує точність.
- LLM може вигадати метод Playwright, неправильний тип або helper, якого немає в проєкті.
- «Гарний» рефакторинг може змінити продуктову семантику або сховати важливий крок тесту.
- `try/catch` може перетворити реальний дефект на формально зелений тест.
- Поділ helper-ів без актуального тестового варіанта створює зайву абстракцію.

## 12. «OOP» — 01:15:59

- **YouTube:** https://www.youtube.com/watch?v=c528L_GaIPs
- **Тривалість за таймованими субтитрами:** ≈ 1:15:58
- **Субтитри:** українська автоматична доріжка.

### Таймований конспект

- [00:00:33](https://www.youtube.com/watch?v=c528L_GaIPs&t=33s) — клас як опис/шаблон, об’єкт як створений runtime-екземпляр.
- [00:05:33](https://www.youtube.com/watch?v=c528L_GaIPs&t=333s) — вступ до інкапсуляції та наслідування.
- [00:08:08](https://www.youtube.com/watch?v=c528L_GaIPs&t=488s) — об’єкт поєднує властивості/стан і поведінку/методи.
- [00:15:25](https://www.youtube.com/watch?v=c528L_GaIPs&t=925s) — інкапсуляція приховує реалізацію та відкриває контрольований спосіб взаємодії.
- [00:20:37](https://www.youtube.com/watch?v=c528L_GaIPs&t=1237s) — один клас із надмірною кількістю відповідальностей перетворюється на God Object.
- [00:21:47](https://www.youtube.com/watch?v=c528L_GaIPs&t=1307s) — `public`, `protected`, `private` та межі доступу.
- [00:26:58](https://www.youtube.com/watch?v=c528L_GaIPs&t=1618s) — `super` викликає конструктор батьківського класу.
- [00:36:20](https://www.youtube.com/watch?v=c528L_GaIPs&t=2180s) — різниця між override і overload.
- [00:58:20](https://www.youtube.com/watch?v=c528L_GaIPs&t=3500s) — SOLID і Single Responsibility Principle.
- [01:00:30](https://www.youtube.com/watch?v=c528L_GaIPs&t=3630s) — композиція: об’єкт складається з інших об’єктів/залежностей.
- [01:03:09](https://www.youtube.com/watch?v=c528L_GaIPs&t=3789s) — у розглянутому випадку композиція краща за наслідування.
- [01:08:04](https://www.youtube.com/watch?v=c528L_GaIPs&t=4084s) — поліморфізм.
- [01:08:46](https://www.youtube.com/watch?v=c528L_GaIPs&t=4126s) — абстракція та підсумок допоміжних принципів SOLID.

### Ключові технічні концепції

- Клас визначає контракт створення екземплярів; екземпляр має власний стан.
- Наслідування повторно використовує поведінку, але створює сильний зв’язок з ієрархією.
- Інкапсуляція — це не лише `private`: вона приховує деталі реалізації за зрозумілим поведінковим API.
- Override змінює реалізацію успадкованого методу; overload описує кілька сигнатур одного API.
- Композиція дозволяє складати сторінку з компонентів без глибокої ієрархії base classes.
- Поліморфізм корисний лише коли різні реалізації справді виконують один контракт.

### Правила для TypeScript automation skill

- Page object має відкривати доменні дії (`changeEmail`, `submitOrder`), а не універсальні `click`/`fill` wrappers.
- Локатори та технічні деталі Playwright приховувати всередині page/component object.
- Компонувати повторно використовувані компоненти у сторінки; уникати глибокого `BasePage -> ...` наслідування.
- Розділяти великі page objects за реальною UI-відповідальністю: сторінка, modal, iframe, таблиця, форма.
- Використовувати interface лише для справжньої взаємозамінності або зовнішнього контракту.
- Конструктор має лише встановлювати валідні залежності; не запускати в ньому приховану навігацію чи мережеві side effects.
- Тримати mutable state локальним і явним.

### Ризики й типові помилки

- God Page Object, що знає про весь продукт.
- Базовий клас із десятками unrelated helpers.
- Наслідування лише для повторного використання двох рядків.
- `private` без справжнього поведінкового API — формальна, а не корисна інкапсуляція.
- Overload, який ускладнює читання і приховує різні бізнес-операції під одним ім’ям.
- Інтерфейс із єдиною реалізацією без контрактної потреби.

## 13. «fix problems with playwirght» — 00:58:14

- **YouTube:** https://www.youtube.com/watch?v=iW8BP970Vew
- **Тривалість за таймованими субтитрами:** ≈ 58:12
- **Субтитри:** українська автоматична доріжка.

### Таймований конспект

- [00:00:11](https://www.youtube.com/watch?v=iW8BP970Vew&t=11s) — діагностика `test not found` починається з `playwright.config` і test directory/projects.
- [00:01:16](https://www.youtube.com/watch?v=iW8BP970Vew&t=76s) — перевірити назву та suffix файлу: `.spec`/`.test` відповідно до конфігурації.
- [00:01:39](https://www.youtube.com/watch?v=iW8BP970Vew&t=99s) — неправильний import може прибрати IDE run icon і зламати discovery.
- [00:02:06](https://www.youtube.com/watch?v=iW8BP970Vew&t=126s) — recap: config/test directory, filename pattern, правильний import `test`.
- [00:05:07](https://www.youtube.com/watch?v=iW8BP970Vew&t=307s) — якщо проєкт має custom fixtures, тест повинен імпортувати саме розширену fixture, а не сторонній/raw `test`.
- [00:21:07](https://www.youtube.com/watch?v=iW8BP970Vew&t=1267s) — перед генерацією треба показати наявні conventions: page objects, fixtures і створення даних.
- [00:23:08](https://www.youtube.com/watch?v=iW8BP970Vew&t=1388s) — `beforeEach`, `afterEach`, shared fixtures і cleanup як частина проєктного контракту.
- [00:23:54](https://www.youtube.com/watch?v=iW8BP970Vew&t=1434s) — у відео page-level поведінку й пов’язану перевірку оформлюють методом page object; для майбутнього skill бізнес-очікування лишається в тесті, а page/component може мати лише явну readiness/component invariant.
- [00:24:52](https://www.youtube.com/watch?v=iW8BP970Vew&t=1492s) — не використовувати паузи, `waitForTimeout` і ручні selector waits як основний спосіб синхронізації.
- [00:43:10](https://www.youtube.com/watch?v=iW8BP970Vew&t=2590s) — Playwright/browser MCP може отримати контекст зі сторінки для подальшої генерації коду.
- [00:43:44](https://www.youtube.com/watch?v=iW8BP970Vew&t=2624s) — MCP, яким отримано DOM, не визначає мову чи framework результату; це потрібно задати окремо.
- [00:54:08](https://www.youtube.com/watch?v=iW8BP970Vew&t=3248s) — рекомендований LLM-flow: іти малими кроками і вручну контролювати контекст.
- [00:54:25](https://www.youtube.com/watch?v=iW8BP970Vew&t=3265s) — передати невеликий релевантний HTML-фрагмент.
- [00:54:39](https://www.youtube.com/watch?v=iW8BP970Vew&t=3279s) — спершу згенерувати лише selector/component/page object, перевірити його, і лише потім писати тест.

### Ключові технічні концепції

- Playwright test discovery залежить від config, робочої директорії, патерна імен і правильного `test` import.
- Custom fixture є частиною runtime-контракту тесту; неправильний import обходить усі розширення.
- Стабільна синхронізація базується на locator assertions та auto-waiting.
- MCP/browser inspection постачає доказовий DOM/UI-контекст, але не гарантує правильну архітектуру згенерованого тесту.
- LLM краще працює вертикальними зрізами: один компонент, один locator contract, один тест.

### Правила для TypeScript automation skill

- При `test not found` не редагувати тест навмання: перевірити `testDir`, projects, filename pattern, working directory та import.
- Завжди знаходити й використовувати проєктний extended `test`, якщо існують custom fixtures.
- Перед створенням файлів прочитати найближчі page objects, fixtures, data builders і hooks.
- Використовувати role/label/test-id locators і web-first `expect`.
- Не додавати sleeps для маскування race condition.
- Browser/MCP використовувати для інспекції реального UI; результат генерації все одно перевіряти в коді й runtime.
- Генерувати й валідувати один компонент або один крок за раз.

### Ризики й типові помилки

- Змінювати структуру файлів, коли причина лише в run configuration.
- Імпортувати `test` з `@playwright/test` замість проєктної fixture.
- Покладатися на IDE run icon як єдине свідчення валідності тесту.
- Використовувати `waitForTimeout` або нестабільні CSS/XPath selectors.
- Просити LLM одразу згенерувати весь E2E flow без page context і conventions.
- Вважати код від MCP/LLM перевіреним лише тому, що він синтаксично схожий на Playwright.

## 14. «GraphQL vs RESTFUll apps» — 00:38:18

- **YouTube:** https://www.youtube.com/watch?v=vXnF4YPvKVI
- **Тривалість за таймованими субтитрами:** ≈ 38:20
- **Субтитри:** українська автоматична доріжка.

### Таймований конспект

- [00:04:57](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=297s) — BFF мотивується скороченням зовнішніх network round trips і зайвих payloads.
- [00:06:24](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=384s) — BFF робить запити до кількох внутрішніх сервісів, агрегує JSON і повертає одну відповідь браузеру.
- [00:07:25](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=445s) — один клієнтський запит може приховувати кілька внутрішніх service calls.
- [00:13:34](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=814s) — GraphQL mutations для операцій зміни стану.
- [00:14:21](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=861s) — одна GraphQL-операція ззовні не означає одну мережеву операцію всередині системи.
- [00:15:24](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=924s) — клієнт може запросити лише потрібні поля, зменшуючи overfetching.
- [00:18:36](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=1116s) — gateway маршрутизує операцію; для невідомого маршруту/endpoint наведено приклад 404.
- [00:19:23](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=1163s) — питання про те, як клієнт дізнається schema та доступні поля.
- [00:19:47](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=1187s) — GraphQL-помилка може прийти як HTTP-success із `errors` у body; REST зазвичай кодує результат відповідним HTTP status.
- [00:21:14](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=1274s) — schema можна завантажити/інтроспектувати та переглянути доступний контракт.
- [00:23:18](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=1398s) — gRPC як окремий спосіб сервісної комунікації.
- [00:24:30](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=1470s) — поширена архітектура: зовнішній REST, внутрішній gRPC.
- [00:25:11](https://www.youtube.com/watch?v=vXnF4YPvKVI&t=1511s) — typed contract compatibility між внутрішніми сервісами.

### Ключові технічні концепції

- REST зазвичай має окремі resource/action endpoints і фіксовані payloads.
- GraphQL використовує schema та operation document, де клієнт вибирає поля; query читає, mutation змінює стан.
- GraphQL зменшує зовнішній overfetching, але resolvers усе одно можуть створювати fan-out, latency і partial failures.
- BFF/gateway приховує внутрішню топологію і агрегує дані під потребу клієнта.
- HTTP transport success і GraphQL operation success — різні рівні результату.
- gRPC і WebSocket/streaming розв’язують інші задачі та не є альтернативними назвами REST або GraphQL.

### Правила для TypeScript automation skill

- REST-тест має перевіряти method, path, status, headers, body і schema.
- GraphQL-тест має окремо перевіряти HTTP status, `errors`, `data`, nullability і partial result.
- Покривати operation variables, query/mutation contract і field-level authorization.
- Не робити висновок про backend health лише з одного успішного GraphQL HTTP response.
- За наявності schema/introspection artifact генерувати типи й contract checks із нього, але не покладатися лише на compile-time типи.
- Для fan-out сценаріїв перевіряти поведінку при помилці або затримці одного resolver dependency.
- Розрізняти request/response API tests і streaming/event tests.

### Ризики й типові помилки

- Перевіряти у GraphQL лише HTTP 200.
- Ігнорувати `errors` поруч із частково заповненим `data`.
- Вважати один зовнішній request однією backend-операцією.
- Порівнювати GraphQL і REST без урахування BFF, resolver fan-out і кешування.
- Використовувати REST status-code очікування для GraphQL operation errors без перевірки реального контракту системи.
- Плутати gRPC/WebSocket із форматами зовнішнього HTTP API.

## 15. «ammend loigin full case automation» — 01:21:13

- **YouTube:** https://www.youtube.com/watch?v=zlMRsg8KUZg
- **Тривалість за таймованими субтитрами:** ≈ 1:20:41
- **Субтитри:** українська автоматична доріжка. Назву та її помилки збережено відповідно до metadata плейліста.

### Таймований конспект

- [00:11:03](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=663s) — у page object створюються доменні методи для change email і change password.
- [00:12:26](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=746s) — поля зміни пароля розташовані в iframe; Selenium і Playwright потребують явної роботи з frame context.
- [00:15:54](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=954s) — login/account page ділиться на окремі компоненти для change-email і change-password flow.
- [00:17:21](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=1041s) — використання Playwright `frameLocator`.
- [00:23:46](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=1426s) — додається явна success expectation після зміни пароля.
- [00:49:28](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=2968s) — вибір між наявним користувачем і реєстрацією нового test user.
- [00:49:38](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=2978s) — hardcoded mutable user ламає повторний запуск, бо перший тест уже змінив його email/credentials.
- [00:49:57](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=2997s) — висновок: створювати окремий account перед кожним таким тестом.
- [00:50:53](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=3053s) — storage state використовується для стабільних environment defaults: cookie consent і postcode.
- [00:57:17](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=3437s) — helper генерує test-user data, а користувач створюється через API.
- [01:06:50](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=4010s) — email verification читає останній лист з очікуваним subject, а не просто чекає невизначений час.
- [01:15:16](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=4516s) — для падіння відкривають retries і Playwright traces.
- [01:16:00](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=4560s) — знайдено причину blocked assertion: modal не закрили перед перевіркою underlying page.
- [01:18:03](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=4683s) — locator шукався на `page`, хоча елемент був усередині iframe.
- [01:18:27](https://www.youtube.com/watch?v=zlMRsg8KUZg&t=4707s) — після виправлення scope тест проходить.

### Ключові технічні концепції

- Повний flow охоплює page/component model, iframe scope, test-user lifecycle, email side effect і перевірку нового account state.
- Modal та iframe є окремими interaction boundaries і мають власні component APIs.
- Mutation-тест повинен бути повторюваним: не можна залежати від account, credentials якого змінилися в попередньому запуску.
- Швидкий API setup кращий за UI-реєстрацію, якщо UI-реєстрація не є поведінкою під тестом.
- Storage state придатний для незмінного environment setup, але не для mutable identity конкретного тесту.
- Trace/report показує фактичний DOM scope, overlay, network і крок, на якому зупинився flow.

### Правила для TypeScript automation skill

- Створювати ізольованого користувача через API fixture для кожного mutable account test.
- Генерувати унікальний email і correlation/session identifier, щоб безпомилково знайти потрібний лист.
- Не логувати password, token, cookie або повний storage state.
- Визначити cleanup policy: видаляти лише створені тестом дані або використовувати disposable test environment.
- Зробити тести parallel-safe: жодних shared mutable accounts.
- Інкапсулювати iframe через `frameLocator` у відповідному component object; outer modal controls залишати у page scope.
- Після mutation перевіряти immediate success message, відображений account state та, де можливо, повторний login з новими credentials.
- Закривати modal/overlay перед assertion underlying page.
- При падінні спочатку читати trace, report, screenshot і network evidence, а не одразу змінювати locator.

### Ризики й типові помилки

- Повторно використовувати hardcoded account у тестах зміни email/password.
- Паралельно змінювати один account із кількох workers.
- Шукати iframe-елемент через `page.locator` або outer control через `frameLocator`.
- Перевіряти underlying page, поки modal перекриває її.
- Використовувати fixed sleep для очікування листа замість унікального mailbox query.
- Вважати success toast достатнім доказом, не перевіривши реальний account state.
- Зберігати секрети в коді, логах, trace attachments або коміті.

## Наскрізний синтез плейліста

### 1. Автоматизація починається з поведінкового контракту

Найстійкіша теза курсу: тест не повинен починатися з локатора або з прохання до LLM «напиши Playwright test». Спершу потрібно зафіксувати:

1. **Precondition:** який стан системи й даних потрібен.
2. **Action:** що робить користувач або API consumer.
3. **Observable result:** який стан можна побачити через UI, API, email, downstream system або повторний login.
4. **Negative/edge behavior:** які відмови та межі є частиною вимоги.
5. **Cleanup/ownership:** які дані створив саме цей тест і як вони ізолюються.

Локатор, page object, fixture чи API helper — лише спосіб реалізувати цей контракт. Зелений тест, який перевіряє іншу поведінку, не є корисною автоматизацією.

### 2. Стабільність = правильний сигнал, а не довше очікування

- Основний synchronization mechanism — Playwright actionability, locator auto-waiting і web-first assertions.
- `waitForTimeout` не встановлює причинно-наслідковий зв'язок між дією і результатом.
- `first()`/`nth()` не виправляє неоднозначний locator, а лише приховує її.
- `networkidle` не є універсальним доказом готовності SPA чи окремого компонента.
- Сторінка, modal, iframe і повторюваний компонент мають різні DOM scopes і власні ready signals.

### 3. Архітектура тестів повторює продукт, а не API Playwright

- **Test** описує бізнес-сценарій і володіє його outcome assertions.
- **Fixture** керує lifecycle, dependency assembly, test data і setup/cleanup.
- **Page object** відкриває доменні дії та observable state сторінки, але не ховає outcome assertions усередині unrelated actions.
- **Component object** інкапсулює повторювану або автономну UI-область: modal, form, iframe, table, product card. Лише явні readiness/component invariants на кшталт `expectLoaded()` можуть містити assertion.
- **API client/helper** представляє зовнішній contract boundary і повертає typed result/cleanup handle.

Композиція є нормальним default. Наслідування та `BasePage` виправдані лише після підтвердженого спільного поведінкового контракту. Універсальні wrappers на кшталт `click(selector)` або `fill(selector)` лише дублюють Playwright і приховують намір.

### 4. Test data є частиною correctness і concurrency

- Mutable account не можна ділити між повторними або паралельними тестами.
- Для кожного mutation flow потрібні унікальні дані й correlation identifier.
- Якщо UI setup не є предметом тесту, дані швидше й стабільніше створювати через API.
- Cleanup може видаляти тільки owned data; broad cleanup небезпечний.
- `storageState` корисний для контрольованого стабільного auth/environment state, але файл може містити credentials і не повинен потрапляти в Git або логи.

### 5. TypeScript типізує код, але не валідовує зовнішню реальність

- `any` і бездоказове `as SomeType` вимикають корисну частину TypeScript саме на trust boundary.
- Response type потрібен для developer experience, але runtime JSON окремо потребує assertions або schema validation.
- API test перевіряє transport і application semantics, не тільки happy-path body.
- Для GraphQL HTTP 200 не доводить успіх operation: потрібно окремо перевіряти `errors`, `data`, nullability і partial result.

### 6. Діагностика має передувати «ремонту»

Рекомендований evidence order:

1. точний error і stack;
2. Playwright trace/report/screenshot;
3. DOM scope, overlays та iframe boundary;
4. network request/response і status;
5. config, test discovery, filename pattern, working directory та fixture import;
6. runtime/CLI reproduction поза IDE;
7. лише після цього — зміна коду або locator.

403, anti-bot, неправильний fixture import, root-owned cache або закритий modal не виправляються додатковим sleep.

### 7. Git — частина delivery contract

Нормальний цикл: синхронізувати target branch → створити task branch → зробити один перевірений vertical slice → переглянути diff → stage точних файлів → commit → push/PR лише в межах наданої авторизації. Generated reports, `.env`, storage state, traces з cookies та приватні ключі не можна включати в commit.

### 8. LLM прискорює роботу, але не замінює source of truth

- Перед передачею контексту визначити trust boundary: який provider/tool використовується, він local чи cloud, і які дані покинуть контрольоване середовище.
- Мінімізувати й редагувати DOM/HTML, logs, screenshots і headers; ніколи не передавати у prompt/cloud `storageState`, cookies або auth headers. User/customer data можна надсилати cloud-provider лише після явної згоди.
- Давати моделі target test і найближчі fixtures/page objects/types, а не весь repository.
- Просити уточнення, якщо не визначено продуктову поведінку, дані або середовище.
- Генерувати вертикальними кроками: locator/component → targeted behavior → system verification.
- Tool/MCP output завжди читати й перевіряти; сам факт tool call не є доказом успіху.
- Для детермінованої операції прямий typed API часто дешевший і надійніший за універсальний MCP.
- Кожну генерацію пропускати через typecheck, targeted test і фактичну поведінку UI/API.

## Проєктування майбутнього TypeScript automation skill

### Рекомендована місія

Skill має допомагати **діагностувати, проєктувати, реалізовувати та перевіряти TypeScript automation у наявному репозиторії**, насамперед Playwright UI/API tests. Він не повинен нав'язувати нову архітектуру, якщо в проєкті вже є working conventions.

### Trigger-и

Активувати для запитів на кшталт:

- «напиши/виправ Playwright test»;
- «цей тест flaky / test not found / timeout»;
- «зроби page object, fixture або API helper»;
- «автоматизуй login/account/order flow»;
- «перенеси manual case в TypeScript automation»;
- «згенеруй тест за DOM, trace, Swagger/OpenAPI або GraphQL schema».

### Non-goals

- Не вважати generated code перевіреним.
- Не будувати framework/scaffolding без поточної потреби.
- Не обходити anti-bot, authorization або environment restrictions.
- Не запускати destructive cleanup проти shared/prod data.
- Не зберігати й не переносити secrets, cookies, tokens чи personal data.
- Не force-push, не merge і не deploy без прямої авторизації.

### Обов'язковий workflow skill

#### Phase 0 — Repository and authority check

1. Знайти реальний Git checkout, прочитати локальні instructions.
2. Перевірити branch, worktree, user-owned changes, scripts і package manager.
3. Визначити дозволені actions: read-only, edit/commit, push, PR, merge/deploy.
4. Не включати unrelated changes.
5. Класифікувати кожний tool/API call як read-only, mutating або destructive; default — read-only, а доступні операції мають бути allowlisted.
6. Для mutation перевірити точний target ID/URL та environment, підтвердити authority на зовнішній write, використати idempotency/correlation key де це підтримується і не робити blind retry неідемпотентного write.
7. Перед cloud tool/model call застосувати trust-boundary правило: provider/locality, мінімізація/редакція та явна згода на user/customer data.

#### Phase 1 — Reconstruct the contract

1. Знайти closest existing test і production path.
2. Сформулювати Given/When/Then та system boundary.
3. Визначити test data ownership, parallelism і cleanup.
4. Для bug — спершу відтворити причину через trace/log/runtime.

#### Phase 2 — Choose the narrowest seam

Пріоритет:

1. розширити найближчий тест;
2. повторно використати existing fixture/page/component/API client;
3. використати Playwright/TypeScript built-in capability;
4. додати мінімальний новий helper/class лише за поточної потреби.

#### Phase 3 — TDD vertical slice

1. Додати одну observable expectation.
2. Запустити targeted test і зафіксувати red з правильної причини.
3. Написати мінімальну implementation.
4. Отримати green targeted test.
5. Refactor тільки на green.
6. Повторити для наступної поведінки.

#### Phase 4 — System evidence

- UI/API integration має пройти реальний contract boundary.
- Для UI зберегти trace/report на failure і перевірити actual rendered state. Capture дозволений лише в контрольованому середовищі; artifact зберігати в restricted temporary/CI storage, редагувати перед поширенням, не комітити й не прикріплювати до prompts, застосувати retention та видалення після діагностики.
- Для API перевірити method/operation, status, application errors, schema та postcondition.
- Для email/downstream flow використовувати correlation ID і точний query, не fixed sleep.

#### Phase 5 — Broader checks and delivery

1. typecheck/lint/targeted tests;
2. релевантний broader suite;
3. staged diff review;
4. focused commit, якщо edit/implement авторизовано й repository доступний;
5. push/PR лише за окремо наданою владою;
6. звіт: red evidence, green evidence, system evidence, unverified behavior і risks.

### Locator decision tree

1. `getByRole` + accessible name.
2. `getByLabel`, `getByPlaceholder`, `getByText` у вузькому scope.
3. явний `getByTestId` як product-owned testing contract.
4. chained/filter locator від логічного контейнера.
5. CSS/XPath лише з поясненням, чому попередні contracts неможливі.
6. `nth` лише якщо порядок сам є вимогою.

### Дані, auth і cleanup

- Unique-per-test data by default.
- API setup замість UI setup, якщо setup не є поведінкою під тестом.
- Separate accounts або worker-scoped accounts лише коли isolation contract доведений.
- Auth state зберігати у gitignored каталозі; не прикріплювати його до prompts/reports.
- Cleanup idempotent і scoped за створеним ID/correlation marker.
- Traces/screenshots/videos з auth або PII зберігати лише в restricted temporary/CI artifacts з визначеним retention; перед sharing редагувати, після діагностики видаляти.

### Definition of done для кожної зміни

- observable behavior реалізовано;
- правильний test seam знайдено;
- targeted test був red з очікуваної причини;
- targeted test став green;
- system-level contract перевірено там, де він потрібен;
- typecheck і релевантні broader checks пройшли;
- secrets/PII не потрапили в code, logs, traces або Git;
- зміни ізольовані від parallel tests;
- незалежний correctness/security review завершено;
- незалежний simplicity/over-engineering review завершено;
- підтверджені review findings виправлені або явно повідомлені;
- diff не містить unrelated files;
- limitations і залишкові risks явно повідомлені.

## Current-practice audit за офіційними джерелами

Цей розділ не переказує відео, а перевіряє, які тези варто закріпити як сучасні правила skill.

- [Playwright Best Practices](https://playwright.dev/docs/best-practices): офіційно рекомендує test isolation, user-visible behavior, built-in locators, web-first assertions і відмову від перевірки uncontrolled third parties. Це підтверджує основну лінію плейліста.
- [Playwright Locators](https://playwright.dev/docs/locators): `getByRole` та інші user-facing locators мають пріоритет; довгі CSS/XPath chains крихкі. `Locator` перевизначає актуальний DOM element перед кожною дією.
- [Playwright Auto-waiting](https://playwright.dev/docs/actionability): actions перевіряють visibility, stability, event reception та enabled/editable state; manual sleep не є еквівалентом цих перевірок.
- [Playwright Authentication](https://playwright.dev/docs/auth): authenticated state прискорює suite, але може містити чутливі cookies/headers і повинен бути gitignored. Це має бути security guardrail skill.
- [Playwright API testing](https://playwright.dev/docs/api-testing): `APIRequestContext` придатний для API tests, підготовки server state перед UI flow і перевірки server-side postconditions після UI дії.
- [TypeScript Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html): TypeScript активно використовує inference; `any` вимикає подальшу type checking. Skill не повинен вимагати надлишкових annotations, але має захищати зовнішні boundaries від `any`.
- [TypeScript Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html): classes — лише один спосіб моделювання; звичайний object або function часто достатні. Це підтримує правило не створювати class/page object без поведінкової потреби.
- [GraphQL Queries](https://graphql.org/learn/queries/): response повертає `data`, а failures — `errors`; operation names допомагають debugging/logging, variables треба передавати окремо, а не будувати string interpolation.
- [Git `add`](https://git-scm.com/docs/git-add): staging фіксує snapshot контенту на момент `git add`; наступні edits не потраплять у commit без повторного staging. Skill повинен завжди перевіряти staged diff, а не лише working tree.

## Hard guardrails для skill

### MUST

- Read real code/config/tests/runtime evidence before proposing a fix.
- Use project-specific extended Playwright fixture when present.
- Keep tests isolated and parallel-safe.
- Prefer web-first assertions and stable user-facing/test-id locators.
- Validate untrusted API data at runtime where correctness depends on its shape.
- Protect credentials, storage state, traces and personal data.
- Identify local/cloud trust boundaries, minimize/redact transmitted context and require explicit consent before user/customer data goes to a cloud provider.
- Classify tool calls by side effect, default to read-only, validate exact targets/environments and require authority plus retry safety for writes.
- Preserve unrelated user changes.
- Report exact commands/checks and what they actually prove.

### MUST NOT

- Add `waitForTimeout` as the default fix for flakiness.
- Use `first()`/`nth()` merely to silence strict-mode failures.
- Treat HTTP 200 as sufficient GraphQL success evidence.
- Share a mutable account across tests/workers.
- Use broad or destructive cleanup on shared environments.
- Copy code literally from automatic captions.
- Claim LLM/MCP output works without typecheck/runtime/test evidence.
- Commit secrets, generated traces/reports or unrelated files.

### SHOULD ASK BEFORE CONTINUING

- Product behavior is ambiguous and alternatives materially differ.
- Required credentials/test environment are unavailable.
- The only path changes an external contract or production data.
- Cleanup could delete non-owned data.
- Merge, deployment, force-push or history rewrite would be required.

## Мінімальний glossary

- **Actionability** — перевірки Playwright перед дією: element існує в потрібній кількості, видимий, стабільний, отримує events і доступний для дії.
- **Auto-waiting** — очікування Playwright на actionability або web-first assertion, прив'язане до конкретного стану.
- **BFF** — Backend for Frontend, gateway/API layer, оптимізований під конкретний client experience.
- **Component object** — об'єкт поведінки автономної UI-області, меншої або повторюванішої за сторінку.
- **Contract boundary** — межа, де система приймає або повертає зовнішні дані й де compile-time type недостатній.
- **DTO** — типізована форма даних для передачі через API boundary.
- **Fixture** — Playwright lifecycle/dependency mechanism для setup, teardown і складання test dependencies.
- **Flaky test** — тест із нестабільним результатом за незмінної очікуваної поведінки системи.
- **GraphQL operation error** — помилка в `errors`/partial response, яка може прийти разом з HTTP 200.
- **Locator** — лінивий Playwright query, що знаходить актуальний element під час кожної дії/assertion.
- **MCP** — протокол інтеграції agent/LLM з tools або data sources; не доказ правильності результату tool.
- **Page Object Model** — інкапсуляція UI behavior у page/component APIs; не вимога «один URL — один клас».
- **RAG** — додавання знайдених зовнішніх фрагментів у контекст LLM без перевчання моделі.
- **Storage state** — серіалізований browser auth/session state; потенційно чутливий artifact.
- **System test** — перевірка поведінки через реально розгорнуті компоненти та integration boundaries.
- **Vertical slice** — одна спостережувана поведінка, її failing test, мінімальна implementation і green evidence.
- **Web-first assertion** — Playwright assertion, що повторно перевіряє locator до очікуваного стану або timeout.

## Висновок для автора skill

Плейліст найцінніший не як каталог синтаксису Playwright, а як послідовне навчання інженерному циклу: зрозуміти реальну поведінку, знайти надійний contract boundary, побудувати мінімальну абстракцію, створити ізольовані дані, дочекатися причинного стану, діагностувати з evidence і лише потім доставити вузьку перевірену зміну. Саме цей цикл варто зробити головною поведінкою TypeScript automation skill; snippets і конкретні IDE shortcuts мають залишитися допоміжними деталями.
