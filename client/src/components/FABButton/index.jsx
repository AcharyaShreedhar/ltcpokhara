import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { equals } from "ramda";
import { Submenu } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./FABButton.scss";

class FABButton extends Component {
  constructor(props) {
    super(props);

    this.state = { opened: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleClick() {
    this.setState({ opened: !this.state.opened });
  }

  handleMenuClick(item) {
    this.setState({ opened: !this.state.opened });

    // if (equals("notice", item.name)) {
    //   this.props.history.push(`/notices/AddNotice`);
    // } else if (equals("gallery", item.name)) {
    //   this.props.history.push(`/gallery/photogallery`);
    // } else if (equals("staff", item.name)) {
    //   this.props.history.push(`/about/staff`);
    // }
  }

  render() {
    const { opened } = this.state;
    const { fixed, role } = this.props;

    return (
      <div
        className="fab-button-contents"
        style={fixed ? { position: "fixed" } : { position: "absolute" }}
      >
        {opened && (
          <Submenu
            role={role}
            onClick={this.handleMenuClick}
            onClose={() => this.setState({ opened: false })}
          />
        )}
        <div className="contents">
          <div className="fab-button" onClick={this.handleClick}>
            <FontAwesomeIcon icon={opened ? faMinus : faPlus} />
          </div>
        </div>
      </div>
    );
  }
}

FABButton.defaultProps = {
  fixed: true,
};

export default FABButton;
