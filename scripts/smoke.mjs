const elements = new Map();
const listeners = {};

function element(id = "") {
  if (!elements.has(id)) {
    elements.set(id, {
      id,
      innerHTML: "",
      textContent: "",
      value: "",
      scrollHeight: 0,
      scrollTop: 0,
      style: {},
      classList: { add() {}, remove() {}, contains() { return false; } },
      addEventListener() {},
      setAttribute() {},
      getAttribute() { return null; },
      hasAttribute() { return false; },
      closest() { return null; },
      querySelector() { return null; },
      querySelectorAll() { return []; }
    });
  }
  return elements.get(id);
}

globalThis.window = {
  CAREIQ_CONFIG: {
    environment: "prototype",
    auth: { mode: "mock" },
    api: { mode: "mock", baseUrl: "/api/v1", timeoutMs: 12000 },
    features: {}
  },
  scrollTo() {},
  location: { origin: "http://localhost", pathname: "/" }
};

globalThis.document = {
  getElementById: (id) => element(id),
  addEventListener(type, fn) { listeners[type] = fn; },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  body: element("body")
};

globalThis.setInterval = () => 0;
globalThis.setTimeout = () => 0;
globalThis.clearTimeout = () => {};

await import(new URL("../src/main.js", import.meta.url));

const app = element("app");
if (!app.innerHTML.includes("CARE CONSOLE")) throw new Error("Dashboard did not render");
if (!app.innerHTML.includes("ASSIGNED TO YOU")) throw new Error("Approved dashboard layout missing");
if (!listeners.click) throw new Error("Global click handler not registered");

function fakeTarget(attrs = {}, id = "") {
  return {
    id,
    tagName: "BUTTON",
    classList: { contains() { return false; } },
    hasAttribute(name) { return Object.prototype.hasOwnProperty.call(attrs, name); },
    getAttribute(name) { return attrs[name]; },
    closest(selector) {
      if (selector === ".notif" || selector === ".modal__box") return null;
      return this;
    }
  };
}

function click(attrs, id = "") {
  listeners.click({ target: fakeTarget(attrs, id) });
}

click({ "data-notif": "toggle" });
if (!app.innerHTML.includes("Announcements")) throw new Error("Announcements dropdown did not render");

click({ "data-go": "call" });
if (!app.innerHTML.includes("Customer lifetime value")) throw new Error("Call view did not render");
if (!app.innerHTML.includes("CareIQ Assist")) throw new Error("CareIQ Assist missing");

click({ "data-wrap": "open" });
if (!app.innerHTML.includes("Call wrap-up")) throw new Error("Wrap-up modal did not render");
if (!app.innerHTML.includes("Wrap up code")) throw new Error("Wrap-up fields missing");

console.log("CareIQ smoke tests passed.");
