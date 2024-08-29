// General imports
import { ApiService } from '../../scripts/api-service.js';

// Component imports
import * as RenderNotes from './services/render-notes.js';
import * as DragAndDrop from './services/drag-and-drop.js';
import * as Search from './services/search.js';
import * as DisplayNotes from './services/display-notes.js';

// Global variables
export let noteList = [];
export let searchTerm = '';
const apiUrl = 'https://projects.asuraworkshop.com/MindPalApi/'

// Function to initialize component
export function initialize() {
  // Add event listeners to elements
  const addButtons = document.querySelectorAll(`.notes-button-add`);
  addButtons.forEach(element => {
    element.addEventListener('click', () => DisplayNotes.showNotesForm(null));
  });

  const cancelButton = document.getElementById('notes_form_cancel');
  cancelButton.addEventListener('click', () => DisplayNotes.cancelNotesForm());

  const formButton = document.getElementById('notes_form_send');
  formButton.addEventListener('click', noteFormSend);

  const notesForm = document.getElementById('notes_form');
  notesForm.addEventListener('submit', function(event) {
    event.preventDefault();
  });

  // Initalize functions when component is loaded
  fetchData();
  DragAndDrop.initNoteDragging();
  Search.initNoteSearch();

}

export function updateNoteList(value) {
  noteList = value;
}

export function updateSearchTerm(value) {
  searchTerm = value;
}

// Function to send note form (validation in html and on backend side)
function noteFormSend() {
  // TODO: add REST api communication

  const notesFormId = document.getElementById('notes_form_id');
  const notesFormTitle = document.getElementById('notes_form_title');
  const notesFormBody = document.getElementById('notes_form_body');
  const noteData = {
    'title': notesFormTitle.value,
    'body': notesFormBody.value
  }
  if (noteData.title.length >= 1 && noteData.body.length >= 4) {
    if (notesFormId.value) {
      executeEditNote(Number(notesFormId.value), noteData);
    } else {

      // TODO: remove id setting after adding REST api
      const highestId = noteList.reduce((max, note) => {
        return note.id > max ? note.id : max;
      }, 0);
      noteData.id = highestId + 1;

      executeAddNote(noteData);
    }
  }
}

export function executeDeleteNote(noteId) {
  // TODO: add REST api communication

  noteList = noteList.filter(note => note.id !== noteId);
  RenderNotes.render();
}

function executeEditNote(noteId, updatedProperties) {
  // TODO: add REST api communication

  const index = noteList.findIndex(note => note.id === noteId);
  if (index !== -1) {
    noteList[index] = { ...noteList[index], ...updatedProperties };
  }

  RenderNotes.render();
}

function executeAddNote(data) {
  // TODO: add REST api communication

  const additionalData = { 'date': new Date() };
  const obj = { ...data, ...additionalData };
  noteList.push(obj);

  RenderNotes.render();
}

function fetchData() {
  // rendering empty list to set html template
  RenderNotes.render();

  // fetching data from server and re-render view
  ApiService.fetchData(apiUrl)
  .then(data => {
    noteList = data;
    RenderNotes.render();
  })
  .catch(error => {
    console.error('Failed to fetch data:', error);
  });
}
