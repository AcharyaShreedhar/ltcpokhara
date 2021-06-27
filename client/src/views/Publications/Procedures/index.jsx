import React, { Component } from "react";

import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { isEmpty, isNil, equals } from "ramda";
import { NirdesikaSection } from "../../../components";
import PublicationActions from "../../../actions/publication";

const headings = ["शीर्षक", "विषय", "प्रकाशित मिति", "फाइल"];

class Procedures extends Component {
  constructor(props) {
    super(props);
    this.state = { loc: "nirdesikalist", perPage: 10, page: 1 };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectMenu = this.handleSelectMenu.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const loc = nextProps.location.pathname.split("/")[2];
    console.log("nirdesika", nextProps);
    var nirdesikaList = [];
    if (nextProps != prevState) {
      nirdesikaList = nextProps.nirdesikaData.data;
    }
    const pageCount = !isNil(nirdesikaList)
      ? Math.ceil(nirdesikaList.total / nextProps.perPage)
      : 10;

    const data = !isNil(nirdesikaList) ? nirdesikaList.list : [];

    return { data, pageCount, loc };
  }

  handlePageChange(data) {
    const { perPage } = this.state;
    this.setState({ page: data.selected });

    this.props.fetchallnirdesika({
      name: "nirdeshika_miti",
      page: data.selected * perPage,
      perPage,
    });
  }

  handleSelectMenu(event, item) {
    switch (event) {
      case "detail view": {
        this.props.history.push({
          pathname: `/publications/proceduredetail/${item.book_id}`,
          item,
        });
        break;
      }
      case "edit": {
        this.props.history.push({
          pathname: `/publications/procedureedit/${item.book_id}`,
          item,
        });
        break;
      }

      case "delete": {
        this.props.deletenirdesika(item.book_id);
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
        {equals(loc, "procedureslist") && (
          <NirdesikaSection.List
            title="निर्देशिका / कार्यविधि सम्बन्धि विवरण"
            pageCount={pageCount}
            data={data}
            authenticated={!isEmpty(token)}
            headings={headings}
            onSelect={this.handleSelectMenu}
            onPageClick={(e) => this.handlePageChange(e)}
          />
        )}

        {equals(loc, "proceduredetail") && (
          <NirdesikaSection.Detail
            title="निर्देशिका / कार्यविधिको बिस्तृत विवरण"
            history={this.props.history}
          />
        )}
        {equals(loc, "procedureedit") && !isEmpty(token) && (
          <NirdesikaSection.Edit
            title="निर्देशिका / कार्यविधिहरू पुनः प्रविष्ट"
            history={this.props.history}
            onUpdate={(e, id) => this.props.updateProcedures(e, id)}
          />
        )}
      </div>
    );
  }
}

Procedures.propTypes = {
  nirdesikaData: PropTypes.any,
};

Procedures.defaultProps = {
  nirdesikaData: {},
};

const mapStateToProps = (state) => ({
  token: state.app.token,
  nirdesikaData: state.publication.allnirdesikaData,
});
const mapDispatchToProps = (dispatch) => ({
  fetchallProcedures: (payload) =>
    dispatch(PublicationActions.fetchallnirdesikaRequest(payload)),

  updateProcedures: (payload, bookId) =>
    dispatch(PublicationActions.updatenirdesikaRequest(payload, bookId)),

  deleteProcedures: (bookId) =>
    dispatch(PublicationActions.deletenirdesikaRequest(bookId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Procedures);
