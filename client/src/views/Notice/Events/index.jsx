import React, { Component } from "react";
import { isEmpty, isNil, equals } from "ramda";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { EventsSection } from "../../../components";
import AdminActions from "../../../actions/admin";

const headings = ["शीर्षक", "कार्यक्रम बिवरण ", "रुजुकर्ता", "मिति", "फाइल"];

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { loc: "eventslist", perPage: 10, page: 1 };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectMenu = this.handleSelectMenu.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const loc = nextProps.location.pathname.split("/")[2];
    var eventsList = [];
    if (nextProps != prevState) {
      eventsList = nextProps.eventsData.data;
    }
    const pageCount = !isNil(eventsList)
      ? Math.ceil(eventsList.total / nextProps.perPage)
      : 10;

    const data = !isNil(eventsList) ? eventsList.list : [];

    return { data, pageCount, loc };
  }

  handlePageChange(data) {
    const { perPage } = this.state;
    this.setState({ page: data.selected });

    this.props.fetchallEvents({
      name: "events_date",
      page: data.selected * perPage,
      perPage,
    });
  }

  handleSelectMenu(event, item) {
    switch (event) {
      case "detail view": {
        this.props.history.push({
          pathname: `/notice/eventsdetail/${item.event_id}`,
          item,
        });
        break;
      }
      case "edit": {
        this.props.history.push({
          pathname: `/notice/eventsedit/${item.event_id}`,
          item,
        });
        break;
      }

      case "delete": {
        this.props.deleteEvents(item.event_id);
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
        {equals(loc, "eventslist") && (
          <EventsSection.List
            title="कार्यक्रमहरू सम्बन्धि विवरण"
            pageCount={pageCount}
            data={data}
            authenticated={!isEmpty(token)}
            headings={headings}
            onSelect={this.handleSelectMenu}
            onPageClick={(e) => this.handlePageChange(e)}
          />
        )}

        {equals(loc, "eventsdetail") && (
          <EventsSection.Detail
            title="कार्यक्रमको बिस्तृत विवरण"
            history={this.props.history}
          />
        )}
        {equals(loc, "eventsedit") && !isEmpty(token) && (
          <EventsSection.Edit
            title="कार्यक्रमहरू पुनः प्रविष्ट"
            history={this.props.history}
            onUpdate={(e, id) => this.props.updateEvents(e, id)}
          />
        )}
      </div>
    );
  }
}

Events.propTypes = {
  eventsData: PropTypes.any,
};

Events.defaultProps = {
  eventsData: {},
};

const mapStateToProps = (state) => ({
  token: state.app.token,
  eventsData: state.admin.alleventsData,
});
const mapDispatchToProps = (dispatch) => ({
  fetchallEvents: (payload) =>
    dispatch(AdminActions.fetchalleventsRequest(payload)),

  updateEvents: (payload, eventId) =>
    dispatch(AdminActions.updateeventsRequest(payload, eventId)),

  deleteEvents: (eventId) =>
    dispatch(AdminActions.deleteeventsRequest(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
