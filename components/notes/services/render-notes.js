import * as ConfirmationDialog from '../../confirmation-dialog/confirmation-dialog.js';
import * as FormatDate from '../../../scripts/format-date.js';
import * as General from '../../../scripts/general.js';

import { noteList, searchTerm, executeDeleteNote, showNotesForm } from '../notes.js';

// Function to render notes with search feature
export function render() {
  const notesContainer = document.getElementById('notes_container');
  notesContainer.innerHTML = '';
  let notes = [];

  if (searchTerm.length > 0) {
    notes = noteList.filter(note =>
      note.title.toLowerCase().includes(searchTerm) ||
      note.body.toLowerCase().includes(searchTerm)
    );
  } else {
    notes = noteList;
  }

  notes.forEach(note => {
    const noteElement = createNoteElement(note);
    notesContainer.appendChild(noteElement);
  });

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

function createNoteElement(note) {
  const noteTemplate = document.getElementById('note_tpl').content;
  const noteElement = document.importNode(noteTemplate, true);

  noteElement.querySelector('.text-smalltitle').textContent = note.title;
  noteElement.querySelector('.text-body').textContent = note.body;
  noteElement.querySelector('.text-small').textContent = FormatDate.formatDate(note.date, 'long');
  noteElement.querySelector('.note').setAttribute('data-id', note.id);

  const deleteButton = noteElement.querySelector('.note-delete');
  deleteButton.addEventListener('click', () => {
    deleteNote(note.id);
  });

  const editButton = noteElement.querySelector('.note-edit');
  editButton.addEventListener('click', () => {
    showNotesForm(note.id);
  });

  return noteElement;
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
