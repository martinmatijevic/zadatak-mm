import React from "react";
import "./login.css";
import { Button, Form, FormGroup, Col, Input } from "reactstrap";

let buttonGreen = false;

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
    event.target.value ? (buttonGreen = true) : (buttonGreen = false);
  }

  handleSubmit(event) {
    if (this.state.username) this.props.parentCallback(this.state.username);
    event.preventDefault();
    buttonGreen = false;
  }

  render() {
    return (
      <Form className="loginForm" onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Col>
            <Input autoFocus type="username" id="usernameID" placeholder="Username" value={this.state.value} onChange={this.handleChange} />
            {!buttonGreen ? <Button>Prijava</Button> : <Button color="success">Prijava</Button>}
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
