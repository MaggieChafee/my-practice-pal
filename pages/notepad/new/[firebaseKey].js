import React from 'react';
import NoteForm from '../../../components/forms/noteForm';

export default function AddNotepad() {
  return (
    <>
      <div className="page-container">
        <h1>Add a Notepad</h1>
        <div>
          <NoteForm />
        </div>
      </div>
    </>
  );
}
