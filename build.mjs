import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

process.chdir(fileURLToPath(new URL(".", import.meta.url)));
// Hosting environment variables take precedence over the local .env file.
if (existsSync(".env")) process.loadEnvFile(".env");

const config = {};
for (const key of ["LINK_PLAY", "LINK_SIGNALS","LINK_TOWER"]) {
  const value = (process.env[key] || "").trim();
  if (value) {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) {
      throw new Error(`${key} must be an HTTP or HTTPS URL`);
    }
  } else {
    console.warn(`${key} is empty; its cards will remain unconfigured.`);
  }
  config[key] = value;
}

await mkdir("dist", { recursive: true });
for (const file of ["styles.css", "script.js", "assets"]) {
  await cp(file, `dist/${file}`, { recursive: true });
}
const html = await readFile("index.html", "utf8");
await writeFile("dist/index.html", html.replace(
  '<script src="./script.js"></script>',
  '<script src="./config.js"></script>\n<script src="./script.js"></script>',
));
await writeFile("dist/config.js", `window.LUCKY_NINJA_CONFIG = ${JSON.stringify(config)};\n`);
console.log("Built site in dist/");
