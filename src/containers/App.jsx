import React, { Component } from 'react';
import Heading from 'components/Heading';
import Input from 'components/Input';

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <section>
        <Heading value="Test React Page" />
        <Input />
      </section>
    );
  }
}
