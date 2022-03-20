import { useStoreState } from 'easy-peasy';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import BlockchainService from '../../services/blockchainService';
import ProjectService from '../../services/projectService';

import classes from './CreateProject.module.scss';

const CreateProject = (props) => {
  const { account } = useStoreState((state) => state.walletStore);

  const submitHandler = async (e) => {
    e.preventDefault()

    const data = {}
    const elements = Object.getOwnPropertyNames(e.target.elements)
    elements.slice(elements.length / 2 + 1, elements.length).forEach((el) => {
      data[el] = e.target.elements[el].value
    })

    data.tags = data.tags.trim().split(' ')
    const res = await BlockchainService.createCampaign((new Date(data.endDate).getTime() / 1000).toFixed(), account.address)
    await ProjectService.create({ ...data, contractId: res })
  }

  return (
    <Form className={classes.Form} onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="tags">
        <Form.Label>Tags</Form.Label>
        <Form.Control type="text" placeholder="Tags" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="textarea" placeholder="Description" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="url">
        <Form.Label>Link</Form.Label>
        <Form.Control type="text" placeholder="Link to project" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="imageUrl">
        <Form.Label>Image link</Form.Label>
        <Form.Control type="text" placeholder="Link to project image" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="endDate">
        <Form.Label>End date</Form.Label>
        <Form.Control type="datetime-local" placeholder="End date" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default CreateProject;