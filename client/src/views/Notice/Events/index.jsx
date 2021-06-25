import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { englishToNepaliNumber } from "nepali-number";

const headings = ["शीर्षक", "रुजुकर्ता", "मिति", ""];

class Events extends Component {
  render() {
    const eventList = this.props.eventsData;
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
              {eventList.map((event, index) => (
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  eventsData: state.admin.programmes,
});

export default connect(mapStateToProps, null)(Events);
