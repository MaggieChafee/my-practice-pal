/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewNoteDetails } from '../../api/mergedData';

function ViewNotePadDetails() {
  const [noteDetails, setNoteDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const getNoteDeats = () => {
    viewNoteDetails(firebaseKey).then(setNoteDetails);
  };
  useEffect(() => {
    getNoteDeats();
  }, []);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h1>
          {noteDetails?.date} {noteDetails?.noteClosed ? 'CHECKMARK' : ''}
        </h1>
        <h4>
          Jot Sheet:
        </h4>
        <p>
          {noteDetails?.jotSheet}
        </p>
      </div>
    </div>
  );
}

export default ViewNotePadDetails;
