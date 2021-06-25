import React, { Component } from "react";
import { isNil } from "ramda";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { isEmpty } from "ramda";
import { englishToNepaliNumber } from "nepali-number";

const headings = ["शीर्षक", "विषय", "प्रकाशित मिति"];

class Books extends Component {
  render() {
    const booksData = isNil(this.props.bookData) ? [] : this.props.bookData;
    return (
      <div className="content">
        <div className="titlebar">हाते पुस्तिका</div>
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
              {!isEmpty(booksData) ? (
                booksData.map((book, index) => (
                  <tr>
                    <td>{englishToNepaliNumber(index + 1)}</td>
                    <td key={index}> {book.publication_title}</td>
                    <td key={index}> {book.publication_subject}</td>
                    <td key={index}> {book.publication_date}</td>
                    <td key={index}> {book.publication_file}</td>
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
  bookData: state.admin.books,
});

export default connect(mapStateToProps, null)(Books);
