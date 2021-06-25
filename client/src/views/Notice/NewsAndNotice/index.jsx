import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { isEmpty } from "ramda";
import { englishToNepaliNumber } from "nepali-number";

const headings = ["शीर्षक", "रुजुकर्ता", "प्रकाशीत मिति", ""];

class NewsAndNotice extends Component {
  render() {
    const newsandnoticeList = this.props.newsandnoticeData;
    return (
      <div className="content">
        <div className="titlebar">सूचना तथा समाचारहरू</div>
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
              {!isEmpty(newsandnoticeList) ? (
                newsandnoticeList.map((newsandnotice, index) => (
                  <tr>
                    <td>{englishToNepaliNumber(index + 1)}</td>
                    <td key={index}> {newsandnotice.notice_title}</td>
                    <td key={index}> {newsandnotice.notice_approvedby}</td>
                    <td key={index}> {newsandnotice.notice_date}</td>
                    <td key={index}> {newsandnotice.notice_file}</td>
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
  newsandnoticeData: state.admin.newsandnotice,
});

export default connect(mapStateToProps, null)(NewsAndNotice);
