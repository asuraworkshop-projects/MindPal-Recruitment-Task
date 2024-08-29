import * as General from '../../scripts/general.js';
import * as FormatDate from '../../scripts/format-date.js';
import * as ConfirmationDialog from '../confirmation-dialog/confirmation-dialog.js';

// Global variables
let noteList = [];
let draggedElement = null;
let placeholder = null;

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

  // Initalize functions when component is loaded
  fetchData();
  initNoteDragging();
}

function showNotesForm(noteId = null) {
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

function renderNotes() {
  const notesContainer = document.getElementById('notes_container');
  const noteTemplate = document.getElementById('note_tpl').content;

  notesContainer.innerHTML = '';

  noteList.forEach(note => {
    const noteElement = document.importNode(noteTemplate, true);

    noteElement.querySelector('.note-title').textContent = note.title;
    noteElement.querySelector('.note-body').textContent = note.body;
    noteElement.querySelector('.note-date').textContent = FormatDate.formatDate(note.date, 'long');
    noteElement.querySelector('.note').setAttribute('data-id', note.id);

    const deleteButton = noteElement.querySelector('.note-delete');
    deleteButton.addEventListener('click', () => {
      deleteNote(note.id);
    });

    const editButton = noteElement.querySelector('.note-edit');
    editButton.addEventListener('click', () => {
      showNotesForm(note.id);
    });

    notesContainer.appendChild(noteElement);
  });
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

function deleteNote(noteId) {
  const confirmationDialogData = {
    'title': 'Delete Note',
    'info': 'Are you sure you want to delete this note?',
    'cancelText': 'Cancel',
    'confirmText': 'Delete'
  };
  ConfirmationDialog.showConfirmationDialog(confirmationDialogData, () => executeDeleteNote(noteId));
}

function executeDeleteNote(noteId) {
  // TODO: add REST api communication

  noteList = noteList.filter(note => note.id !== noteId);

  renderNotes();
}

function executeEditNote(noteId, updatedProperties) {
  // TODO: add REST api communication

  const index = noteList.findIndex(note => note.id === noteId);
  if (index !== -1) {
    noteList[index] = { ...noteList[index], ...updatedProperties };
  }

  renderNotes();
}

function executeAddNote(data) {
  // TODO: add REST api communication

  const additionalData = { 'date': new Date() };
  const obj = { ...data, ...additionalData };
  noteList.push(obj);

  renderNotes();
}

function fetchData() {
  // TODO: add fetching data from server

  noteList = [];

  noteList = [{
      'id': 1,
      'title': 'Notatka 1',
      'body': 'Przykładowa notatka 1',
      'date': 'May 22'
    },
    {
      'id': 2,
      'title': 'Notatka 2',
      'body': 'Przykładowa notatka 2',
      'date': 'May 23'
    },
    {
      'id': 3,
      'title': 'Notatka 3',
      'body': 'Przykładowa notatka 3',
      'date': 'May 24'
    },
    {
      'id': 4,
      'title': 'Notatka 4',
      'body': 'Przykładowa notatka 4',
      'date': 'May 25'
    },
    {
      'id': 5,
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
    renderNotes();
  } else {
    General.showElementOfId('notes_empty');
    General.hideElementOfId('notes_add');
    General.hideElementOfId('notes_form');
    General.hideElementOfId('notes_list');
  }
}

// Functions to drag & drop notes
function initNoteDragging() {
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
      const offset = bounding.y + (bounding.height / 2);

      if (e.clientY - offset > 0) {
        target.parentNode.insertBefore(placeholder, target.nextSibling);
      } else {
        target.parentNode.insertBefore(placeholder, target);
      }
    }
  });

  notesContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    if (placeholder) {
      placeholder.parentNode.insertBefore(draggedElement, placeholder);
      placeholder.remove();
      placeholder = null;
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
