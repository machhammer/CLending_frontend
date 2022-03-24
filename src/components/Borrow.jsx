import { Form, Button, Card } from "react-bootstrap";

export const Borrow = () => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Borrow</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Amount</Card.Subtitle>
          <Card.Text as="div">
            <Form>
              <Form.Group className="mb-3" controlId="amount_to_deposit">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" name="borrow" />
              </Form.Group>

              <Button variant="outline-primary">Stake</Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
