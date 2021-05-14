import React from "react";
import "./app.css";
import { Logout } from "../login/logout.js";
import { RecipeList } from "../recipes/recipes.js";
import logo from "../../../assets/images/logo.jpg";
import { Login } from "../login/login.js";
import { Container, Row, Col } from "reactstrap";

class Logo extends React.Component {
  render() {
    return <img src={logo} alt="logo" />;
  }
}

class Title extends React.Component {
  render() {
    return <h1>KUHARICA</h1>;
  }
}

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleCallback = this.handleCallback.bind(this);
    this.state = { isLoggedIn: false };
    this.state = { username: "" };
  }

  handleCallback = (value) => {
    this.setState({ username: value });
    let val = this.state.isLoggedIn ? false : true;
    this.setState({ isLoggedIn: val });
  };

  render() {
    return (
      <Container className="main">
        <Row>
          <Col className="logo">
            <Logo />
          </Col>
          <Col className="title">
            <Title />
          </Col>
          <Col className="logout">
            <Logout username={this.state.username} parentCallback={this.handleCallback} />
          </Col>
        </Row>
        <br></br>
        <Row className="content">
          <Col>
            {this.state.isLoggedIn && (
              <div className="recipes">
                <RecipeList />
              </div>
            )}
            {!this.state.isLoggedIn && (
              <div className="login">
                <Login parentCallback={this.handleCallback} />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
