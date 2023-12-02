/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { viewNoteDetails } from '../../../api/mergedData';

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
    <div className="page-container">
      <div>
        <div className="details-head">
          <h1>
            {noteDetails?.date} {noteDetails?.noteClosed ? 'CHECKMARK' : ''}
          </h1>
          <Link href={`/notepad/edit/${noteDetails.firebaseKey}`} passHref>
            <Button variant="primary">Edit</Button>
          </Link>
        </div>
        <hr />
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
