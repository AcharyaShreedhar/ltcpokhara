import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { Button, Input } from "../../../components";
import PublicationActions from "../../../actions/publication";
import "../admin.scss";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book_title: "",
      book_cat: "",
      published_date: "",
      book_file: "",
      attachment: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleSubmit() {
    const { book_title, book_cat, published_date, attachment } = this.state;
    const payload = {
      books: {
        data: {
          book_title: book_title,
          book_cat: book_cat,
          published_date: published_date,
          book_file: attachment.name,
        },
      },
    };

    this.props.saveBook(payload, attachment);
  }

  handleCategory(event) {
    this.setState({ book_cat: event.target.value });
  }
  handleDate(e) {
    this.setState({ published_date: e });
  }
  handleDrop(e) {
    this.setState({ attachment: e[0] });
  }

  render() {
    const { isBusy } = this.props;
    const { book_title, book_cat, published_date, attachment } = this.state;
    return (
      <div className="admin card mt-5">
        <div className="sign-in">
          <div className="titlebar text-center justify-content-center">
            प्रकाशन्
          </div>
          <Input
            className="mb-4"
            title="शीर्षक "
            value={book_title}
            direction="vertical"
            onChange={(e) => this.setState({ book_title: e })}
          />
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="core-input-label">वर्ग</Form.Label>
            <Form.Control
              className="input"
              as="select"
              value={book_cat}
              onChange={this.handleCategory}
            >
              <option value="tor">निर्देशिका / कार्यविधि</option>
              <option value="books">हाते पुस्तिका</option>
              <option value="download">अन्य डाउनलोड</option>
            </Form.Control>
          </Form.Group>

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
                    Upload: {attachment ? attachment.name : ""}
                  </div>
                </div>
              </section>
            )}
          </Dropzone>

          <div className="justify-content-center d-flex mt-4">
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

AddBook.propTypes = {
  title: PropTypes.string,
  subject: PropTypes.string,
  publishedDate: PropTypes.string,
  book_cat: PropTypes.string,
  onSubmit: PropTypes.func,
};

AddBook.defaultProps = {
  title: "",
  book_cat: "",
  publishedDate: "",
  subject: "",

  OnSubmit: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  saveBook: (e) => dispatch(PublicationActions.addbooksRequest(e)),
});

export default connect(null, mapDispatchToProps)(AddBook);
