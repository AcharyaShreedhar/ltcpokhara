import React, { Component } from "react";
import { isNil } from "ramda";
import { PropTypes } from "prop-types";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { isEmpty } from "ramda";
import { englishToNepaliNumber } from "nepali-number";
import ReactPaginate from "react-paginate";
import AdminActions from "../../../actions/admin";

const headings = ["शीर्षक", "रुजुकर्ता", "प्रकाशीत मिति", ""];

class PressRelease extends Component {
  constructor(props) {
    super(props);
    this.state = { perPage: 10, page: 1 };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var pressreleaseList = [];
    if (nextProps != prevState) {
      pressreleaseList = nextProps.pressreleaseData.data;
    }
    const pageCount = !isNil(pressreleaseList)
      ? Math.ceil(pressreleaseList.total / nextProps.perPage)
      : 10;

    const data = !isNil(pressreleaseList) ? pressreleaseList.list : [];

    return { data, pageCount };
  }

  handlePageChange(data) {
    const { perPage } = this.state;
    this.setState({ page: data.selected });

    this.props.fetchallPressReleases({
      name: "published_date",
      page: data.selected * perPage,
      perPage,
    });
  }
  render() {
    const { data, pageCount } = this.state;

    return (
      <div className="content">
        <div className="titlebar">प्रेस विज्ञप्ति</div>
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
              {!isEmpty(data) ? (
                data.map((pressRelease, index) => (
                  <tr>
                    <td>{englishToNepaliNumber(index + 1)}</td>
                    <td key={index}> {pressRelease.notice_title}</td>
                    <td key={index}> {pressRelease.notice_approvedby}</td>
                    <td key={index}> {pressRelease.notice_date}</td>
                    <td key={index}> {pressRelease.notice_file}</td>
                  </tr>
                ))
              ) : (
                <div className="text-center w-100">
                  कुनै विवरण उपलब्द छैन !!!
                </div>
              )}
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

PressRelease.propTypes = {
  pressreleaseData: PropTypes.any,
};

PressRelease.defaultProps = {
  pressreleaseData: {},
};

const mapStateToProps = (state) => ({
  pressreleaseData: state.admin.pressrelease,
});

const mapDispatchToProps = (dispatch) => ({
  fetchallPressReleases: (payload) =>
    dispatch(AdminActions.fetchallpressreleasesRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PressRelease);
