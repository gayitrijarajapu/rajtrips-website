import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const code = ts.transpileModule(
  fs.readFileSync("src/lib/cookie-consent.ts", "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
const records = new Map();
const events = [];
const context = {
  exports: {},
  localStorage: {
    getItem: (k) => records.get(k) ?? null,
    setItem: (k, v) => records.set(k, v),
  },
  window: { dispatchEvent: (event) => events.push(event) },
  CustomEvent: class {
    constructor(type, options) {
      this.type = type;
      this.detail = options.detail;
    }
  },
};
vm.runInNewContext(code, context);
const {
  defaults,
  readPreferences,
  savePreferences,
  CONSENT_KEY,
  CONSENT_UPDATED,
} = context.exports;
assert.equal(readPreferences(), null, "first visit has no saved consent");
records.set(CONSENT_KEY, "invalid json");
assert.equal(
  readPreferences(),
  null,
  "corrupt preferences must not grant consent",
);
records.set(
  CONSENT_KEY,
  JSON.stringify({ functional: "false", analytics: 1, marketing: true }),
);
assert.equal(
  readPreferences(),
  null,
  "nonboolean values must not grant consent",
);
savePreferences(defaults);
assert.equal(readPreferences().analytics, false);
assert.equal(readPreferences().marketing, false);
savePreferences({
  essential: false,
  functional: true,
  analytics: false,
  marketing: true,
});
const saved = readPreferences();
assert.equal(saved.essential, true, "essential choice cannot be disabled");
assert.equal(saved.functional, true);
assert.equal(saved.analytics, false);
assert.equal(saved.marketing, true);
assert.ok(JSON.parse(records.get(CONSENT_KEY)).updatedAt);
assert.equal(events.at(-1).type, CONSENT_UPDATED);
context.localStorage.getItem = () => {
  throw new Error("blocked");
};
context.localStorage.setItem = () => {
  throw new Error("blocked");
};
assert.equal(readPreferences(), null);
assert.doesNotThrow(
  () => savePreferences(defaults),
  "blocked storage must not crash consent controls",
);
console.log(
  "PASS consent defaults, corrupted storage, typed choices, persistence, events and blocked storage",
);
