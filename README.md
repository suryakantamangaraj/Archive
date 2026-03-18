# Project Archive 📚

A vintage-styled vault for preserving discontinued projects. This repository manages both the source code and the live builds of various iterations of my projects.

## Repository Structure 📁

- **`main`**: The production branch containing the archive portal and all compiled project builds.
- **`src/archive-portal`**: Source code for the main landing page.
- **`src/*-source`**: Isolated branches containing the original source code for each archived project.

---

## 🚀 How to Archive a New Project

### 1. Preparation
1.  **Generate a clean build**: Ensure your project is ready for subfolder hosting (check `baseHref`).
2.  **Create a source branch**: `git checkout -b src/[project-name]`.

### 2. Configure CI/CD (GitHub Actions)
Add a deployment workflow at `.github/workflows/deploy-[name].yml`.

**Critical Settings**:
```yaml
uses: JamesIves/github-pages-deploy-action@v4
with:
  branch: main
  folder: dist/[build-folder]
  target-folder: [project-name]
  clean: false # NEVER set to true as it will delete other archives!
```

### 3. Deploy & Update
1. Push to the new branch to trigger the build.
2. Update `projects.js` in the `main` branch to add the new entry to the dashboard.

---

## ⚙️ Managing Pipeline (On/Off)

To avoid unnecessary runs once a project is archived:
- **Disable**: Rename the `.yml` file to `.yml.disabled` in the source branch.
- **Restore**: Rename it back to `.yml` to update the archive.

## ⚖️ License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.