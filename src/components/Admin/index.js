import { connect } from 'react-redux';

import AdminComponent from './Admin';

const mapStateToProps = state => ({
//   articles: state.articles.articles
});

const mapDispatchToProps = {};

export const Admin = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminComponent);