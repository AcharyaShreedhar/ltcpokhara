import React from "react";
import PropTypes from "prop-types";
import uniqid from "uniqid";
import "./CheckBox.scss";

const CheckBox = (props) => (
  <div className={`ds-checkbox ${props.className}`}>
    <div className={`checkmark ${props.size}`}>
      <input type="checkbox" id={props.id || new uniqid()} {...props} />
      <label className="check-box" htmlFor={props.id} />
    </div>
    {props.title && (
      <span className="truncate text-vcenter ml-2">{props.title}</span>
    )}
  </div>
);

CheckBox.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOf(["tiny", "small", "regular", "large"]),
  onChange: PropTypes.func,
};

CheckBox.defaultProps = {
  title: "",
  className: "",
  id: "dscheckbox",
  size: "small",
  onChange: () => {},
};

export default CheckBox;
