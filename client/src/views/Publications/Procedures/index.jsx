import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { isEmpty } from "ramda";
import { englishToNepaliNumber } from "nepali-number";

const headings = ["शीर्षक", "विषय", "प्रकाशित मिति"];

class Procedures extends Component {
  render() {
    const { procedureData } = this.props;
    return (
      <div className="content">
        <div className="titlebar">निर्देशिका / कार्यविधि</div>
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
              {!isEmpty(procedureData) ? (
                procedureData.map((procedure, index) => (
                  <tr>
                    <td>{englishToNepaliNumber(index + 1)}</td>
                    <td key={index}> {procedure.publication_title}</td>
                    <td key={index}> {procedure.publication_subject}</td>
                    <td key={index}> {procedure.publication_date}</td>
                    <td key={index}> {procedure.publication_file}</td>
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
  procedureData: state.admin.tors,
});

export default connect(mapStateToProps, null)(Procedures);
