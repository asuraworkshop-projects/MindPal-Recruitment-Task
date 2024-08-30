# MindPal-Recruitment-Task
MindPal-Recruitment-Task is a note-taking app to help organize and manage notes.

This project is built with modern HTML, CSS, and JavaScript and requires no installation.
Simply deploy it to a server, and it will run seamlessly.

The application follows a Single Page Application (SPA) model with a mobile-first design approach.
Breakpoints and styles are defined in `assets/css/setup/grid.css`


# Project Structure
```
.
├── assets
│   ├── css          # Global and general styles, following a modular approach
│   ├── images       # Project images and media assets
├── components       # Application pages and reusable UI components
├── core             # Core functionality and essential application logic
├── custom-elements  # Custom HTML elements and web components
├── scripts          # Reusable scripts, utilities, helpers, and classes
├── README.md        # Project documentation
├── index.html       # Main application structure with routing
└── routes.js        # Routing definitions and configurations
```


# Example Component Structure for Routing
```
components/
└── notes            # Component directory named according to routing definition
    ├── services     # Optional: Functions used by the controller
    ├── notes.css    # Required: Component-specific styles
    ├── notes.html   # Required: Component HTML template
    └── notes.js     # Required: Component controller, must contain an "initialize()" function
```


# Component Requirements
Routing Components:
  - Controller: Each component used in routing must have a controller (.js file) that includes an `initialize()` function. This function is triggered every time the route changes.
  - Styles & Template: Each routing component must have its own .css and .html files, which define the component's styles and template.

Services:
  - Any additional functionality specific to the component should be placed in separate files within the services directory.

Non-Routing Components:
  - Components not used in routing do not require .css or .html files, nor an initialize() function.
  - Example: `components/confirmation-dialog`


# Git Flow
- main: This is the production branch. All stable code should be merged here.
- develop: This branch contains the latest development changes. All feature branches should branch off from develop and be merged back into it once complete.
- Merging into main should be made only by use of release branch with release number. Example branch name: `release/1.0.0`


# Workflow
1. Create a new branch for your feature or bugfix. Include task number. If a task requires multiple branches, append a number to the branch name. Examples:
    - `git checkout -b feature/MP-123`
    - `git checkout -b bugfix/MP-234-2`

2. Commit your changes with prefixes like feat, fix, refactor, docs or chore, and include the task number. Example:
    - `feat(MP-123): add user authentication flow`

3. Push your branch to the repository:
    - `git push origin feature/MP-123`

4. Open a Pull Request (PR):
    - Compare your branch against develop.
    - Add a clear description of what your PR does.
    - Request reviews from your team.

5. Merge the PR once approved:
    - Ensure the PR is squashed and merged to keep the commit history clean.


# format-date examples
```
formatDate(date, 'long') - Output: "April 22"
formatDate(date, 'short') - Output: "Apr 22"
formatDate(date, 'full') - Output: "Wednesday, April 22, 2024"
formatDate(date, 'shortYear') - Output: "Apr 22, 2024"
formatDate(date, 'short', true) - Output: "Apr 22, 2024" ("true" means to include year)
```
