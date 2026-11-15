import fs from "fs";
import path from "path";
import * as yaml from "js-yaml";
import { ensureDirExists } from "./utils.js";

// load environment variables from .env if not in github CI
if (!process.env.CI) {
  const dotenv = await import("dotenv");
  dotenv.config();
}

// GitHub credentials:
// - in CI/CD (GitHub Actions): read automatically from environment variables
// - in local development: load from .env file if it exists
const username = process.env.GITHUB_REPOSITORY_OWNER;
const token = process.env.GITHUB_TOKEN;

if (!username) {
  console.log("⚠️ GITHUB_USERNAME not set. Skipping fetch:repos");
  process.exit(0);
}

const projectsYamlPath = path.join(process.cwd(), "config", "projects.yaml");
const outputPath = path.join(
  process.cwd(),
  "src",
  "data",
  "generated",
  "repos.json",
);

function loadProjectsFromYaml() {
  const raw = fs.readFileSync(projectsYamlPath, "utf-8");
  const data = yaml.load(raw);

  const items = data?.projects?.items ?? [];

  // `github: false` marks a project with no public repository (e.g. a course
  // project): it's built from the YAML alone instead of the GitHub API.
  const repoItems = items.filter((item) => item.id && item.github !== false);
  const manualItems = items.filter((item) => item.id && item.github === false);

  const keepIds = new Set(repoItems.map((item) => item.id));

  const projectsDict = {};
  for (const item of repoItems) {
    const { id, ...rest } = item;
    projectsDict[id] = rest;
  }

  return { keepIds, projectsDict, manualItems };
}

// Same shape as a GitHub-backed entry, so the project pages need no changes:
// no html_url (no repo link) and no stargazers_count (no star badge).
function manualProject(item) {
  const date = String(item.date ?? "1970-01");
  const timestamp = new Date(date.length === 7 ? `${date}-01` : date).toISOString();
  return {
    name: item.id,
    description: item.description ?? null,
    stargazers_count: null,
    topics: item.topics ?? [],
    language: item.language ?? null,
    homepage: item.link ?? null,
    html_url: null,
    created_at: timestamp,
    updated_at: timestamp,
    pushed_at: timestamp,
    displayName: item.displayName ?? item.id,
    previewImage: item.previewImage ?? null,
    featured: item.featured ?? false,
  };
}

async function fetchAllRepos() {
  let page = 1;
  const perPage = 100;
  const allRepos = [];

  while (true) {
    console.log(`Fetching page ${page}...`);
    const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;

    const headers = { Accept: "application/vnd.github+json" };
    if (token) headers["Authorization"] = `token ${token}`;
    else
      console.warn(
        "⚠️ No GitHub token found. Using public API (may be rate-limited).",
      );

    const res = await fetch(url, { headers });

    if (!res.ok)
      throw new Error(
        `GitHub API responded with status ${res.status}: ${res.statusText}`,
      );

    const repos = await res.json();
    allRepos.push(...repos);

    if (repos.length < perPage) break;
    page++;
  }

  return allRepos;
}

async function fetchRepos() {
  try {
    const data = await fetchAllRepos();
    const { keepIds, projectsDict, manualItems } = loadProjectsFromYaml();

    const entries = [];

    // Forks are included too, but only when listed explicitly in projects.yaml.
    data
      .filter((repo) => !repo.private && keepIds.has(repo.name))
      .forEach((repo) => {
        entries.push({
          name: repo.name,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
          topics: repo.topics,
          language: repo.language,
          homepage: repo.homepage,
          html_url: repo.html_url,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
          ...projectsDict[repo.name],
        });
      });

    const missing = [...keepIds].filter((id) => !entries.some((e) => e.name === id));
    if (missing.length)
      console.warn(`⚠️ Not found as public repos, skipped: ${missing.join(", ")}`);

    entries.push(...manualItems.map(manualProject));

    // newest first
    entries.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    const merged = Object.fromEntries(entries.map((e) => [e.name, e]));

    ensureDirExists(outputPath);
    fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2));

    console.log(`✅ Repos written to ${outputPath}`);
  } catch (error) {
    console.error("❌ Failed to fetch repos:", error);
    process.exit(1);
  }
}

fetchRepos();
