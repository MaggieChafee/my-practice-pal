import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteEntry } from '../../api/journalEntryData';

export default function JournalEntryCard({ entryObj, onUpdate }) {
  const deleteThisJournalEntry = () => {
    if (window.confirm(`Do you want to delete your note from ${entryObj.date}?`)) {
      deleteEntry(entryObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="not-completed">
      <Card.Header as="h5" style={{ fontWeight: 'bolder' }}>  Date: {entryObj.date}</Card.Header>
      <Card.Body>
        <Card.Title>{entryObj.category}</Card.Title>
        <Card.Text>
          {entryObj.jotSheet}
        </Card.Text>
        <div>
          <Link href={`/journalEntry/edit/${entryObj.firebaseKey}`} passHref>
            <Button className="btn-orange" variant="dark">Edit</Button>
          </Link>
          <Button className="btn-orange" variant="dark" onClick={deleteThisJournalEntry}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

JournalEntryCard.propTypes = {
  entryObj: PropTypes.shape({
    date: PropTypes.string,
    jotSheet: PropTypes.string,
    firebaseKey: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
