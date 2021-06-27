import React, { Component } from "react";
import { isEmpty, isNil, equals } from "ramda";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { PressreleaseSection } from "../../../components";
import AdminActions from "../../../actions/admin";

const headings = ["शीर्षक", "कार्यक्रम बिवरण ", "रुजुकर्ता", "मिति", "फाइल"];

class PressRelease extends Component {
  constructor(props) {
    super(props);
    this.state = { loc: "pressreleaselist", perPage: 10, page: 1 };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectMenu = this.handleSelectMenu.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const loc = nextProps.location.pathname.split("/")[2];
    var pressreleaseList = [];
    if (nextProps != prevState) {
      pressreleaseList = nextProps.pressreleaseData.data;
    }
    const pageCount = !isNil(pressreleaseList)
      ? Math.ceil(pressreleaseList.total / nextProps.perPage)
      : 10;

    const data = !isNil(pressreleaseList) ? pressreleaseList.list : [];

    return { data, pageCount, loc };
  }

  handlePageChange(data) {
    const { perPage } = this.state;
    this.setState({ page: data.selected });

    this.props.fetchallPressRelease({
      name: "pressrelease_date",
      page: data.selected * perPage,
      perPage,
    });
  }

  handleSelectMenu(event, item) {
    switch (event) {
      case "detail view": {
        this.props.history.push({
          pathname: `/notice/pressreleasedetail/${item.event_id}`,
          item,
        });
        break;
      }
      case "edit": {
        this.props.history.push({
          pathname: `/notice/pressreleaseedit/${item.event_id}`,
          item,
        });
        break;
      }

      case "delete": {
        this.props.deletepressrelease(item.event_id);
        break;
      }
      default:
        break;
    }
  }

  render() {
    const { data, pageCount, loc } = this.state;
    const { token } = this.props;

    return (
      <div>
        {equals(loc, "pressreleaselist") && (
          <PressreleaseSection.List
            title="प्रेस विज्ञप्ति सम्बन्धि विवरण"
            pageCount={pageCount}
            data={data}
            authenticated={!isEmpty(token)}
            headings={headings}
            onSelect={this.handleSelectMenu}
            onPageClick={(e) => this.handlePageChange(e)}
          />
        )}

        {equals(loc, "pressreleasedetail") && (
          <PressreleaseSection.Detail
            title="प्रेस विज्ञप्तिको बिस्तृत विवरण"
            history={this.props.history}
          />
        )}
        {equals(loc, "pressreleaseedit") && !isEmpty(token) && (
          <PressreleaseSection.Edit
            title="प्रेस विज्ञप्ति पुनः प्रविष्ट"
            history={this.props.history}
            onUpdate={(e, id) => this.props.updatePressRelease(e, id)}
          />
        )}
      </div>
    );
  }
}

PressRelease.propTypes = {
  pressreleaseData: PropTypes.any,
};

PressRelease.defaultProps = {
  pressreleaseData: {},
};

const mapStateToProps = (state) => ({
  token: state.app.token,
  pressreleaseData: state.admin.alleventsData,
});
const mapDispatchToProps = (dispatch) => ({
  fetchallPressRelease: (payload) =>
    dispatch(AdminActions.fetchallpressreleaseRequest(payload)),

  updatePressRelease: (payload, eventId) =>
    dispatch(AdminActions.updatepressreleaseRequest(payload, eventId)),

  deletePressRelease: (eventId) =>
    dispatch(AdminActions.deletepressreleaseRequest(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PressRelease);
