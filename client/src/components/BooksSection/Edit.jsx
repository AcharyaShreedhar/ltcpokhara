import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { Button, Input } from "../../components";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.history.location.item.book_id,
      book_title: props.history.location.item.book_title,
      book_cat: props.history.location.item.book_cat,
      published_date: props.history.location.item.published_date,
      book_file: props.history.location.item.book_file,
      attachment: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleSubmit() {
    const {
      book_title,
      book_cat,
      published_date,
      book_file,
      attachment,
    } = this.state;
    const payload = {
      book: {
        data: {
          book_title: book_title,
          book_cat: book_cat,
          published_date: published_date,
          book_file: attachment.name || book_file,
        },
      },
    };

    this.props.onUpdate(payload, attachment);
  }

  handleDate(e) {
    this.setState({ published_date: e });
  }
  handleDrop(e) {
    this.setState({ attachment: e[0] });
  }

  render() {
    const { isBusy, title } = this.props;
    const {
      book_title,
      book_cat,
      published_date,
      book_file,
      attachment,
    } = this.state;
    return (
      <div className="admin card mt-5">
        <div className="sign-in">
          <div className="titlebar text-center justify-cat-center">{title}</div>
          <Input
            className="mb-4"
            title="शीर्षक "
            value={book_title}
            direction="vertical"
            onChange={(e) => this.setState({ book_title: e })}
          />
          <Input
            className="mb-4"
            title="बेहोरा"
            value={book_cat}
            direction="vertical"
            as="textarea"
            onChange={(e) => this.setState({ book_cat: e })}
          />

          <span className="dsl-b18">प्रकाशित मिति</span>
          <NepaliDatePicker
            inputClassName="form-control"
            className="mb-4"
            value={published_date}
            onChange={(e) => this.handleDate(e)}
            options={{ calenderLocale: "ne", valueLocale: "en" }}
          />
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
                <div {...getRootProps()} className="mt-2">
                  <input {...getInputProps()} />
                  <div className="image">
                    <FontAwesomeIcon icon={faUpload} className="pr-1" />
                    Upload:{attachment ? attachment.name || book_file : ""}
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="justify-cat-center d-flex mt-4">
            <Button
              name="Submit"
              onClick={this.handleSubmit}
              disabled={isBusy}
            />
          </div>
        </div>
      </div>
    );
  }
}

Edit.propTypes = {
  book_title: PropTypes.string,
  approved_by: PropTypes.string,
  published_date: PropTypes.string,
  onSubmit: PropTypes.func,
};

Edit.defaultProps = {
  book_title: "",
  published_date: "",
  approved_by: "",

  OnSubmit: () => {},
};

export default Edit;
