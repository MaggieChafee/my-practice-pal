import React from 'react';
import { Button, Form } from 'react-bootstrap';

function NoteForm() {
  return (
    <>
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Notepad Date - Date Picker to be added</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Mark this Notepad as Closed" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Jot Sheet</Form.Label>
            <Form.Control as="textarea" rows={7} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default NoteForm;
