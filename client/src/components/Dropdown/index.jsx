/**
 * Author: Shreedhar Acharya
 * Updated at 6/1/2021
 *
 */

import React from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";
import classNames from "classnames";
import {
  any,
  append,
  equals,
  filter,
  find,
  includes,
  isEmpty,
  isNil,
  split,
} from "ramda";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Animations, Avatar, CheckBox, Icon } from "../../components";
import { SPECIALOPTIONS } from "../../services/config";
import "./Dropdown.scss";

class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      opened: false,
      title: "",
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSpecial = this.handleSpecial.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.handleDefaultValues = this.handleDefaultValues.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { caret, data, placeholder, getId, getValue } = nextProps;

    let title = "";

    if (equals(data.length, 0)) return { title: "No options" };
    if (equals(caret, "dots-without-title")) return { title };

    const { selected } = prevState;
    if (equals(selected.length, 0)) {
      return { title: placeholder };
    } else {
      selected.forEach((sel, idx) => {
        const item = find((d) => equals(getId(d), sel), data);
        if (!isNil(item)) {
          title =
            title +
            getValue(item) +
            (equals(selected.length, idx + 1) ? "" : ", ");
        }
      });
      return { title };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { defaultIds, defaultIndexes } = prevProps;
    if (
      !equals(defaultIds, this.props.defaultIds) ||
      !equals(defaultIndexes, this.props.defaultIndexes)
    ) {
      this.handleDefaultValues();
    }
  }

  componentDidMount() {
    this.handleDefaultValues();
  }

  handleDefaultValues() {
    const {
      data,
      defaultIds,
      defaultIndexes,
      mountEvent,
      returnBy,
    } = this.props;

    if (equals(0, data.length)) return;

    let items = [];
    if (!isNil(defaultIds)) {
      defaultIds.forEach((id) => {
        items.push(find((d) => equals(this.props.getId(d), id), data));
      });
    }
    if (!isNil(defaultIds) && equals(0, items.length)) items = [data[0]];
    if (!isNil(defaultIndexes)) {
      defaultIndexes.forEach((idx) => {
        items.push(data[idx]);
      });
    }
    items = filter((item) => !isNil(item), items);

    let selected = [];
    if (!isNil(items)) {
      selected = items.map((item) => this.props.getId(item));
      this.setState({ selected });
    }

    if (equals(0, selected.length)) return;

    if (mountEvent) {
      if (equals(returnBy, "id")) {
        this.props.onChange(selected);
      } else {
        this.props.onChange(items);
      }
    }
  }

  handleSpecial(ID) {
    const { data, returnBy } = this.props;
    if (equals(SPECIALOPTIONS.ALL, ID)) {
      // User select All option
      const newData = filter((d) => equals(this.props.getId(d), ID), data);
      const newSelected = newData.map((item) => this.props.getId(item));
      if (equals("id", returnBy)) {
        this.props.onChange(newSelected);
      } else {
        this.props.onChange(newData);
      }
      this.setState({ selected: [SPECIALOPTIONS.ALL] });
    } else if (equals(SPECIALOPTIONS.LIST, ID)) {
      // User select List option
      const newData = filter((d) => equals(this.props.getId(d), ID), data);
      const newSelected = newData.map((item) => this.props.getId(item));
      if (equals("id", returnBy)) {
        this.props.onChange(newSelected);
      } else {
        this.props.onChange(newData);
      }
      this.setState({ selected: [SPECIALOPTIONS.LIST] });
    } else if (equals(SPECIALOPTIONS.NONE, ID)) {
      // User select None option
      this.props.onChange([]);
      this.setState({ selected: [SPECIALOPTIONS.NONE] });
    }
    this.handleClose();
  }

  handleClose() {
    this.setState({ opened: false });
  }

  handleToggle() {
    if (equals(this.props.data.length, 0) || this.props.disabled) return;
    this.setState({ opened: !this.state.opened });
  }

  handleChange(data, checked) {
    const { multi, returnBy, disabledOptions } = this.props;
    const { selected } = this.state;
    const ID = this.props.getId(data);

    if (includes(ID, disabledOptions)) return;

    if (ID < 0 && !equals(SPECIALOPTIONS.SELFASSIGNED, ID)) {
      this.handleSpecial(ID);
      return;
    }

    let newSelected, newData;

    if (multi) {
      if (selected[0] < 0) {
        newSelected = [ID];
        newData = filter(
          (item) =>
            any((sl) => equals(sl, this.props.getId(item)))(newSelected),
          this.props.data
        );
      } else {
        if (includes(ID, selected)) {
          newSelected = filter((x) => x != ID, selected);
        } else {
          newSelected = append(ID, selected);
        }
        newData = filter(
          (item) =>
            any((sl) => equals(sl, this.props.getId(item)))(newSelected),
          this.props.data
        );
        newSelected = filter((item) => !isNil(item), newSelected);
        newData = filter((item) => !isNil(item), newData);
      }
    } else {
      newSelected = [ID];
      newData = filter(
        (item) => any((sl) => equals(sl, this.props.getId(item)))(newSelected),
        this.props.data
      );
      newSelected = filter((item) => !isNil(item), newSelected);
      newData = filter((item) => !isNil(item), newData);

      this.handleClose();
    }

    if (equals("id", returnBy)) {
      this.props.onChange(newSelected);
    } else {
      this.props.onChange(newData);
    }

    this.setState({ selected: newSelected });
  }

  setSelected(e) {
    this.setState({ selected: e });
  }

  renderItem(data, idx) {
    const { type, selectable, splitted } = this.props;
    const { selected } = this.state;
    const active = includes(this.props.getId(data), selected) && selectable;
    const className = classNames("core-dropdown-item", { active });
    const VALUE = this.props.getValue(data);

    if (
      equals(null, this.props.getId(data)) &&
      equals("BLOCK", this.props.getValue(data))
    ) {
      if (splitted) {
        return <div key="block" className="split-line" />;
      }
      return;
    }

    return (
      <div
        key={`cd${idx}`}
        className={className}
        onClick={() => this.handleChange(data, true)}
      >
        {equals(type, "thumbnail") && <Avatar className="mr-2" size="tiny" />}
        <span className="dsl-b14 no-wrap">{VALUE}</span>
        <span className="d-flex-1" />
        {equals(type, "checkbox") && (
          <CheckBox
            className="ml-2"
            size="tiny"
            id={data.id}
            checked={active}
            onChange={(e) => this.handleChange(data, e.target.checked)}
          />
        )}
      </div>
    );
  }

  render() {
    const {
      className,
      data,
      title,
      align,
      width,
      height,
      multi,
      direction,
      titleDirection,
      caret,
      iconColor,
      iconSize,
      selectable,
      disabled,
      placeholder,
      footer,
    } = this.props;
    const { opened } = this.state;
    const container = classNames("core-dropdown", className);
    const toggle = classNames("core-dropdown-toggle", direction);
    const menu = classNames("core-dropdown-menu", align);
    const maxHeight = equals("auto", height)
      ? null
      : { maxHeight: height, overflowY: "scroll" };

    return (
      <OutsideClickHandler display="flex" onOutsideClick={this.handleClose}>
        <div className={container} style={{ width }}>
          <div className={toggle} onClick={this.handleToggle}>
            {!isEmpty(title) && selectable && (
              <div
                className={`core-dropdown-title dsl-b18 ${
                  equals(direction, "vertical") ? "mb-2" : "mr-2"
                }`}
              >
                {title}
              </div>
            )}
            {!isEmpty(this.state.title) && selectable && (
              <div className="core-dropdown-label">
                {equals("horizontal", titleDirection) ? (
                  <span
                    className={classNames("dsl-b16 mr-4", {
                      "ml-2": equals("vertical", direction),
                      "no-wrap": !multi,
                    })}
                  >
                    {this.state.title}
                  </span>
                ) : (
                  split(", ", this.state.title).map((item, idx) => (
                    <p
                      className={classNames("dsl-b16 mb-0 mr-4", {
                        "ml-2": equals("vertical", direction),
                        "no-wrap": !multi,
                      })}
                      key={`${title}${idx}`}
                    >
                      {item}
                    </p>
                  ))
                )}
                {equals(caret, "down") && (
                  <FontAwesomeIcon icon={faCaretDown} className="mr-2" />
                )}
                {equals(caret, "dots-with-title") && (
                  <FontAwesomeIcon icon={faEllipsisH} className="mr-2" />
                )}
              </div>
            )}
            {isEmpty(this.state.title) &&
              equals(caret, "dots-without-title") && (
                <FontAwesomeIcon icon={faEllipsisH} className="mr-2" />
              )}
            {!selectable && !isEmpty(placeholder) && (
              <div className="core-dropdown-title">{placeholder}</div>
            )}
          </div>
          <Animations.Popup
            className={menu}
            enter={10}
            exit={0}
            opened={opened}
            style={maxHeight}
          >
            <React.Fragment>
              {data.map((item, idx) => this.renderItem(item, idx))}
              {footer}
            </React.Fragment>
          </Animations.Popup>
        </div>
      </OutsideClickHandler>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any),
  type: PropTypes.oneOf(["default", "checkbox", "thumbnail"]),
  title: PropTypes.string,
  placeholder: PropTypes.string,
  multi: PropTypes.bool,
  selectable: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledOptions: PropTypes.array,
  align: PropTypes.oneOf(["left", "right"]),
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  titleDirection: PropTypes.oneOf(["horizontal", "vertical"]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultIndexes: PropTypes.array,
  defaultIds: PropTypes.array,
  splitted: PropTypes.bool,
  caret: PropTypes.oneOf([
    "none",
    "down",
    "dots-with-title",
    "dots-without-title",
  ]),
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  returnBy: PropTypes.oneOf(["id", "data"]),
  mountEvent: PropTypes.bool,
  footer: PropTypes.node,
  getId: PropTypes.func,
  getValue: PropTypes.func,
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  className: "",
  data: [],
  type: "default",
  title: "",
  placeholder: "Select",
  multi: false,
  selectable: true,
  disabled: false,
  disabledOptions: [],
  align: "left",
  direction: "horizontal",
  titleDirection: "horizontal",
  width: "auto",
  height: "auto",
  defaultIndexes: null,
  defaultIds: null,
  splitted: false,
  caret: "down",
  iconColor: "#343f4b",
  iconSize: 10,
  returnBy: "id",
  mountEvent: false,
  footer: null,
  getId: (data) => data["id"],
  getValue: (data) => data["value"],
  onChange: () => {},
};

export default Dropdown;
