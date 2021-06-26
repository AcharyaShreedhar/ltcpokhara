import React, { Fragment } from "react";
import { englishToNepaliNumber } from "nepali-number";
import { PropTypes } from "prop-types";
import { isNil } from "ramda";
import ReactPaginate from "react-paginate";
import { Table } from "react-bootstrap";
import { Button, EditDropdown } from "../../components";

function List(props) {
  const {
    authenticated,
    headings,
    data,
    title,
    onSelect,
    pageCount,
    onPageClick,
  } = props;
  return (
    <Fragment>
      <div className="titlebar">{title}</div>
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
          {data.map((nirdesika, index) => (
            <tr>
              <td>{englishToNepaliNumber(index + 1)}</td>
              <td key={index}> {nirdesika.nirdeshika_sirsak}</td>
              <td key={index}> {nirdesika.nirdeshika_bisaya}</td>
              <td key={index}> {nirdesika.nirdeshika_miti}</td>
              <td key={index}> {nirdesika.nirdeshika_file}</td>

              <td>
                {authenticated ? (
                  <div className="edit">
                    <EditDropdown
                      options={["Detail View", "Edit", "Delete"]}
                      onChange={(e) => onSelect(e, nirdesika)}
                    />
                  </div>
                ) : (
                  <div className="edit">
                    <EditDropdown
                      options={["Detail View"]}
                      onChange={(e) => onSelect(e, nirdesika)}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
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
          onPageChange={onPageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </Fragment>
  );
}

List.propTypes = {
  data: PropTypes.array,
  onSelect: PropTypes.func,
};

List.defaultProps = {
  data: [],
  onSelect: () => {},
};

export default List;
