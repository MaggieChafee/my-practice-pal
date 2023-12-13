/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Card, CardText } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { deleteGoal } from '../../api/goalData';

function GoalCard({ goalObj, onUpdate }) {
  const deleteThisGoal = () => {
    if (window.confirm('Do you want to delete this goal?')) {
      deleteGoal(goalObj.firebaseKey).then(() => onUpdate());
    }
  };

  const star = <FontAwesomeIcon icon={faStar} size="lg" style={{ color: '#f9dd76' }} />;
  const condition = goalObj.goalCompleted;
  const result = condition ? 'completed' : 'not-completed';
  const headResult = condition ? 'card-head-closed' : 'card-head-open';

  return (
    <Card className={result} style={{ width: '30rem' }}>
      <Card.Body>
        <div className={headResult}>
          <div>
            <h4>{goalObj.goalCompleted ? star : '' }</h4>
          </div>
          <div>
            <h4>Practice Goal:</h4>
          </div>
        </div>
        <hr />
        <div>
          <h6 style={{ fontWeight: 'bolder' }}>How Often I Want Practice:</h6>
          <CardText>{goalObj.frequency}</CardText>
        </div>
        <div style={{ height: '8px' }} />
        <div>
          <h6 style={{ fontWeight: 'bolder' }}>What I Want to Practice:</h6>
          <CardText>{goalObj.what}</CardText>
        </div>
        <div style={{ height: '8px' }} />
        <div>
          <h6 style={{ fontWeight: 'bolder' }}>How I Want Practice:</h6>
          <CardText>{goalObj.how}</CardText>
        </div>
        <div style={{ height: '25px' }} />
        <div className="button-container">
          <Link href={`/goal/edit/${goalObj.firebaseKey}`} passHref>
            <Button className="btn-orange" variant="dark">Edit</Button>
          </Link>
          <Button className="btn-orange" variant="dark" onClick={deleteThisGoal}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

GoalCard.propTypes = {
  goalObj: PropTypes.shape({
    frequency: PropTypes.string,
    goalCompleted: PropTypes.bool,
    how: PropTypes.string,
    what: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GoalCard;
