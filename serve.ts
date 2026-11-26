// serve.ts — tiny static server for local testing of app/ (Node 22 stdlib only).
// Usage: node serve.ts [--port 8080]  — then open http://localhost:8080/
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const root = join(here, "app");
const port = Number(process.argv.find((a) => a.startsWith("--port="))?.split("=")[1] ?? 8080);
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".mjs": "application/javascript", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg" };

createServer((req, res) => {
  const path = normalize("/" + (req.url ?? "/").split("?")[0].split("#")[0]);
  const file = join(root, path === "/" ? "index.html" : path);
  if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
}).listen(port, () => console.log(`NusaStat at http://localhost:${port}/`));
