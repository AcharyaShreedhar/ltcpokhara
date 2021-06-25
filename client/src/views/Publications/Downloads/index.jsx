import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { isEmpty } from "ramda";
import { englishToNepaliNumber } from "nepali-number";

const headings = ["शीर्षक", "विषय", "प्रकाशित मिति"];

class Downloads extends Component {
  render() {
    const { downloadsData } = this.props;
    return (
      <div className="content">
        <div className="titlebar">Downloads</div>
        <div>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>क्र.स.</th>
                {headings.map((heading, index) => (
                  <th key={index}>{heading}</th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {!isEmpty(downloadsData) ? (
                downloadsData.map((download, index) => (
                  <tr>
                    <td>{englishToNepaliNumber(index + 1)}</td>
                    <td key={index}> {download.publication_title}</td>
                    <td key={index}> {download.publication_subject}</td>
                    <td key={index}> {download.publication_date}</td>
                    <td key={index}> {download.publication_file}</td>
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
  downloadsData: state.admin.downloads,
});

export default connect(mapStateToProps, null)(Downloads);
