import React from "react";
import "./login.css";
import { Button } from "reactstrap";

export class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    this.props.parentCallback("");
  }

  render() {
    return (
      <>
        {this.props.username && (
          <>
            <h4>Pozdrav, {this.props.username.length > 15 ? this.props.username.substring(0, 15) + "...!" : this.props.username + "!"}</h4>
            <Button color="danger" size="sm" onClick={this.handleLogoutClick}>
              Odjava
            </Button>
          </>
        )}
      </>
    );
  }
}
