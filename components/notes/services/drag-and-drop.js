import { noteList, updateNoteList } from '../notes.js';

let draggedElement = null;
let placeholder = null;

// Functions to drag & drop notes
export function initNoteDragging() {
  const notesContainer = document.getElementById('notes_container');

  notesContainer.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('note') && placeholder === null && draggedElement === null) {
      draggedElement = e.target;
      e.target.classList.add('dragging');
      placeholder = createPlaceholder();
      draggedElement.parentNode.insertBefore(placeholder, draggedElement.nextSibling);
    }
  });

  notesContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const target = e.target;
    if (target && target !== draggedElement && target.classList.contains('note')) {
      const bounding = target.getBoundingClientRect();
      let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

      if (vw < 768) {
        const offset = bounding.y + (bounding.height / 2);
        if (e.clientY - offset > 0) {
          target.parentNode.insertBefore(placeholder, target.nextSibling);
        } else {
          target.parentNode.insertBefore(placeholder, target);
        }
      }
      else {
        const offset = bounding.x + (bounding.width / 2);
        if (e.clientX - offset > 0) {
          target.parentNode.insertBefore(placeholder, target.nextSibling);
        } else {
          target.parentNode.insertBefore(placeholder, target);
        }
      }
    }
  });

  notesContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    if (placeholder) {
      placeholder.parentNode.insertBefore(draggedElement, placeholder);
      placeholder.remove();
      placeholder = null;
      updateNotesOrder();
    }
  });

  notesContainer.addEventListener('dragend', (e) => {
    if (draggedElement) {
      draggedElement.classList.remove('dragging');
      draggedElement = null;
      if (placeholder) {
        placeholder.remove();
        placeholder = null;
      }
    }
  });
}

// Helper function to create a placeholder
function createPlaceholder() {
  const el = document.createElement('div');
  el.classList.add('note-placeholder', 'col-12', 'col-md-6', 'col-xl-4');
  el.style.height = `${draggedElement.offsetHeight}px`;
  return el;
}

// Helper function to update notes order
function updateNotesOrder() {
  // TODO: add REST api communication
  const notesContainer = document.getElementById('notes_container');
  const updatedOrder = [...notesContainer.children].map(note => note.dataset.id);
  updateNoteList(updatedOrder.map(id => noteList.find(note => note.id == id)));
}
