/**
 * Purpose: Edit dropdowns
 * Example Usage: <EditDropdown options={['Edit', 'Delete']} onChange={this.handleChange} />
 * Example Returns to onChange: 'edit', 'delete'
 * Author: Shreedhar Acharya
 * Updated at: 06/02/2021
 */

import React from "react";
import PropTypes from "prop-types";
import { toLower } from "ramda";
import { Dropdown } from "../../components";
import "./EditDropdown.scss";

function EditDropdown(props) {
  const { options, disabled, onChange } = props;
  const data = options.map((option, index) => ({ id: index, value: option }));

  return (
    <Dropdown
      className="edit-dropdown"
      id="dots-menu"
      caret="dots-without-title"
      disabledOptions={disabled}
      iconSize={16}
      iconColor="#969faa"
      data={data}
      align="right"
      returnBy="data"
      onChange={(e) => onChange(toLower(e[0].value))}
    />
  );
}

EditDropdown.propTypes = {
  options: PropTypes.array,
  disabled: PropTypes.array,
  onChange: PropTypes.func,
};

EditDropdown.defaultProps = {
  options: ["Assign", "Edit", "Delete"],
  disabled: [],
  onChange: () => {},
};

export default EditDropdown;
