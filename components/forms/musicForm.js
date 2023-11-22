import React from 'react';
import { Button, Form } from 'react-bootstrap';

function MusicForm() {
  return (
    <>
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name of Piece</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Composer</Form.Label>
            <Form.Control type="text" placeholder="Password" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select>
              <option>Select a Category</option>
              <option>Warm-Up</option>
              <option>Scale</option>
              <option>Etude</option>
              <option>Solo Repertoir</option>
              <option>Chamber Ensemble</option>
              <option>Large Ensemble</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Reference Recording</Form.Label>
            <Form.Control type="text" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Start Date - Change to Date Picker</Form.Label>
            <Form.Control type="text" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="I've completed this piece!" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default MusicForm;
