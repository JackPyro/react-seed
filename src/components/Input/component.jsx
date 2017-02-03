import React, { Component } from 'react';

import styles from './styles.css';

export default class Input extends Component {
  constructor() {
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <input className={styles.control} placeholder="Introduce yourself!" value={this.state.value} onChange={this.onChange} /><br />
        <div className={styles.hello}>Hello, {this.state.value || `World`}!</div>
      </div>
    );
  }
}
