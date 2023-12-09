/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { viewNoteDetails } from '../../../api/mergedData';

function ViewNotePadDetails() {
  const [noteDetails, setNoteDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const getNoteDeats = () => {
    viewNoteDetails(firebaseKey).then(setNoteDetails);
  };

  const checkmark = <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: '#ed6335' }} />;

  useEffect(() => {
    getNoteDeats();
  }, []);

  return (
    <div className="page-container">
      <div>
        <div className="details-head">
          <h1>
            {noteDetails?.date} {noteDetails?.noteClosed ? checkmark : ''}
          </h1>
          <Link href={`/journal/edit/${noteDetails.firebaseKey}`} passHref>
            <Button className="btn-orange" variant="dark">Edit</Button>
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
