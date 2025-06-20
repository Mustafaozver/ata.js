**Config Module**

The `Config` module is responsible for defining the configuration values of the system. It typically includes environment-specific variables, credentials, API endpoints, or any custom settings used by other modules.

(Türkçe: Config modülü, sistemin ayarlarını barındırır. Ortam değişkenleri, API adresleri, gizli bilgiler veya özel yapılandırmalar bu modülde yer alır.)

---

**Key Responsibilities**

* Provides global or scoped configuration values.
* Can be accessed by any module, but must be explicitly loaded.
* It does not run any logic or side effects; it’s only a data source.
* Can return either static values or functions that return values dynamically.

(Türkçe: Config modülü bir işlem gerçekleştirmez. Sadece veri sağlar. Değerler sabit olabileceği gibi fonksiyonla hesaplanmış da olabilir.)

---

**Access Pattern**

When loaded, the Config module exports a set of values via `Return` or `Export`. These can be accessed like this:

```javascript
// Calling Config Module
// Using Export

const conf = Project.Config.Get("MyConfig");
const token = conf.Export.JWT_TOKEN;
```

Or if the module uses `Return`:

```javascript
// Calling Config Module
// Using Return

const api = Project.Config.Get("Api").Return.BaseURL;
```

(Türkçe: Config modülü genelde Export ile veri döner. Ama Return ile de erişilebilir. Her iki yöntem de sistemde geçerlidir.)

---

**Example Content**

Inside `Config/Api.js`:

```javascript
const BASE_URL = "https://api.example.com";
const TIMEOUT = 5000;

const JWT_TOKEN = "eyJ...";

OK({ // Exporting Values
	BASE_URL,
	TIMEOUT
});

return{
	JWT_TOKEN
}
```

(Türkçe: Gördüğün gibi sadece değerler tanımlanıyor ve OK ile dışa aktarılıyor.)

---

**Behavioral Notes**

* Config modules are not loaded automatically unless required by other modules (e.g., Controllers or Services).
* They are safe to use in restricted contexts because they do not perform privileged operations.
* They are lightweight and synchronous in nature but can be adapted for async needs if needed.

---

**Lifecycle**

1. The Service (Default or Mode-defined) determines which Configs are needed.
2. Those Configs are loaded on-demand via `Project.Config.Get(name)`.
3. Once loaded, the `Export` or `Return` values are available for use.

(Türkçe: Config modülleri sadece ihtiyaç olduğunda yüklenir. Genelde Controller ya da Service tarafından çağrılır.)

---

**Best Practices**

* Group related configuration into separate files (e.g., `Database.js`, `Api.js`, `Security.js`).
* Avoid placing executable logic inside Configs.
* Sensitive values can be managed via environment variables and passed into the config module safely.
