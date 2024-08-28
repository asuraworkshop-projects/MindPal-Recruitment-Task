// Define the routes and the corresponding component HTML files
const routes = {
  '/': 'components/home/home.html',
  '/notes': 'components/notes/notes.html',
};

// Function to load the CSS and JS files dynamically after checking if they exist
async function loadStylesAndScripts(route) {
  const basePath = routes[route].replace('.html', '');

  // Check and load CSS
  const cssPath = `${basePath}.css`;
  const cssExists = await checkFileExists(cssPath);
  if (cssExists) {
    const existingLink = document.querySelector(`link[href="${cssPath}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssPath;
      document.head.appendChild(link);
    }
  }

  // Check and load JS
  const jsPath = `${basePath}.js`;
  const jsExists = await checkFileExists(jsPath);
  if (jsExists) {
    const module = await loadModule(`../${jsPath}`);
    // Use functions from the module
    module.initialize();  // Call a function to reinitialize or run module code
  }
}

// Helper function to check if a file exists using a HEAD request
async function checkFileExists(filePath) {
  try {
    const response = await fetch(filePath, { method: 'HEAD' });
    return response.ok; // returns true if the file exists (status code 200-299)
  } catch (error) {
    console.error(`Error checking file: ${filePath}`, error);
    return false;
  }
}

// Function to load the HTML content dynamically based on the route
async function loadComponent(route) {
  const componentPath = routes[route] || routes['/']; // Fallback to home if route not found

  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error('Network response was not ok');

    const htmlContent = await response.text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const template = tempDiv.querySelector('template');
    if (template) {
      const app = document.getElementById('app');
      app.innerHTML = ''; // Clear existing content
      app.appendChild(template.content.cloneNode(true)); // Append the new content
    }

    // Load associated CSS and JS
    await loadStylesAndScripts(route);
  } catch (error) {
    console.error('Failed to load component:', error);
  }
}

// Function to handle routing based on the URL hash
function handleRoute() {
  const hash = window.location.hash || '#/';
  const route = hash.slice(1); // Remove the '#' character
  loadComponent(route);
}

// Function to load and reinitialize js module
async function loadModule(modulePath) {
  // Check if the module is already in cache and delete it if so
  const moduleCache = import.meta.url ? import.meta.url : document.currentScript.src;
  if (moduleCache[modulePath]) {
    delete moduleCache[modulePath];
  }

  // Import the module again
  const module = await import(modulePath);
  return module;
}

// Listen to hash changes to trigger routing
window.addEventListener('hashchange', handleRoute);

// Load the initial route when the page loads
window.addEventListener('load', handleRoute);
