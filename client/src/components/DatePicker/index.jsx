/**
 * Created by Shreedhar Acharya
 * 06/06/2021
 *
 */

import React from "react";
import PropTypes from "prop-types";
import DateRangePicker from "react-daterange-picker";
import OutsideClickHandler from "react-outside-click-handler";
import { equals, isNil } from "ramda";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import { Input, Icon } from "../../components";
import "./DatePicker.scss";

const moment = extendMoment(originalMoment);
const MAXDATE = new Date("2022/12/31");
const MINDATE = new Date("2010/1/1");

const ICONS = {
  caret: "fas fa-sort-down",
  calendar: "fal fa-calendar-alt",
};

class DatePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const today = moment();
    let value = props.value;
    if (isNil(value)) {
      if (equals(props.calendar, "day")) value = new Date();
      else
        value = moment.range(today.clone().subtract(7, "days"), today.clone());
    }
    this.state = { value, open: false };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    if (this.props.mountEvent) {
      this.props.onSelect(this.state.value);
    }
  }

  _getText() {
    const { format, calendar } = this.props;
    const { value } = this.props;
    if (isNil(value)) return null;
    if (equals(calendar, "day")) return moment(value).format(format);
    return `${moment(value.start).format(format)} - ${moment(value.end).format(
      format
    )}`;
  }

  handleSelect(value) {
    this.setState({ value });
    this.props.onSelect(value);
    if (this.props.closeAfterSelect) {
      this.setState({ open: false });
    }
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const {
      className,
      calendar,
      direction,
      as,
      title,
      placeholder,
      disabled,
      months,
      minDate,
      maxDate,
      fontColor,
      iconColor,
      prepend,
      prependSize,
      append,
      appendSize,
      align,
      disabledDate,
    } = this.props;
    const { open, value } = this.state;

    const monthPickerTrigger = (
      <div className="d-flex cursor-pointer">
        <p className="dsl-b14 text-400 mb-0 mr-2">
          {moment(value).format("MMM YYYY")}
        </p>
        <Icon name="fas fa-chevron-down" color={iconColor} size={appendSize} />
      </div>
    );

    const showLabel = !equals(as, "input") && !isNil(title);

    return (
      <OutsideClickHandler
        onOutsideClick={() => this.setState({ open: false })}
      >
        <div className={`ds-datepicker ${className}`}>
          {!equals(calendar, "month") && (
            <div className={`ds-datepicker-input ${direction}`}>
              {showLabel && (
                <div
                  className={`dsl-m12 ${
                    equals(direction, "horizontal") ? "mt-1" : "mb-2"
                  }`}
                  style={{ color: fontColor }}
                  onClick={this.handleToggle}
                >
                  {title}
                </div>
              )}

              <div className="d-flex">
                {!equals(prepend, "none") && (
                  <Icon
                    name={`${ICONS[prepend]} text-vcenter mr-1 cursor-pointer`}
                    color={iconColor}
                    size={prependSize}
                    onClick={this.handleToggle}
                  />
                )}

                {equals(as, "input") && (
                  <Input
                    title={title}
                    direction={direction}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={this._getText()}
                    onFocus={this.handleToggle}
                  />
                )}

                {equals(as, "span") && (
                  <span
                    className={`dsl-b14 text-400 cursor-pointer${
                      showLabel ? " ml-2" : ""
                    }`}
                    onClick={this.handleToggle}
                  >
                    {this._getText()}
                  </span>
                )}

                {!equals(append, "none") && (
                  <Icon
                    name={`${ICONS[append]} ml-2 cursor-pointer`}
                    color={iconColor}
                    size={appendSize}
                    onClick={this.handleToggle}
                  />
                )}
              </div>
            </div>
          )}

          {open && !disabled && (
            <div className={`ds-datepicker-content ${align}`}>
              {equals(calendar, "day") && (
                <DateRangePicker
                  selectionType="single"
                  initialDate={moment(value).toDate()}
                  value={value}
                  minimumDate={minDate}
                  maximumDate={maxDate}
                  onSelect={this.handleSelect}
                />
              )}
              {equals(calendar, "range") && (
                <DateRangePicker
                  singleDateRange
                  selectionType="range"
                  initialRange={value}
                  value={value}
                  minimumDate={minDate}
                  maximumDate={maxDate}
                  onSelect={this.handleSelect}
                />
              )}
            </div>
          )}
        </div>
      </OutsideClickHandler>
    );
  }
}

DatePicker.propTypes = {
  className: PropTypes.string,
  calendar: PropTypes.oneOf(["day", "range", "month"]),
  as: PropTypes.oneOf(["none", "input", "span", "button"]),
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  title: PropTypes.string,
  format: PropTypes.string,
  placeholder: PropTypes.string,
  align: PropTypes.oneOf(["left", "right"]),
  mountEvent: PropTypes.bool,

  months: PropTypes.number,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  fontColor: PropTypes.string,
  iconColor: PropTypes.string,
  prepend: PropTypes.oneOf(["none", "caret", "calendar"]),
  prependSize: PropTypes.number,
  append: PropTypes.oneOf(["none", "caret", "calendar"]),
  appendSize: PropTypes.number,
  closeAfterSelect: PropTypes.bool,
  disabledDate: PropTypes.func,
  onSelect: PropTypes.func,
};

DatePicker.defaultProps = {
  className: "",
  calendar: "day",
  as: "none",
  direction: "horizontal",
  title: null,
  format: "M/D/YY",
  placeholder: null,
  mountEvent: false,
  months: 1,
  value: null,
  disabled: false,
  minDate: MINDATE,
  maxDate: MAXDATE,
  fontColor: "#676767",
  iconColor: "#343f4b",
  prepend: "none",
  prependSize: 10,
  append: "none",
  appendSize: 10,
  align: "left",
  closeAfterSelect: false,
  disabledDate: () => null,
  onSelect: () => {},
};

export default DatePicker;
