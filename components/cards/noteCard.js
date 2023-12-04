/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { deleteSingleNote } from '../../api/notepadData';

function NoteCard({ noteObj, onUpdate }) {
  const deleteThisNote = () => {
    if (window.confirm(`Do you want to delete Notepad from ${noteObj.date}?`)) {
      deleteSingleNote(noteObj.firebaseKey).then(() => onUpdate());
    }
  };
  const checkmark = <FontAwesomeIcon icon={faCheck} size="2xl" style={{ color: '#ed6335' }} />;
  const condition = noteObj.noteClosed;
  const noteResult = condition ? 'completed' : 'not-completed';

  return (
    <Card className={noteResult} style={{ width: '18rem' }}>
      <Card.Body>
        <div className="card-head">
          <Card.Text>{noteObj.noteClosed ? checkmark : ''}</Card.Text>
          <div>
            <h4>Notepad Date:</h4>
            <h5>{noteObj.date}</h5>
          </div>
        </div>
        <div style={{ height: '25px' }} />
        <div className="button-container">
          <Link href={`/notepad/details/${noteObj.firebaseKey}`} passHref>
            <Button className="btn-orange" variant="dark">View</Button>
          </Link>
          <Link href={`/notepad/edit/${noteObj.firebaseKey}`} passHref>
            <Button className="btn-orange" variant="dark">Edit</Button>
          </Link>
          <Button className="btn-orange" variant="dark" onClick={deleteThisNote}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

NoteCard.propTypes = {
  noteObj: PropTypes.shape({
    noteClosed: PropTypes.bool,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default NoteCard;
