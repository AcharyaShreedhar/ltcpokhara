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
      id: props.history.location.item.nirdeshika_id,
      nirdeshika_sirsak: props.history.location.item.nirdeshika_sirsak,
      nirdeshika_bisaya: props.history.location.item.nirdeshika_bisaya,
      nirdeshika_miti: props.history.location.item.nirdeshika_miti,
      nirdeshika_file: props.history.location.item.nirdeshika_file,
      attachment: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleSubmit() {
    const {
      nirdeshika_sirsak,
      nirdeshika_bisaya,
      nirdeshika_miti,
      nirdeshika_file,
      attachment,
    } = this.state;
    const payload = {
      nirdeshika: {
        data: {
          nirdeshika_sirsak: nirdeshika_sirsak,
          nirdeshika_bisaya: nirdeshika_bisaya,
          nirdeshika_miti: nirdeshika_miti,
          nirdeshika_file: attachment.name || nirdeshika_file,
        },
      },
    };

    this.props.onUpdate(payload, attachment);
  }

  handleDate(e) {
    this.setState({ nirdeshika_miti: e });
  }
  handleDrop(e) {
    this.setState({ attachment: e[0] });
  }

  render() {
    const { isBusy, title } = this.props;
    const {
      nirdeshika_sirsak,
      nirdeshika_bisaya,
      nirdeshika_miti,
      nirdeshika_file,
      attachment,
    } = this.state;
    return (
      <div className="admin card mt-5">
        <div className="sign-in">
          <div className="sirsakbar text-center justify-cat-center">
            {title}
          </div>
          <Input
            className="mb-4"
            sirsak="शीर्षक "
            value={nirdeshika_sirsak}
            direction="vertical"
            onChange={(e) => this.setState({ nirdeshika_sirsak: e })}
          />
          <Input
            className="mb-4"
            sirsak="बेहोरा"
            value={nirdeshika_bisaya}
            direction="vertical"
            as="textarea"
            onChange={(e) => this.setState({ nirdeshika_bisaya: e })}
          />

          <span className="dsl-b18">प्रकाशित मिति</span>
          <NepaliDatePicker
            inputClassName="form-control"
            className="mb-4"
            value={nirdeshika_miti}
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
                    Upload:
                    {attachment ? attachment.name || nirdeshika_file : ""}
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
  nirdeshika_sirsak: PropTypes.string,
  approved_by: PropTypes.string,
  nirdeshika_miti: PropTypes.string,
  onSubmit: PropTypes.func,
};

Edit.defaultProps = {
  nirdeshika_sirsak: "",
  nirdeshika_miti: "",
  approved_by: "",

  OnSubmit: () => {},
};

export default Edit;
