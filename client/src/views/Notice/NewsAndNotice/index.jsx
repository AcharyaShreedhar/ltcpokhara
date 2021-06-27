import React, { Component } from "react";
import { isEmpty, isNil, equals } from "ramda";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { NoticeSection } from "../../../components";
import AdminActions from "../../../actions/admin";

const headings = ["शीर्षक", "रुजुकर्ता", "मिति", "फाइल"];

class NewsAndNotice extends Component {
  constructor(props) {
    super(props);
    this.state = { loc: "newsandnoticelist", perPage: 10, page: 1 };
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
          pathname: `/notice/newsandnoticesdetail/${item.notice_id}`,
          item,
        });
        break;
      }
      case "edit": {
        this.props.history.push({
          pathname: `/notices/newsandnoticesedit/${item.notice_id}`,
          item,
        });
        break;
      }

      case "delete": {
        this.props.deleteBanxetraanyaprayojan(item.notice_id);
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
        {equals(loc, "newsandnoticeslist") && (
          <NoticeSection.List
            title="सूचना तथा समाचारहरू सम्बन्धि विवरण"
            pageCount={pageCount}
            data={data}
            authenticated={!isEmpty(token)}
            headings={headings}
            onSelect={this.handleSelectMenu}
            onPageClick={(e) => this.handlePageChange(e)}
          />
        )}

        {equals(loc, "newsandnoticesdetail") && (
          <NoticeSection.Detail
            title="सूचना तथा समाचारहरूको बिस्तृत विवरण"
            history={this.props.history}
            onSelect={this.handleSelectMenu}
          />
        )}
        {equals(loc, "newsandnoticesedit") && !isEmpty(token) && (
          <NoticeSection.Edit
            title="सूचना तथा समाचारहरू पुनः प्रविष्ट"
            history={this.props.history}
            onSelect={this.handleSelectMenu}
            onUpdate={(e, id) => this.props.updateEvents(e, id)}
          />
        )}
      </div>
    );
  }
}

NewsAndNotice.propTypes = {
  eventsData: PropTypes.any,
};

NewsAndNotice.defaultProps = {
  eventsData: {},
};

const mapStateToProps = (state) => ({
  token: state.app.token,
  eventsData: state.admin.alleventsData,
});
const mapDispatchToProps = (dispatch) => ({
  fetchallEvents: (payload) =>
    dispatch(AdminActions.fetchalleventsRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsAndNotice);
