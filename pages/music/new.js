import React from 'react';
import MusicForm from '../../components/forms/musicForm';

export default function AddSomethingNew() {
  return (
    <>
      <div className="page-container">
        <h1>Add Something New</h1>
        <div>
          <MusicForm />
        </div>
      </div>
    </>
  );
}
