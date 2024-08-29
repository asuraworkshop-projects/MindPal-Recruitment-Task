import { debounce } from '../../../scripts/general.js';

import * as RenderNotes from './render-notes.js';
import { updateSearchTerm } from '../notes.js';

// Function to filter note list
export function initNoteSearch() {
  const notesSearch = document.getElementById('notes_search');

  notesSearch.addEventListener('input', debounce(function() {
    updateSearchTerm(notesSearch.value.toLowerCase());
    RenderNotes.render();
  }, 300));
}
