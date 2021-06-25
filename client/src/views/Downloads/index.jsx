import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { englishToNepaliNumber } from "nepali-number";

const headings = ["शीर्षक", "विषय", "प्रकाशित मिति"];

const downloadlist = [
  {
    title: "पशु प्रजनन् तथा कृत्रिम गर्भाधान हाते पुस्तिका",
    subject: "हाते पुस्तिका",
    date: "२१/७/२०७७",
    link: "link1",
  },
  {
    title: "व्यवसायिक गाई भैसीपालन हातेपुस्तिका",
    subject: "हाते पुस्तिका",
    date: "२१/७/२०७७",
    link: "link2",
  },
];

class Downloads extends Component {
  render() {
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
              {downloadlist.map((download, index) => (
                <tr>
                  <td>{englishToNepaliNumber(index + 1)}</td>
                  <td key={index}> {download.title}</td>
                  <td key={index}> {download.subject}</td>
                  <td key={index}> {download.date}</td>
                  <td key={index}> {download.link}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Downloads;
