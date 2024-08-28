import * as General from '../../scripts/general.js';

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
}

function fetchData() {
  // TODO: fetching data from server
  noteList = [{
      'title': 'Notatka 1',
      'body': 'Przykładowa notatka 1',
      'date': 'May 22'
    },
    {
      'title': 'Notatka 2',
      'body': 'Przykładowa notatka 2',
      'date': 'May 23'
    },
    {
      'title': 'Notatka 3',
      'body': 'Przykładowa notatka 3',
      'date': 'May 24'
    },
    {
      'title': 'Notatka 4',
      'body': 'Przykładowa notatka 4',
      'date': 'May 25'
    },
    {
      'title': 'Notatka 5',
      'body': 'Przykładowa notatka 5',
      'date': 'May 26'
    }
  ];

  if (noteList.length > 0) {
    General.hideElementOfId('notes_empty');
    General.showElementOfId('notes_add');
    General.hideElementOfId('notes_form');
    General.showElementOfId('notes_list');
  } else {
    General.showElementOfId('notes_empty');
    General.hideElementOfId('notes_add');
    General.hideElementOfId('notes_form');
    General.hideElementOfId('notes_list');
  }
}
