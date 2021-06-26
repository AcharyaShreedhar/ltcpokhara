import React, { Component } from "react";
import { isEmpty, equals, isNil } from "ramda";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { StaffSection } from "../../../components";
import AdminActions from "../../../actions/admin";

const headings = ["नाम", "पद", "शाखा", "ईमेल", "फोटो"];

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = { loc: "staffslist", perPage: 10, page: 1 };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectMenu = this.handleSelectMenu.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const loc = nextProps.location.pathname.split("/")[2];
    var staffsList = [];
    if (nextProps != prevState) {
      staffsList = nextProps.staffsData.data;
    }
    const pageCount = !isNil(staffsList)
      ? Math.ceil(staffsList.total / nextProps.perPage)
      : 10;

    const data = !isNil(staffsList) ? staffsList.list : [];

    return { data, pageCount, loc };
  }

  handlePageChange(data) {
    const { perPage } = this.state;
    this.setState({ page: data.selected });

    this.props.fetchallStaffs({
      name: "staff_name",
      page: data.selected * perPage,
      perPage,
    });
  }

  handleSelectMenu(event, item) {
    switch (event) {
      case "detail view": {
        this.props.history.push({
          pathname: `/about/staffdetail/${item.staff_id}`,
          item,
        });
        break;
      }
      case "edit": {
        this.props.history.push({
          pathname: `/about/staffedit/${item.staff_id}`,
          item,
        });
        break;
      }

      case "delete": {
        this.props.deletestaffs(item.staff_id);
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
        {equals(loc, "stafflist") && (
          <StaffSection.List
            title="कार्यक्रमहरू सम्बन्धि विवरण"
            pageCount={pageCount}
            data={data}
            authenticated={!isEmpty(token)}
            headings={headings}
            onSelect={this.handleSelectMenu}
            onPageClick={(e) => this.handlePageChange(e)}
          />
        )}

        {equals(loc, "staffsdetail") && (
          <StaffSection.Detail
            title="कार्यक्रमको बिस्तृत विवरण"
            history={this.props.history}
          />
        )}
        {equals(loc, "staffsedit") && !isEmpty(token) && (
          <StaffSection.Edit
            title="कार्यक्रमहरू पुनः प्रविष्ट"
            history={this.props.history}
            onUpdate={(e, id) => this.props.updatestaffs(e, id)}
          />
        )}
      </div>
    );
  }
}

Staff.propTypes = {
  staffsData: PropTypes.any,
};

Staff.defaultProps = {
  staffsData: {},
};

const mapStateToProps = (state) => ({
  token: state.app.token,
  staffsData: state.admin.allstaffData,
});
const mapDispatchToProps = (dispatch) => ({
  fetchallStaffs: (payload) =>
    dispatch(AdminActions.fetchallstaffRequest(payload)),

  updatestaffs: (payload, staffId) =>
    dispatch(AdminActions.updatestaffsRequest(payload, staffId)),

  deletestaffs: (staffId) =>
    dispatch(AdminActions.deletestaffsRequest(staffId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Staff);
