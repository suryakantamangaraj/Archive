# Project Archive 📚

A vintage-styled vault for preserving discontinued projects. This repository manages both the source code and the live builds of various iterations of my projects.

## Project Status Definitions 📋

To maintain clarity on the state of each project in the archive, we use the following definitions:

- **Legacy**: Functional but outdated. It is supported for backward compatibility but should not be used in new development.
- **Deprecated**: Discouraged. It still works but is scheduled to be removed or replaced, warning developers to migrate soon.
- **Archived**: Inactive. It is a read-only state where a project no longer receives updates, maintenance, or bug fixes.

---

## 📂 Repository Structure

- **`main`**: The production branch containing the archive portal and all compiled project builds.
- **`src/[project]-source`**: Isolated branches containing the original source code for each archived project.
- **`projects.js`**: The central data file that populates the archive dashboard.

---

## 🛠 Adding a New Project

Any contributor can add a new project by following these steps:

### 1. Source Preservation
1.  **Create a source branch**: `git checkout -b src/[project-name]-source`.
2.  **Clean build**: Ensure the project is prepared for subfolder hosting (e.g., set `baseHref` if using Angular).
3.  **Push code**: Push the source code to this branch for safekeeping.

### 2. Deployment (GitHub Actions)
Add a deployment workflow at `.github/workflows/deploy-[name].yml` in your source branch.

**Critical Configuration**:
```yaml
uses: JamesIves/github-pages-deploy-action@v4
with:
  branch: main
  folder: dist/[build-folder] # The folder containing production assets
  target-folder: [project-name] # The subfolder in 'main' where build will live
  clean: false # IMPORTANT: Set to false to prevent deleting other archived builds!
```

### 3. Register in Dashboard (`projects.js`)
Add a new object to the `projectsData` array in `projects.js`.

| Field | Description |
| :--- | :--- |
| `id` | A unique numeric identifier for the project. |
| `title` | The name of the project. |
| `description` | A short summary of what the project does. |
| `status` | Must be one of: `legacy`, `deprecated`, or `archived`. |
| `link` | The URL to the live build or repository (e.g., `https://archive.suryaraj.com/[project-name]/`). |
| `date` | The year or timeframe of the project. |
| `tags` | An array of strings (e.g., `["Angular", "Node.js"]`) used for filtering. |

---

## ⚙️ Technical Details

### How it Works
The portal is a single-page application that dynamically renders project cards:
- **`script.js`**: Fetches data from `projects.js` and creates DOM elements.
- **Filtering**: The `id`, `tags`, and `status` fields are used by the `ProjectManager` class to handle search and category filtering.
- **Styling**: Projects are styled according to their `status` class (defined in `styles.css`).

### Managing Pipeliness
To save GitHub Action minutes for projects that are fully archived and won't change:
- **Disable**: Rename the `.yml` file to `.yml.disabled` in the source branch.
- **Restore**: Rename it back to `.yml` to trigger a fresh build.

## ⚖️ License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.