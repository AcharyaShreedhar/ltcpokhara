import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { equals, isEmpty } from "ramda";
import { convertUrl } from "../../services/util";
import "./Avatar.scss";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: convertUrl(props.url, "/images/default.png") };
    this.handleDrop = this.handleDrop.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.upload) {
      return { url: convertUrl(nextProps.url, "/images/default.png") };
    }
    return prevState;
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.state.url);
  }

  handleDrop(e) {
    this.props.onDrop(e[0]);
    this.setState({ url: URL.createObjectURL(e[0]) });
  }

  handleClick(e) {
    this.props.onToggle(e);
  }

  renderAvatar() {
    const { url } = this.state;
    const { className, size, borderColor, borderWidth } = this.props;
    let _size = 35;

    if (equals("tiny", size)) {
      _size = 26;
    } else if (equals("small", size)) {
      _size = 35;
    } else if (equals("regular", size)) {
      _size = 70;
    } else if (equals("medium", size)) {
      _size = 83;
    } else if (equals("large", size)) {
      _size = 105;
    } else {
      _size = 125;
    }

    return (
      <div
        className={`avatar-image ${className}`}
        style={{
          width: _size,
          height: _size,
          minWidth: _size,
          minHeight: _size,
          borderRadius: _size * 0.5,
          borderColor,
          borderWidth,
          borderStyle: "solid",
          overflow: "hidden",
        }}
      >
        <Image src={url} width="100%" height="100%" />
      </div>
    );
  }

  render() {
    const { upload, name } = this.props;

    if (upload) {
      return (
        <Dropzone
          className="drag-drop"
          activeClassName="drag-drop active"
          acceptClassName="drag-drop active"
          rejectClassName="drag-drop deactivate"
          onDrop={this.handleDrop}
          accept="image/*"
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className="ds-avatar" {...getRootProps()}>
                <input {...getInputProps()} />
                {this.renderAvatar()}
              </div>
            </section>
          )}
        </Dropzone>
      );
    }

    return (
      <div className="item-name">
        {this.renderAvatar()}
        {!isEmpty(name) && (
          <div className="item-name-modal">
            <div className="dsl-b12 text-400" onClick={this.handleClick}>
              {name}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Avatar.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf([
    "tiny",
    "small",
    "regular",
    "medium",
    "large",
    "extraLarge",
  ]),
  upload: PropTypes.bool,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  onDrop: PropTypes.func,
  onToggle: PropTypes.func,
};

Avatar.defaultProps = {
  className: "",
  url: "/images/default.png",
  name: "",
  size: "small",
  upload: false,
  borderColor: "transparent",
  borderWidth: 0,
  onDrop: () => {},
  onToggle: () => {},
};

export default Avatar;
