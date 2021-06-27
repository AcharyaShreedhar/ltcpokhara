import React, { Component } from "react";
import { isEmpty, equals, isNil } from "ramda";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { BooksSection } from "../../../components";
import PublicationActions from "../../../actions/publication";

const headings = ["शीर्षक", "विषय", "प्रकाशित मिति", "फाइल"];

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = { loc: "bookslist", perPage: 10, page: 1 };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectMenu = this.handleSelectMenu.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const loc = nextProps.location.pathname.split("/")[2];
    console.log("books", nextProps);
    var booksList = [];
    if (nextProps != prevState) {
      booksList = nextProps.booksData.data;
    }
    const pageCount = !isNil(booksList)
      ? Math.ceil(booksList.total / nextProps.perPage)
      : 10;

    const data = !isNil(booksList) ? booksList.list : [];

    return { data, pageCount, loc };
  }

  handlePageChange(data) {
    const { perPage } = this.state;
    this.setState({ page: data.selected });

    this.props.fetchallbooks({
      name: "published_date",
      page: data.selected * perPage,
      perPage,
    });
  }

  handleSelectMenu(event, item) {
    switch (event) {
      case "detail view": {
        this.props.history.push({
          pathname: `/publications/booksdetail/${item.book_id}`,
          item,
        });
        break;
      }
      case "edit": {
        this.props.history.push({
          pathname: `/publications/booksedit/${item.book_id}`,
          item,
        });
        break;
      }

      case "delete": {
        this.props.deletebooks(item.book_id);
        break;
      }
      default:
        break;
    }
  }

  render() {
    const { data, pageCount, loc } = this.state;
    const { token } = this.props;

    return (
      <div>
        {equals(loc, "bookslist") && (
          <BooksSection.List
            title="हाते पुस्तिका सम्बन्धि विवरण"
            pageCount={pageCount}
            data={data}
            authenticated={!isEmpty(token)}
            headings={headings}
            onSelect={this.handleSelectMenu}
            onPageClick={(e) => this.handlePageChange(e)}
          />
        )}

        {equals(loc, "booksdetail") && (
          <BooksSection.Detail
            title="हाते पुस्तिकाको बिस्तृत विवरण"
            history={this.props.history}
          />
        )}
        {equals(loc, "booksedit") && !isEmpty(token) && (
          <BooksSection.Edit
            title="हाते पुस्तिका पुनः प्रविष्ट"
            history={this.props.history}
            onUpdate={(e, id) => this.props.updatebooks(e, id)}
          />
        )}
      </div>
    );
  }
}

Books.propTypes = {
  booksData: PropTypes.any,
};

Books.defaultProps = {
  booksData: {},
};

const mapStateToProps = (state) => ({
  token: state.app.token,
  booksData: state.publication.allbooksData,
});
const mapDispatchToProps = (dispatch) => ({
  fetchallBooks: (payload) =>
    dispatch(PublicationActions.fetchallbooksRequest(payload)),

  updateBooks: (payload, bookId) =>
    dispatch(PublicationActions.updatebooksRequest(payload, bookId)),

  deleteBooks: (bookId) =>
    dispatch(PublicationActions.deletebooksRequest(bookId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
