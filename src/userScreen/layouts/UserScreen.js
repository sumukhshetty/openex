import React, { Component } from 'react';
import UserScreenContainer from './../ui/UserScreenContainer';

export default class UserScreen extends Component {
  render () {
    return (
      <div>
        <div>
          <UserScreenContainer userScreenUid={this.props.params.userUid}/>
        </div>
      </div>
    );
  }
}
