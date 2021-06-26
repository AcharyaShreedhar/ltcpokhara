import React, { Component } from "react";

export class Displaybox extends Component {
  render() {
    const { value } = this.props;
    return <div>{value}</div>;
  }
}

export default Displaybox;
