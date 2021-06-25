import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { equals, isEmpty } from "ramda";
import { ToastContainer } from "react-toastify";
import {
  FABButoon,
  Footer,
  HeaderComponent,
  NavbarComponent,
  LoadingAnimation as Loading,
} from "../../components";
import { Content } from "./dashboard";
import AppActions from "../../actions/app";
import AdminActions from "../../actions/admin";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.history.listen((location, action) => {
      const payload = {
        route: location.pathname,
      };
      this.props.saveLocation(payload);
    });
    this.props.fetchNotice();
    this.props.fetchPublication();
    this.props.fetchStaff();
  }

  render() {
    const { history, location, token, isBusy } = this.props;

    return (
      <div className="dashboard">
        <HeaderComponent />
        <NavbarComponent location={location} history={history} token={token} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Content location={location} token={token} history={history} />
        {!isEmpty(token) && <FABButoon history={history} />}
        <Footer />

        <Loading loading={isBusy} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  location: PropTypes.any,
};

Dashboard.defaultProps = {
  token: "",
  location: {},
};

const mapStateToProps = (state) => ({
  isBusy: equals(state.admin.status, "pending"),
  token: state.app.token,
});

const mapDispatchToProps = (dispatch) => ({
  saveLocation: (e) => dispatch(AppActions.locationsRequest(e)),
  fetchNotice: () => dispatch(AdminActions.fetchnoticeRequest()),
  fetchPublication: () => dispatch(AdminActions.fetchpublicationRequest()),
  fetchStaff: () => dispatch(AdminActions.fetchstaffRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
