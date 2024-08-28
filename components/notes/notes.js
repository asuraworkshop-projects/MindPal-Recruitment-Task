import * as General from '../../scripts/general.js';
import * as FormatDate from '../../scripts/format-date.js';
import * as ConfirmationDialog from '../confirmation-dialog/confirmation-dialog.js';

// Global variables
let noteList = [];

// Function to initialize component
export function initialize() {
  // Add event listeners to elements
  const addButtons = document.querySelectorAll(`.notes-button-add`);
  addButtons.forEach(element => {
    element.addEventListener('click', showNotesForm);
  });

  const cancelButton = document.getElementById('notes_form_cancel');
  cancelButton.addEventListener('click', cancelNotesForm);

  const formButton = document.getElementById('notes_form_send');
  formButton.addEventListener('click', noteFormSend);

  // Initalize functions when component is loaded
  fetchData();
}

function showNotesForm() {
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
  const noteTitle = document.getElementById('notes_form_title');
  const noteBody = document.getElementById('notes_form_body');

  // TODO: add communication with server

  cancelNotesForm();
}

function fetchData() {
  // TODO: fetching data from server
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

function renderNotes() {
  const notesContainer = document.getElementById('notes_container');
  const noteTemplate = document.getElementById('note_tpl').content;

  notesContainer.innerHTML = ''; // Clear existing notes

  noteList.forEach(note => {
    const noteElement = document.importNode(noteTemplate, true);

    noteElement.querySelector('.note-title').textContent = note.title;
    noteElement.querySelector('.note-body').textContent = note.body;
    noteElement.querySelector('.note-date').textContent = FormatDate.formatDate(note.date, 'long');

    const deleteButton = noteElement.querySelector('.note-delete');
    deleteButton.addEventListener('click', () => {
      deleteNote(note.id);
    });

    const editButton = noteElement.querySelector('.note-edit');
    editButton.addEventListener('click', () => {
      editNote(note.id);
    });

    notesContainer.appendChild(noteElement);
  });
}

function deleteNote() {
  const confirmationDialogData = {
    'title': 'Delete Note',
    'info': 'Are you sure you want to delete this note?',
    'cancelText': 'Cancel',
    'confirmText': 'Delete'
  };
  ConfirmationDialog.showConfirmationDialog(confirmationDialogData, executeDeleteNote);
}

function executeDeleteNote() {
  alert(1);
}
