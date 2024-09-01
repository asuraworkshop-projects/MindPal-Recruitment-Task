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
  return document.querySelectorAll(`.${className}`);
}

export function showElementOfId(elementId) {
  document.getElementById(elementId).style.display = '';
}

export function hideElementOfId(elementId) {
  document.getElementById(elementId).style.display = 'none';
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
