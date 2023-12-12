import React from 'react';
import JournalEntryForm from '../../../components/forms/journalEntryForm';

export default function AddSomethingNew() {
  return (
    <>
      <div className="page-container">
        <h1>Add a Practice Journal Entry</h1>
        <div>
          <JournalEntryForm />
        </div>
      </div>
    </>
  );
}
