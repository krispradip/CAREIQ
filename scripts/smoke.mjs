const elements = new Map();
const listeners = {};
const session = new Map();

function element(id = "") {
  if (!elements.has(id)) {
    elements.set(id, {
      id,
      innerHTML: "",
      textContent: "",
      value: "",
      type: id === "loginPassword" ? "password" : "text",
      disabled: false,
      scrollHeight: 0,
      scrollTop: 0,
      style: {},
      classList: { add() {}, remove() {}, contains() { return false; } },
      addEventListener() {},
      setAttribute() {},
      focus() {},
      getAttribute() { return null; },
      hasAttribute() { return false; },
      closest() { return null; },
      querySelector() { return null; },
      querySelectorAll() { return []; }
    });
  }
  return elements.get(id);
}

globalThis.sessionStorage = {
  getItem(key) { return session.has(key) ? session.get(key) : null; },
  setItem(key, value) { session.set(key, String(value)); },
  removeItem(key) { session.delete(key); }
};

globalThis.window = {
  CAREIQ_CONFIG: {
    environment: "prototype",
    auth: { mode: "mock" },
    api: { mode: "mock", baseUrl: "/api/v1", timeoutMs: 12000 },
    features: {}
  },
  sessionStorage: globalThis.sessionStorage,
  scrollTo() {},
  location: { origin: "http://localhost", pathname: "/", reload() {} }
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

const { renderLogin } = await import(new URL("../src/auth/loginView.js", import.meta.url));
renderLogin();
if (!element("app").innerHTML.includes("Sign in to CareIQ")) throw new Error("Login screen did not render");
if (!element("app").innerHTML.includes("Microsoft Entra ID SSO")) throw new Error("Entra production direction missing from login");

const { signIn } = await import(new URL("../src/auth/authService.js", import.meta.url));
await signIn("layla.haddad@maf.ae", "welcome123");
await import(new URL("../src/main.js", import.meta.url));

const app = element("app");
if (!app.innerHTML.includes("CARE CONSOLE")) throw new Error("Dashboard did not render after login");
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
click({ "data-wrap": "close" });

// Regression guard for the existing chat emulation. The app-controller refactor
// must not change the legacy chat runtime, composer or immediate outgoing-message path.
click({ "data-go": "chat" });
if (!app.innerHTML.includes("Customer · chat view")) throw new Error("Chat view did not render");
if (!app.innerHTML.includes("chatInput")) throw new Error("Chat composer missing");
const quickReply = "I can help with that.";
click({ "data-quick": quickReply });
if (!element("chatLog").innerHTML.includes(quickReply)) throw new Error("Chat emulation did not send the quick reply");

// Sign-out must clear the prototype session. The application controller owns
// the lifecycle even though the legacy header still renders the button.
click({ "data-signout": "true" });
await new Promise((resolve) => setImmediate(resolve));
if (session.has("careiq.prototype.session.v0.5.1")) throw new Error("Sign out did not clear the prototype session");
if (!app.innerHTML.includes("Sign in to CareIQ")) throw new Error("Sign out did not return to the login screen");

console.log("CareIQ smoke tests passed, including login, sign-out and chat emulation.");
