import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function CreateVote({ contract }) {
  const [uri, setUri] = useState("");
  const [options, setOptions] = useState(2);
  const [endDate, setEndDate] = useState("");

  const createVote = async () => {
    if (!contract) {
      alert("Please connect to Metamask");
      return;
    }

    await contract
      .createVote(uri, new Date(endDate).getTime(), options)
      .then(() => alert("Success"))
      .catch((err) => alert(err.message));
  };

  return (
    <Form className="m-2">
      <h2 className="d-flex justify-content-center">Create Vote</h2>
      <Form.Group className="m-2">
        <Form.Label htmlFor="uri">IPFS URI</Form.Label>
        <Form.Control
          type="text"
          name="uri"
          placeholder="Enter IPFS URI"
          value={uri}
          onChange={(e) => setUri(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="m-2">
        <Form.Label htmlFor="options">Number of Options</Form.Label>
        <Form.Control
          type="number"
          min={2}
          max={8}
          name="options"
          placeholder="Options"
          value={options}
          onChange={(e) => setOptions(Number(e.target.value))}
        />
      </Form.Group>{" "}
      <Form.Group className="m-2">
        <Form.Label htmlFor="endDate">End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Form.Group>{" "}
      <Form.Group className="m-2 mt-4">
        <Button variant="success" onClick={createVote}>
          Create
        </Button>
      </Form.Group>
    </Form>
  );
}
