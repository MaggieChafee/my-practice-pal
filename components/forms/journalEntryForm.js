import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createEntry, updateEntry } from '../../api/journalEntryData';

const initialState = {
  date: '',
  jotSheet: '',
  category: '',
};

function JournalEntryForm({ entryObj }) {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [entryFormInput, setEntryFormInput] = useState({ ...initialState, journalId: firebaseKey });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntryFormInput((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (entryObj.firebaseKey) {
      updateEntry(entryFormInput).then(() => router.push('/'));
    } else {
      const payload = { ...entryFormInput };
      createEntry(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateEntry(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  useEffect(() => {
    if (entryObj.firebaseKey) setEntryFormInput(entryObj);
  }, [entryObj]);

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <h5>Journal Entry Date</h5>
            <Form.Control type="date" name="date" value={entryFormInput.date} onChange={handleChange} />
          </Form.Group>
          <div style={{ height: '15px' }} />
          <Form.Group controlId="formBasicCheckbox">
            <Form.Select name="category" aria-label="Default select example">
              <option>Choose Category...</option>
              <option value="Lesson">Lesson</option>
              <option value="Practice">Practice</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </Form.Select>
          </Form.Group>
          <div style={{ height: '15px' }} />
          <Form.Group controlId="exampleForm.ControlTextarea1" name="noteClosed">
            <h5>Jot Sheet</h5>
            <Form.Control as="textarea" rows={7} name="jotSheet" value={entryFormInput.jotSheet} onChange={handleChange} />
          </Form.Group>
          <div style={{ height: '30px' }} />
          <Button className="btn-orange" variant="dark" type="submit">
            {entryObj.firebaseKey ? 'Update' : 'Create'} Note
          </Button>
        </Form>
      </div>
    </>
  );
}

JournalEntryForm.propTypes = {
  entryObj: PropTypes.shape({
    date: PropTypes.string,
    jotSheet: PropTypes.string,
    category: PropTypes.string,
    firebaseKey: PropTypes.string,
    journalId: PropTypes.string,
  }),
};

JournalEntryForm.defaultProps = {
  entryObj: initialState,
};

export default JournalEntryForm;
