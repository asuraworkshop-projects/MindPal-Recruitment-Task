// Define the routes and the corresponding component HTML files
const routes = {
  '/': 'components/home/home.html',
  '/notes': 'components/notes/notes.html',
};

// Function to load the HTML content dynamically based on the route
async function loadComponent(route) {
  const componentPath = routes[route] || routes['/']; // Fallback to Home if route not found
  const response = await fetch(componentPath);
  const htmlContent = await response.text();

  // Parse the fetched HTML content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  // Extract the template content
  const template = tempDiv.querySelector('template');
  if (template) {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear existing content
    app.appendChild(template.content.cloneNode(true)); // Append the new content
  }
}

// Function to handle routing based on the URL hash
function handleRoute() {
  const hash = window.location.hash || '#/';
  const route = hash.slice(1); // Remove the '#' character
  loadComponent(route);
}

// Listen to hash changes to trigger routing
window.addEventListener('hashchange', handleRoute);

// Load the initial route when the page loads
window.addEventListener('load', handleRoute);
