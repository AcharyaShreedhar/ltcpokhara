import React, { Component } from "react";
import {isNil} from "ramda"
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { englishToNepaliNumber } from "nepali-number";

const headings = ["नाम", "पद", "शाखा", "ईमेल", "फोटो"];

class Staff extends Component {
  render() {
    const staffList = isNil(this.props.staffsData)?[]:this.props.staffsData.staffs
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
              {staffList ? (
                staffList.map((staff, index) => (
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // staffsData: state.admin.staffs.data,
});

export default connect(mapStateToProps, null)(Staff);
