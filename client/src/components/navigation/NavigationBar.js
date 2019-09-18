import React, { Component } from 'react';
import { Navbar, 
  Classes,
  Alignment } from '@blueprintjs/core';

class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar className={Classes.DARK}>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>{this.props.name}</Navbar.Heading>

            <Navbar.Divider />

            {this.props.children}
          </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;