import React from 'react';
import NotepadForm from '../../../components/forms/notepadForm';

export default function AddNotepad() {
  return (
    <>
      <div className="page-container">
        <h1>Add a Journal</h1>
        <div>
          <NotepadForm />
        </div>
      </div>
    </>
  );
}
