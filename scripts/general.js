export function showIdFromClass(elementId, className) {
  const elements = document.querySelectorAll(`.${className}`);

  elements.forEach(element => {
    if (element.id === elementId) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}

export function getAllElementsOfClass(className) {
  return elements = document.querySelectorAll(`.${className}`);
}

export function showElementOfId(elementId) {
  const elements = document.getElementById(elementId).style.display = '';
}

export function hideElementOfId(elementId) {
  const elements = document.getElementById(elementId).style.display = 'none';
}

export function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
