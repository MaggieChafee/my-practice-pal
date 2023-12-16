import React, { useEffect, useState } from 'react';
import {
  Button, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createGoal, updateGoal } from '../../api/goalData';

const initialState = {
  frequency: '',
  goalCompleted: false,
  how: '',
  what: '',
};

function GoalForm({ goalObj }) {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [formInput, setFormInput] = useState({ ...initialState, journalId: firebaseKey });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (goalObj.firebaseKey) {
      updateGoal(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput };
      createGoal(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateGoal(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  useEffect(() => {
    if (goalObj.firebaseKey) setFormInput(goalObj);
  }, [goalObj]);

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>How often do you want to practice?</Form.Label>
            <Form.Control as="textarea" rows={7} name="frequency" value={formInput.frequency} onChange={handleChange} />
          </Form.Group>
          <div style={{ height: '15px' }} />
          <Form.Group>
            <Form.Label>What do you want to practice?</Form.Label>
            <Form.Text style={{ fontStyle: 'italic', color: 'white', opacity: '70%' }}> ex. a certain section of the piece, overall tone, phrasing, etc.</Form.Text>
            <Form.Control as="textarea" rows={7} name="what" value={formInput.what} onChange={handleChange} />
          </Form.Group>
          <div style={{ height: '15px' }} />
          <Form.Group>
            <Form.Label>How will you practice this?</Form.Label>
            <Form.Text style={{ fontStyle: 'italic', color: 'white', opacity: '70%' }}> Be specific so you can reach your goal!</Form.Text>
            <Form.Control as="textarea" rows={7} name="how" value={formInput.how} onChange={handleChange} />
          </Form.Group>
          <div style={{ height: '15px' }} />
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="I've achieved this goal!"
              name="goalCompleted"
              checked={formInput.goalCompleted}
              onChange={(e) => {
                setFormInput((prevState) => ({
                  ...prevState,
                  goalCompleted: e.target.checked,
                }));
              }}
            />
          </Form.Group>
          <div style={{ height: '30px' }} />
          <Button className="btn-orange" variant="dark" type="submit">
            {goalObj.firebaseKey ? 'Update' : 'Create'} Goal
          </Button>
        </Form>
      </div>
    </>
  );
}

GoalForm.propTypes = {
  goalObj: PropTypes.shape({
    frequency: PropTypes.string,
    how: PropTypes.string,
    what: PropTypes.string,
    goalCompleted: PropTypes.bool,
    firebaseKey: PropTypes.string,
    journalId: PropTypes.string,
  }),
};

GoalForm.defaultProps = {
  goalObj: initialState,
};

export default GoalForm;
