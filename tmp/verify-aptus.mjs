import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const base = "http://localhost:3200";
const port = 9333;
const screenshots = "C:/Users/piyus/Downloads/Nawkiran/Nawkiran Website/tmp";
const profile = mkdtempSync(join(tmpdir(), "codex-aptus-chrome-"));
const chrome = spawn(
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { stdio: "ignore", windowsHide: true },
);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

let version;
for (let attempt = 0; attempt < 80; attempt += 1) {
  try {
    version = await getJson(`http://127.0.0.1:${port}/json/version`);
    break;
  } catch {
    await wait(100);
  }
}
if (!version) throw new Error("Chrome DevTools endpoint did not start");

const target = await getJson(
  `http://127.0.0.1:${port}/json/new?${encodeURIComponent("about:blank")}`,
  { method: "PUT" },
);
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let commandId = 0;
const pending = new Map();
const consoleErrors = [];
const networkErrors = [];

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const callback = pending.get(message.id);
    if (!callback) return;
    pending.delete(message.id);
    if (message.error) callback.reject(new Error(message.error.message));
    else callback.resolve(message.result);
    return;
  }
  if (message.method === "Runtime.exceptionThrown") {
    consoleErrors.push(message.params.exceptionDetails.text);
  }
  if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
    consoleErrors.push(message.params.args.map((arg) => arg.value ?? arg.description).join(" "));
  }
  if (message.method === "Network.responseReceived" && message.params.response.status >= 400) {
    networkErrors.push(`${message.params.response.status} ${message.params.response.url}`);
  }
  if (message.method === "Network.loadingFailed" && !message.params.canceled) {
    networkErrors.push(`${message.params.errorText} ${message.params.type}`);
  }
});

function send(method, params = {}) {
  const id = ++commandId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function navigate(path) {
  await send("Page.navigate", { url: `${base}${path}` });
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await evaluate("document.readyState === 'complete'")) break;
    await wait(100);
  }
  await wait(500);
}

async function screenshot(name) {
  const result = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    fromSurface: true,
  });
  writeFileSync(`${screenshots}/${name}`, Buffer.from(result.data, "base64"));
}

try {
  await Promise.all([
    send("Page.enable"),
    send("Runtime.enable"),
    send("Network.enable"),
    send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    }),
  ]);

  await navigate("/aptus");
  await evaluate("localStorage.removeItem('aptus_cart_v1'); localStorage.setItem('nawkiran_cart', '[]'); location.reload()");
  await wait(800);
  assert.match(await evaluate("document.body.innerText"), /Aptus Packaging LLP/);
  assert.equal(await evaluate("document.querySelectorAll('[data-nextjs-dialog]').length"), 0);
  for (const slug of ["cosmetic-bottles", "pharma-bottles", "plastic-closures"]) {
    assert.ok(await evaluate(`document.querySelectorAll('a[href="/aptus/products/${slug}"]').length > 0`));
  }
  assert.equal(
    await evaluate("document.querySelector('link[rel=canonical]')?.href"),
    "https://nawkiran.com/aptus",
  );
  assert.equal(
    await evaluate("[...document.querySelectorAll('script[type=\"application/ld+json\"]')].some((node) => node.textContent.includes('Nawkiran Polyplast'))"),
    false,
  );
  assert.equal(await evaluate("document.querySelectorAll('a[href=\"#main-content\"]').length"), 1);
  await screenshot("aptus-desktop.png");

  await navigate("/aptus/products/cosmetic-bottles");
  assert.equal(await evaluate("document.querySelectorAll('tbody tr').length"), 34);
  assert.equal(
    await evaluate("document.querySelector('link[rel=canonical]')?.href"),
    "https://nawkiran.com/aptus/products/cosmetic-bottles",
  );
  assert.ok(
    await evaluate("[...document.querySelectorAll('button')].find((button) => button.textContent.includes('Add 10 packs'))?.click(); true"),
  );
  await wait(150);
  assert.match(
    (await evaluate("document.querySelector('button[aria-label^=\"Open Aptus quote cart\"]')?.getAttribute('aria-label')")) ?? "",
    /1 items/,
  );
  await evaluate("document.querySelector('button[aria-label^=\"Open Aptus quote cart\"]')?.click()");
  await wait(150);
  assert.equal(await evaluate("document.querySelectorAll('dialog[open]').length"), 1);
  await evaluate(`(() => {
    const input = document.querySelector('dialog[open] input[type=number]');
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(input, '2');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  })()`);
  await wait(150);
  assert.match(await evaluate("document.querySelector('dialog[open]').innerText"), /4,800/);
  const whatsappHref = await evaluate("document.querySelector('dialog[open] a[href^=\"https://wa.me/919900688790\"]')?.href");
  assert.ok(whatsappHref);
  assert.match(decodeURIComponent(whatsappHref), /2 packs × 2,400 pcs = 4,800 pcs/);
  assert.equal(await evaluate("localStorage.getItem('nawkiran_cart')"), "[]");
  await send("Input.dispatchKeyEvent", {
    type: "rawKeyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
    nativeVirtualKeyCode: 27,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
    nativeVirtualKeyCode: 27,
  });
  await wait(100);
  assert.equal(await evaluate("document.querySelectorAll('dialog[open]').length"), 0);
  assert.match(
    (await evaluate("document.activeElement?.getAttribute('aria-label')")) ?? "",
    /^Open Aptus quote cart/,
  );
  assert.match(await evaluate("localStorage.getItem('aptus_cart_v1')"), /\"packCount\":2/);
  await send("Page.reload", { ignoreCache: true });
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const label = await evaluate("document.querySelector('button[aria-label^=\"Open Aptus quote cart\"]')?.getAttribute('aria-label')");
    if (label?.includes("1 items")) break;
    await wait(100);
  }
  assert.match(
    (await evaluate("document.querySelector('button[aria-label^=\"Open Aptus quote cart\"]')?.getAttribute('aria-label')")) ?? "",
    /1 items/,
  );
  assert.equal(await evaluate("localStorage.getItem('nawkiran_cart')"), "[]");
  await screenshot("aptus-cosmetic-desktop.png");

  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await navigate("/aptus");
  assert.equal(await evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1"), true);
  await evaluate("document.querySelector('button[aria-label=\"Open Aptus menu\"]')?.click()");
  await wait(100);
  assert.equal(await evaluate("document.querySelectorAll('#aptus-mobile-menu a[href=\"/\"]').length"), 1);
  await screenshot("aptus-mobile-menu.png");

  await navigate("/aptus/products/plastic-closures");
  assert.equal(await evaluate("document.querySelectorAll('tbody tr').length"), 2);
  assert.equal(await evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1"), true);
  await screenshot("aptus-closures-mobile.png");

  await send("Emulation.setDeviceMetricsOverride", {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await navigate("/aptus");
  assert.equal(await evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1"), true);
  await screenshot("aptus-tablet.png");

  await navigate("/");
  assert.equal(
    await evaluate("document.querySelector('nav[aria-label=\"Choose company\"] a[aria-current=page]')?.textContent.trim()"),
    "Nawkiran",
  );
  assert.equal(await evaluate("localStorage.getItem('aptus_cart_v1') !== null"), true);
  assert.deepEqual(consoleErrors, []);
  assert.deepEqual(networkErrors, []);

  console.log(JSON.stringify({
    routes: ["/aptus", "/aptus/products/cosmetic-bottles", "/aptus/products/plastic-closures", "/"],
    catalogRows: 34,
    closureRows: 2,
    cartPersistence: "pass",
    cartIsolation: "pass",
    whatsappDestination: "919900688790",
    responsiveWidths: [390, 768, 1440],
    consoleErrors,
    networkErrors,
  }, null, 2));
} finally {
  try {
    await send("Browser.close");
  } catch {}
  socket.close();
  chrome.kill();
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  } catch {}
}
