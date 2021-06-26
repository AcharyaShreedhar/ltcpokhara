import React, { Component } from "react";
import { isNil } from "ramda";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { englishToNepaliNumber } from "nepali-number";
import ReactPaginate from "react-paginate";
import AdminActions from "../../../actions/admin";

const headings = ["नाम", "पद", "शाखा", "ईमेल", "फोटो"];

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = { perPage: 10, page: 1 };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    var staffList = [];
    if (nextProps != prevState) {
      staffList = nextProps.staffsData.data;
    }
    const pageCount = !isNil(staffList)
      ? Math.ceil(staffList.total / nextProps.perPage)
      : 10;

    const data = !isNil(staffList) ? staffList.list : [];

    return { data, pageCount };
  }

  handlePageChange(data) {
    const { perPage } = this.state;
    this.setState({ page: data.selected });

    this.props.fetchallNotices({
      name: "notice_publisheddate",
      page: data.selected * perPage,
      perPage,
    });
  }
  render() {
    const { data, pageCount } = this.state;

    return (
      <div className="content">
        <div className="titlebar">कर्मचारी</div>
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
              {data ? (
                data.map((staff, index) => (
                  <tr>
                    <td>{englishToNepaliNumber(index + 1)}</td>
                    <td key={index}> {staff.staff_name}</td>
                    <td key={index}> {staff.staff_designation}</td>
                    <td key={index}> {staff.staff_branch}</td>
                    <td key={index}> {staff.staff_email}</td>
                    <td key={index}> {staff.staff_file}</td>
                  </tr>
                ))
              ) : (
                <tr>कुनै विवरण उपलब्द छैन !!!</tr>
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

Staff.propTypes = {
  staffsData: PropTypes.any,
};

Staff.defaultProps = {
  staffsData: {},
};

const mapStateToProps = (state) => ({
  staffsData: state.admin.staffs,
});

const mapDispatchToProps = (dispatch) => ({
  fetchallNotices: (payload) =>
    dispatch(AdminActions.fetchallnoticesRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Staff);
