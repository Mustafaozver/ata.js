**Constant Module**

The `Constant` module defines static JSON-based data that does  **not contain any JavaScript code** . These values are typically used as system-level constants and are strictly read-only unless explicitly allowed.

(Türkçe: Constant modülü yalnızca JSON türünde veri içerir ve bu veriler sabittir. İçinde `const`, `function`, `let` gibi hiçbir JavaScript komutu bulunmaz.)

---

**Format & Structure**

Each Constant file must contain **valid JSON data** with a specific meta structure:

```json
{
  "isWrite": true,
  "lastWrite": 1702471244782,
  "APP_NAME": "ATA System",
  "VERSION": "1.0.3",
  "MAX_RETRY": 5
}
```


* `isWrite`: If `true`, the constant can be updated using `Save()` function.
* `lastWrite`: A timestamp (typically `Date.now()`) representing the last time the data was written to disk.
* All other keys are static values used across the system.

(Türkçe: `isWrite` değeri true ise bu veriler sistemde yeniden yazılabilir. `lastWrite` bu verilerin son değişim zamanını belirtir.)

---

**Accessing Constant Values**

You can retrieve constant values using:

```javascript
const myConst = Project.Constant.Get("SystemInfo").Export;
console.log(myConst.APP_NAME); // → "ATA System"
```

or:

```javascript
const version = Project.Constant.Get("SystemInfo").Return.VERSION;
```


Both `Export` and `Return` access methods work identically for Constant modules.

---

**Writing (if allowed)**

If `isWrite` is set to `true`, the constant module can be modified during runtime and saved back:

```javascript
const constRef = Project.Constant.Get("SystemInfo");
constRef.Export.VERSION = "1.0.4";
constRef.Save(); // Will update the file and set new `lastWrite`
```


If `isWrite` is `false`, the `Save()` call will be rejected or ignored.

(Türkçe: isWrite false ise Save işlemi hiçbir etkide bulunmaz.)

---

**Usage Notes**

* Constant files are treated as **pure data** — never logic.
* The use of valid JSON (not JS object) is  **strictly enforced** .
* Recommended to group related constants in files like `System.json`, `Limits.json`, `Labels.json`, etc.
* These constants are usually loaded when needed, but can also be preloaded by the default service if required globally.

---

**Best Practices**

* Keep `isWrite` as `false` for safety unless runtime modification is expected.
* Use `lastWrite` to track config changes or for cache invalidation logic.
* Use Constants only for truly  **static definitions** . Use `Config` for runtime environment-specific values.
