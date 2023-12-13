import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleGoal } from '../../../api/goalData';
import GoalForm from '../../../components/forms/goalForm';

function EditGoal() {
  const [editGoal, setEditGoal] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleGoal(firebaseKey).then(setEditGoal);
  }, [firebaseKey]);

  return (
    <>
      <div className="page-container">
        <h1>Update Goal</h1>
        <GoalForm goalObj={editGoal} />
      </div>
    </>
  );
}

export default EditGoal;
