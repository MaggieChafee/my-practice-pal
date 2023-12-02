import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteSingleNote } from '../../api/notepadData';

function NoteCard({ noteObj, onUpdate }) {
  const deleteThisNote = () => {
    if (window.confirm(`Do you want to delete Notepad from ${noteObj.date}?`)) {
      deleteSingleNote(noteObj.firebaseKey).then(() => onUpdate());
    }
  };

  const condition = noteObj.noteClosed;
  const noteResult = condition ? 'closed' : 'open';

  return (
    <Card className={noteResult} style={{ width: '18rem' }}>
      <Card.Body>
        <div className="card-head">
          <Card.Text>{noteObj.noteClosed && <span>CHECK MARK<br /></span>}</Card.Text>
          <Card.Title>Notepad Date: {noteObj.date}</Card.Title>
        </div>
        <div style={{ height: '25px' }} />
        <Link href={`/notepad/details/${noteObj.firebaseKey}`} passHref>
          <Button variant="primary">View</Button>
        </Link>
        <Link href={`/notepad/edit/${noteObj.firebaseKey}`} passHref>
          <Button variant="primary">Edit</Button>
        </Link>
        <Button variant="primary" onClick={deleteThisNote}>Delete</Button>
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
