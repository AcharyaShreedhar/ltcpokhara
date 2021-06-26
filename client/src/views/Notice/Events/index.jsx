import React, { Component } from "react";
import { isNil } from "ramda";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { englishToNepaliNumber } from "nepali-number";
import ReactPaginate from "react-paginate";
import AdminActions from "../../../actions/admin";

const headings = ["शीर्षक", "रुजुकर्ता", "मिति", ""];

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { perPage: 10, page: 1 };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var eventsList = [];
    if (nextProps != prevState) {
      eventsList = nextProps.eventsData.data;
    }
    const pageCount = !isNil(eventsList)
      ? Math.ceil(eventsList.total / nextProps.perPage)
      : 10;

    const data = !isNil(eventsList) ? eventsList.list : [];

    return { data, pageCount };
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

  render() {
    const { data, pageCount } = this.state;
    return (
      <div className="content">
        <div className="titlebar">कार्यक्रमहरू</div>
        <div>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>क्र.स.</th>
                {headings.map((heading, index) => (
                  <th key={index}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((event, index) => (
                <tr>
                  <td>{englishToNepaliNumber(index + 1)}</td>
                  <td key={index}> {event.notice_title}</td>
                  <td key={index}> {event.notice_approvedby}</td>
                  <td key={index}> {event.notice_publisheddate}</td>
                  <td key={index}> {event.notice_file}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="paginationStyle">
            <ReactPaginate
              previousLabel={"PREV"}
              nextLabel={"NEXT"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
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
  eventsData: state.admin.programmes,
});
const mapDispatchToProps = (dispatch) => ({
  fetchallEvents: (payload) =>
    dispatch(AdminActions.fetchalleventsRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
