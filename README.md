# Project Archive 📚

A vintage-styled vault for preserving discontinued projects. This repository manages both the source code and the live builds of various iterations of my projects.

## Repository Structure 📁

- **`main`**: The production branch containing the archive portal and all compiled project builds.
- **`src/archive-portal`**: Source code for the main landing page.
- **`src/personal-website-2020`**: Source for the 2020 Angular site.
- **`src/personal-website-2025`**: Source for the upcoming 2025 site iteration.

## How to Archive a New Project 🚀

1. **Create Source Branch**:
   Push your project source code to a branch named `src/[project-name]`.

2. **Setup Build & Deploy**:
   Use a GitHub Action to build your project and deploy it to a subfolder in `main`. 
   **CRITICAL**: Ensure the action is configured with `target-folder` and `clean: false` to avoid deleting existing archives.

   ```yaml
   uses: JamesIves/github-pages-deploy-action@v4
   with:
     branch: main
     folder: [build-folder]
     target-folder: [project-name]
     clean: false
   ```

3. **Update Portal**:
   Add the new archive entry to `projects.js` in the `main` branch.