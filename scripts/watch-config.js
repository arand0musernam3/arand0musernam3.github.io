// Regenerates src/data/* from config/*.yaml whenever a config file changes,
// so `npm run dev:live` hot-reloads the site while you edit the YAML.
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const configDir = path.join(process.cwd(), "config");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

// site.json is imported by vite.config.ts, so rewriting it restarts the dev
// server: only regenerate it when site.yaml itself changed.
function regenerate(reason, { siteJson = true } = {}) {
  console.log(`\n🔄 ${reason}: regenerating site data...`);
  const scripts = siteJson ? ["build:site-json", "convert:config"] : ["convert:config"];
  for (const script of scripts) {
    const result = spawnSync(npm, ["run", "--silent", script], {
      stdio: ["ignore", "ignore", "inherit"],
    });
    if (result.status !== 0) {
      console.error(`❌ npm run ${script} failed (fix the YAML and save again)`);
      return;
    }
  }
  console.log("✅ Site data up to date");
}

let timer = null;
fs.watch(configDir, (_event, filename) => {
  if (!filename?.endsWith(".yaml")) return;
  // editors often fire several events per save; coalesce them
  clearTimeout(timer);
  timer = setTimeout(
    () =>
      regenerate(`config/${filename} changed`, {
        siteJson: filename === "site.yaml",
      }),
    150,
  );
});

regenerate("Startup");
console.log(`👀 Watching ${path.relative(process.cwd(), configDir)}/*.yaml`);
