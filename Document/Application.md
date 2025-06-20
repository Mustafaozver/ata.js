**Application Module**

The `Application` module (also known as `App`) is the entry point of the ata.js system. It is the first module that gets executed when the project starts. Its job is to determine the current **mode** (such as `Run`, `Test`, or `Electron`) and initialize the core system accordingly.

(Türkçe: Application modülü sistemin ilk çalışan parçasıdır ve hangi modun aktif olduğunu tespit edip diğer modülleri buna göre başlatır.)

---

**Core Responsibility**

The main responsibility of the Application module is to:

* Detect the runtime mode from the environment variables.
* Set the default mode to `"Run"` if none is specified.
* Initialize the global `Project` object, which will be used to access all modules from anywhere in the system.
* Begin the loading sequence for all necessary modules depending on the selected mode.

(Türkçe: Environment üzerinden hangi modun çalıştırılacağı belirlenir. Bu belirleme sonucuna göre gerekli modüller sırayla yüklenmeye başlanır. Bu sıralama önemlidir.)

---

**Startup Sequence**

Here is the general boot order triggered by the Application module:

1. **Library modules** are loaded first. These have root-level access and can define core functions, utilities, or tools required by other modules.
   (Türkçe: Library modülleri her zaman önce ve tam yetkiyle yüklenir, çünkü diğer parçaların çalışmasında doğrudan rol oynayabilirler.)
2. **Config** and **Constant** modules are then checked. They are not always loaded unless the system or dependent modules require them.
   (Türkçe: Config ve Constant dosyaları isteğe bağlı yüklenir ama sistemin özelleştirilmesinde temel rol oynarlar.)
3. **Controller** modules are loaded next. These also run in root context (but sometimes partially limited). Controllers often trigger the loading of other dependent modules like `Database`, `Log`, `Source`, etc.
4. Controllers can also define services or helper functions that will later be used by **Service** modules.
   (Türkçe: Controller modülleri sistemin mantıksal yükünü taşır ve diğer parçaları tetikleyebilir. Ayrıca Service’lerin kullanacağı bazı yapıların da tanımlayıcısı olabilir.)

---

**Behavior Notes**

* The Application module does **not** expose any service or functionality directly.
* It simply bootstraps the rest of the system based on configuration and context.
* It should contain minimal logic — just the necessary orchestration to initialize everything else.

(Türkçe: Application doğrudan bir görev yapmaz, sadece sistemin çalışmasını başlatır ve sıralı olarak parçaları hazırlar.)

---

**Example Behavior (Simplified)**

* `Project` is initialized.
* Active mode is set from `process.env.MODE` or defaults to `"Run"`.
* Application requests Project to load the current Mode’s declared modules.
* Those modules are loaded one by one, respecting dependencies.

---

**Special Case**

If a Controller depends on another Controller, it will wait until the dependency is ready. This behavior is managed through internal promises. Each module resolves with `OK()` or rejects with `NO()`, and they provide results using `Return`.

(Türkçe: Controller’lar birbirine bağımlı çalışabilir. Bu durumda sistem otomatik olarak önce bağımlı olan Controller’ı başlatır. Promise yapısıyla çalışır ve OK/NO ile durum belirlenir.)
