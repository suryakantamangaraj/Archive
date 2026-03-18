# Development & Archiving Guide 📚

This repo caches and hosts historical versions of my personal projects. It follows a **Monorepo-style structure using multiple branches** to isolate source code from static build files.

---

## 🏗️ Repository Architecture

| Branch | Purpose | Content |
| :--- | :--- | :--- |
| `main` | **Production/Live** | The Portal (Dashboard) and all project static build folders. |
| `src/archive-portal` | Source | Source code for the main landing page UI. |
| `src/*` | Archive Source | Original source code (Node.js, Angular, etc.) for each archived project. |

---

## 🚀 How to Archive a New Project

### 1. Preparation
1.  **Generate a clean build**: Ensure your project is ready to be hosted in a subfolder (e.g., `/my-project-2025/`).
2.  **Create a source branch**: `git checkout -b src/[project-name]`.

### 2. Configure CI/CD (GitHub Actions)
Each archive project should have a deployment workflow in its branch at `.github/workflows/deploy-[name].yml`.

**Minimal Template**:
```yaml
uses: JamesIves/github-pages-deploy-action@v4
with:
  branch: main
  folder: dist/[build-folder] # Where your build files are
  target-folder: [project-name] # Directory name in 'main' branch
  clean: false # IMPORTANT: Do NOT delete other archives!
```

### 3. Deploy
1. Push the source code to the new branch.
2. The GitHub Action will automatically build and push the static files to the specified folder in `main`.

### 4. Update the Portal
1. Switch to `main`.
2. Edit `projects.js` and add the new project metadata to the `projectsData` array.
3. Commit and push: `git commit -am "feat: add [project-name] to archive" && git push origin main`.

---

## ⚙️ Managing CI/CD Pipelines

To keep the repository clean and avoid unnecessary GitHub Action runs once a project is fully archived:

### 🔇 To Disable a Workflow
Rename the `.yml` file in the source branch to end with `.disabled`.
- Example: `.github/workflows/deploy-2025.yml` → `.github/workflows/deploy-2025.yml.disabled`.

### 🔊 To Re-enable/Restore
If you need to fix a bug or update an archive:
1. Rename the file back to `.yml`.
2. Make your code changes and push. The workflow will re-trigger and update the `main` branch.

---

## 🛠️ Restoring a Broken Archive
If the layout or routing breaks inside a subfolder:
- Check `angular.json` for `baseHref` and `deployUrl`.
- Ensure the `main` branch contains a `404.html` (which is a copy of `index.html`) inside the project folder for SPA routing.
