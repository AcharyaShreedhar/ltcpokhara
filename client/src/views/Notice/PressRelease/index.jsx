import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { isEmpty } from "ramda";
import { englishToNepaliNumber } from "nepali-number";

const headings = ["शीर्षक", "रुजुकर्ता", "प्रकाशीत मिति", ""];

class PressRelease extends Component {
  render() {
    const pressreleaseList = this.props.pressreleaseData;

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
              {!isEmpty(pressreleaseList) ? (
                pressreleaseList.map((pressRelease, index) => (
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pressreleaseData: state.admin.pressrelease,
});

export default connect(mapStateToProps, null)(PressRelease);
