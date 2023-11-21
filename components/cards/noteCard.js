import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

function NoteCard({ noteObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Text>{noteObj.noteClosed && <span>CHECK MARK<br /></span>}</Card.Text>
        <Card.Title>Notepad Date: {noteObj.date}</Card.Title>
        <Link href={`/music/${noteObj.firebaseKey}`} passHref>
          <Button variant="primary">Details</Button>
        </Link>
        <Link href={`/notepad/edit/${noteObj.firebaseKey}`} passHref>
          <Button variant="primary">Edit</Button>
        </Link>
        <Button variant="primary">Delete</Button>
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
};

export default NoteCard;
