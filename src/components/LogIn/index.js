import { connect } from 'react-redux';

import LogInComponent from './LogIn';

const mapStateToProps = state => ({
    // token: state.token
});

const mapDispatchToProps = {};

export const LogIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInComponent);