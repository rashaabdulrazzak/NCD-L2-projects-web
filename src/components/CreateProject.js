// src/components/CreateTodo.js
import { useState } from "react";
import { Alert,Form,Button } from 'react-bootstrap';
const CreateProject = ({ contract }) => {
  
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [funds, setFunds] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // invoke the smart contract's create method
    const project = await contract.create({ address, name,funds ,description})    
    setAddress("");
    setName("");
    setFunds("");
    setDescription("");
    setLoading(false);    
    console.log('project', project);
  };
  return (
    <>
    <h5 className="py-2 mt-5 mb-3" > Submit a project to get funds</h5>
    <Form onSubmit={handleSubmit} className="mt-5 pt-5">
      <Form.Control
        type="text"
        placeholder="Type Your Adress:'test.testnet'"
        required
        value={address}
        onChange={({ target }) => setAddress(target.value)}
      />
      <br/>
      <Form.Control
        type="text"
        placeholder="Type your project name"
        required
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <br/>
      <Form.Control
        type="text"
        placeholder="Type the needed funds"
        required
        value={funds}
        onChange={({ target }) => setFunds(target.value)}
      />
      <br/>
      <Form.Control
        type="text"
        placeholder="Type a short description about your project"
        required
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
       <br/>
      <Button variant="outline-info" disabled={loading} type="submit">Create Project</Button>
    </Form>
   </>
  );
}

export default CreateProject;