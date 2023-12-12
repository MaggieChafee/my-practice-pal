import React from 'react';
import GoalForm from '../../../components/forms/goalForm';

export default function AddSomethingNew() {
  return (
    <>
      <div className="page-container">
        <h1>Add a Goal</h1>
        <div>
          <GoalForm />
        </div>
      </div>
    </>
  );
}
