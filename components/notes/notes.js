// General imports
import * as General from '../../scripts/general.js';

// Service imports
import * as RenderNotes from './services/render-notes.js';
import * as DragAndDrop from './services/drag-and-drop.js';
import * as Search from './services/search.js';

// Global variables
export let noteList = [];
export let searchTerm = '';

// Function to initialize component
export function initialize() {
  // Add event listeners to elements
  const addButtons = document.querySelectorAll(`.notes-button-add`);
  addButtons.forEach(element => {
    element.addEventListener('click', () => showNotesForm(null));
  });

  const cancelButton = document.getElementById('notes_form_cancel');
  cancelButton.addEventListener('click', cancelNotesForm);

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

export function showNotesForm(noteId = null) {
  const notesFormId = document.getElementById('notes_form_id');
  const notesFormTitle = document.getElementById('notes_form_title');
  const notesFormBody = document.getElementById('notes_form_body');
  const notesFormMainTitle = document.getElementById('notes_form_main_title');
  const notesFormSend = document.getElementById('notes_form_send');

  if (noteId) {
    const note = noteList.find(note => note.id === noteId);
    notesFormId.value = note.id;
    notesFormTitle.value = note.title;
    notesFormBody.value = note.body;
    notesFormMainTitle.innerHTML = 'Edit note';
    notesFormSend.innerHTML = 'Edit';
  } else {
    notesFormId.value = '';
    notesFormTitle.value ='';
    notesFormBody.value = '';
    notesFormMainTitle.innerHTML = 'Add new note';
    notesFormSend.innerHTML = 'Add';
  }
  General.hideElementOfId('notes_empty');
  General.hideElementOfId('notes_add');
  General.showElementOfId('notes_form');
}

function cancelNotesForm() {
  General.hideElementOfId('notes_form');
  if (noteList.length > 0) {
    General.showElementOfId('notes_add');
  } else {
    General.showElementOfId('notes_empty');
  }
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
    cancelNotesForm();
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
  // TODO: add fetching data from server

  noteList = [];

  noteList = [{
      'id': 1,
      'order': 1,
      'title': 'Notatka 1',
      'body': 'Przykładowa notatka 1',
      'date': 'May 22'
    },
    {
      'id': 2,
      'order': 2,
      'title': 'Notatka 2',
      'body': 'Przykładowa notatka 2',
      'date': 'May 23'
    },
    {
      'id': 3,
      'order': 3,
      'title': 'Notatka 3',
      'body': 'Przykładowa notatka 3',
      'date': 'May 24'
    },
    {
      'id': 4,
      'order': 4,
      'title': 'Notatka 4',
      'body': 'Przykładowa notatka 4',
      'date': 'May 25'
    },
    {
      'id': 5,
      'order': 5,
      'title': 'Notatka 5',
      'body': 'Przykładowa notatka 5',
      'date': 'April 26'
    }
  ];

  if (noteList.length > 0) {
    General.hideElementOfId('notes_empty');
    General.showElementOfId('notes_add');
    General.hideElementOfId('notes_form');
    General.showElementOfId('notes_list');
    RenderNotes.render();
  } else {
    General.showElementOfId('notes_empty');
    General.hideElementOfId('notes_add');
    General.hideElementOfId('notes_form');
    General.hideElementOfId('notes_list');
  }
}
