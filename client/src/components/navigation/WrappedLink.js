import React, { Component } from 'react';
import { Match } from '@reach/router'
import { AnchorButton } from '@blueprintjs/core';

class WrappedLink extends Component {
  render() {
    return (
      <Match path={`${this.props.to}/*`}>
        {props => 
          <AnchorButton href={this.props.to} text={this.props.text} icon={this.props.icon} minimal />
        }
      </Match>
    );
  }
}

export default WrappedLink;