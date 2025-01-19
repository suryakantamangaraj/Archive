import { projectsData } from './projects.js';  // Update path

class ProjectManager {
    constructor() {
        // Initialize DOM elements first
        this.projectsGrid = document.getElementById('projectsGrid');
        this.searchInput = document.getElementById('searchProjects');
        this.themeBtn = document.getElementById('theme-switch');
        
        // Initialize state
        this.activeFilters = {
            tag: null,
            status: null,
            year: null
        };
        
        // Set initial theme
        this.currentTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', this.currentTheme);
        
        // Setup
        this.initializeFilters();
        this.setupEventListeners();
        this.renderProjects(projectsData);

        // Set current year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();
    }

    createProjectElement(project) {
        const card = document.createElement('div');
        card.className = 'project-card';

        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = `> ${project.title}`;

        const meta = document.createElement('div');
        meta.className = 'project-meta';
        
        const date = document.createElement('span');
        date.className = 'project-date';
        date.textContent = `[${project.date}]`;

        const status = document.createElement('span');
        status.className = `project-status ${project.status}`;
        status.textContent = project.status;

        meta.appendChild(date);
        meta.appendChild(status);

        const description = document.createElement('p');
        description.className = 'project-description';
        description.textContent = project.description;

        /* 
        const tags = document.createElement('div');
        tags.className = 'project-tags';
        project.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = tag;
            tags.appendChild(tagSpan);
        });
 */
        const link = document.createElement('a');
        link.className = 'project-link';
        link.href = project.link;
        link.target = '_blank';
        link.textContent = '> View_Source';

        card.append(title, meta, description, /* tags ,*/ link);
        return card;
    }

    renderProjects(projects) {
        this.projectsGrid.innerHTML = '';
        if (projects.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No projects match the selected filters';
            this.projectsGrid.appendChild(noResults);
            return;
        }

        projects.forEach(project => {
            this.projectsGrid.appendChild(this.createProjectElement(project));
        });
    }

    filterProjects() {
        let filtered = [...projectsData];

        if (this.activeFilters.tag) {
            filtered = filtered.filter(project => 
                project.tags.includes(this.activeFilters.tag)
            );
        }

        if (this.activeFilters.status) {
            filtered = filtered.filter(project => 
                project.status === this.activeFilters.status
            );
        }

        if (this.activeFilters.year) {
            filtered = filtered.filter(project => 
                project.date === this.activeFilters.year.toString()
            );
        }

        this.renderProjects(filtered);
    }

    initializeFilters() {
        const uniqueTags = [...new Set(projectsData.flatMap(project => project.tags))];
        const uniqueStatuses = [...new Set(projectsData.map(project => project.status))];
        
        this.setupFilterButtons('tagFilters', uniqueTags, this.handleTagFilter.bind(this));
        this.setupFilterButtons('statusFilters', uniqueStatuses, this.handleStatusFilter.bind(this));
    }

    setupFilterButtons(containerId, items, handler) {
        const container = document.getElementById(containerId);
        items.forEach(item => {
            const button = document.createElement('button');
            button.className = containerId === 'tagFilters' ? 'filter-tag' : 'filter-status';
            button.textContent = item;
            button.addEventListener('click', () => handler(item));
            container.appendChild(button);
        });
    }

    handleTagFilter(tag) {
        const buttons = document.querySelectorAll('.filter-tag');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        if (this.activeFilters.tag === tag) {
            this.activeFilters.tag = null;
        } else {
            this.activeFilters.tag = tag;
            buttons.forEach(btn => {
                if (btn.textContent === tag) btn.classList.add('active');
            });
        }
        this.filterProjects();
    }

    handleStatusFilter(status) {
        const buttons = document.querySelectorAll('.filter-status');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        if (this.activeFilters.status === status) {
            this.activeFilters.status = null;
        } else {
            this.activeFilters.status = status;
            buttons.forEach(btn => {
                if (btn.textContent === status) btn.classList.add('active');
            });
        }
        this.filterProjects();
    }

    setupEventListeners() {
        const yearFilter = document.getElementById('yearFilter');
        yearFilter.addEventListener('input', (e) => {
            this.activeFilters.year = e.target.value ? parseInt(e.target.value) : null;
            this.filterProjects();
        });
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    handleSearch(searchTerm) {
        let filtered = [...projectsData];
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(project => 
                project.title.toLowerCase().includes(term) ||
                project.description.toLowerCase().includes(term) ||
                project.tags.some(tag => tag.toLowerCase().includes(term))
            );
        }
        this.renderProjects(filtered);
    }

    setupTheme() {
        document.body.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setupTheme();
    }
}

// Wait for DOM to be fully loaded
window.addEventListener('DOMContentLoaded', () => {
    const manager = new ProjectManager();
});