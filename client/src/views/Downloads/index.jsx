import React, { Component } from "react";
import { isEmpty, equals, isNil } from "ramda";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { DownloadsSection } from "../../components";
import DownloadActions from "../../actions/publication";

const headings = ["शीर्षक", "प्रकाशित मिति", "फाइल"];

class Downloads extends Component {
  constructor(props) {
    super(props);
    this.state = { loc: "downloadslist", perPage: 10, page: 1 };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectMenu = this.handleSelectMenu.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const loc = nextProps.location.pathname.split("/")[1];

    var downloadsList = [];
    if (nextProps != prevState) {
      downloadsList = nextProps.downloadsData.data;
    }
    const pageCount = !isNil(downloadsList)
      ? Math.ceil(downloadsList.total / nextProps.perPage)
      : 10;

    const data = !isNil(downloadsList) ? downloadsList.list : [];

    return { data, pageCount, loc };
  }

  handlePageChange(data) {
    const { perPage } = this.state;
    this.setState({ page: data.selected });

    this.props.fetchalldownloads({
      name: "published_date",
      page: data.selected * perPage,
      perPage,
    });
  }

  handleSelectMenu(event, item) {
    switch (event) {
      case "detail view": {
        this.props.history.push({
          pathname: `/downloadsdetail/${item.download_id}`,
          item,
        });
        break;
      }
      case "edit": {
        this.props.history.push({
          pathname: `/downloadsedit/${item.download_id}`,
          item,
        });
        break;
      }

      case "delete": {
        this.props.deletedownloads(item.download_id);
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
        {equals(loc, "downloadslist") && (
          <DownloadsSection.List
            title="कार्यक्रमहरू सम्बन्धि विवरण"
            pageCount={pageCount}
            data={data}
            authenticated={!isEmpty(token)}
            headings={headings}
            onSelect={this.handleSelectMenu}
            onPageClick={(e) => this.handlePageChange(e)}
          />
        )}

        {equals(loc, "downloaddetail") && (
          <DownloadsSection.Detail
            title="कार्यक्रमको बिस्तृत विवरण"
            history={this.props.history}
          />
        )}
        {equals(loc, "downloadedit") && !isEmpty(token) && (
          <DownloadsSection.Edit
            title="कार्यक्रमहरू पुनः प्रविष्ट"
            history={this.props.history}
            onUpdate={(e, id) => this.props.updatedownloads(e, id)}
          />
        )}
      </div>
    );
  }
}

Downloads.propTypes = {
  downloadsData: PropTypes.any,
};

Downloads.defaultProps = {
  downloadsData: {},
};

const mapStateToProps = (state) => ({
  token: state.app.token,
  downloadsData: state.publication.allbooksData,
});
const mapDispatchToProps = (dispatch) => ({
  fetchallDownloads: (payload) =>
    dispatch(DownloadActions.fetchalldownloadsRequest(payload)),

  updateDownloads: (payload, downloadId) =>
    dispatch(DownloadActions.updatedownloadsRequest(payload, downloadId)),

  deleteDownloads: (downloadId) =>
    dispatch(DownloadActions.deletedownloadsRequest(downloadId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Downloads);
