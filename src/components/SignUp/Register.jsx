import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import UserService from '../../services/userService';

import classes from './Register.module.scss';

const Register = (props) => {
  const { account } = useStoreState((state) => state.walletStore);
  const { login } = useStoreActions((actions) => actions.walletStore);

  const submitHandler = async (e) => {
    e.preventDefault()

    const data = {}
    const elements = Object.getOwnPropertyNames(e.target.elements)
    elements.slice(elements.length / 2 + 1, elements.length).forEach((el) => {
      data[el] = e.target.elements[el].value
    })

    const info = await UserService.register({ address: account.address })

    await login(info.nonce)
    await UserService.setPersonalData({ ...data, ...account })
  }

  return (
    <Form className={classes.Form} onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First name</Form.Label>
        <Form.Control type="text" placeholder="First name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last name</Form.Label>
        <Form.Control type="text" placeholder="Last name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="bio">
        <Form.Label>Bio</Form.Label>
        <Form.Control type="textarea" placeholder="Bio" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="portfolioUrl">
        <Form.Label>Portfolio URL</Form.Label>
        <Form.Control type="text" placeholder="Portfolio hyperlink" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Register;