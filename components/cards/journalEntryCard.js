import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function JournalEntryCard({ entryObj }) {
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
          <Button className="btn-orange" variant="dark">Delete</Button>
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
};
