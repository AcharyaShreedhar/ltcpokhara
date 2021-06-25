import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { equals, isEmpty } from "ramda";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faTimesCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Input.scss";

class Input extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      value: props.value,
    };
    this.hanldeFocus = this.hanldeFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!equals(nextProps.value, prevState.value)) {
      return { value: nextProps.value };
    }
    return {};
  }

  handleBlur(e) {
    this.props.onBlur(e);
    setTimeout(() => {
      this.setState({ focused: false });
    }, 100);
  }

  handleChange(e) {
    this.setState({ value: e });
    this.props.onChange(e);
  }

  handleClear() {
    this.setState({ value: "" });
    this.props.onChange("");
  }

  hanldeFocus() {
    this.setState({ focused: true });
    this.props.onFocus();
  }

  handleKeyPress(e) {
    if (equals(13, e.charCode)) {
      this.props.onEnter();
    }
  }

  render() {
    const {
      className,
      direction,
      title,
      type,
      as,
      rows,
      disabled,
      remove,
      error,
      placeholder,
      tooltip,
    } = this.props;
    const { focused, value } = this.state;
    const classname = classNames(
      "core-input",
      className,
      direction,
      { focused },
      { remove },
      { error: !isEmpty(error) }
    );

    return (
      <div className={classname}>
        {!isEmpty(title) && <span className="core-input-label">{title}</span>}
        <div className="core-input-content">
          <Form.Control
            disabled={disabled}
            placeholder={placeholder}
            value={value || ""}
            type={type}
            as={as}
            disabled={disabled}
            rows={rows}
            title={tooltip ? value : ""}
            onBlur={(e) => this.handleBlur(e.target.value)}
            onChange={(e) => this.handleChange(e.target.value)}
            onFocus={this.hanldeFocus}
            onKeyPress={this.handleKeyPress}
          />
          {!disabled && (
            <>
              <div className="clear" onClick={this.handleClear}>
                <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                {/* <Icon name="fas fa-times-circle cursor-pointer" color="#969faa" size={16} /> */}
              </div>
              {remove && (
                <div className="delete">
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                  {/* <Icon name="fal fa-trash-alt" color="#969faa" size={12} /> */}
                </div>
              )}
              {!isEmpty(error) && (
                <span className="error dsl-r12">{error}</span>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  remove: PropTypes.bool,
  tooltip: PropTypes.bool,
  type: PropTypes.string,
  as: PropTypes.oneOf(["input", "textarea"]),
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  error: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  onFocus: PropTypes.func,
};

Input.defaultProps = {
  className: "",
  title: "",
  value: "",
  disabled: false,
  remove: false,
  tooltip: false,
  type: "text",
  as: "input",
  rows: "1",
  placeholder: "",
  direction: "horizontal",
  error: "",
  onBlur: () => {},
  onChange: () => {},
  onEnter: () => {},
  onFocus: () => {},
};

export default Input;
