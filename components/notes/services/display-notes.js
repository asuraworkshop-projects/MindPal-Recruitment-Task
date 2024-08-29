import * as General from '../../../scripts/general.js';

import { noteList } from '../notes.js';

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

export function cancelNotesForm() {
  General.hideElementOfId('notes_form');
  if (noteList.length > 0) {
    General.showElementOfId('notes_add');
  } else {
    General.showElementOfId('notes_empty');
  }
}
