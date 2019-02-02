import React from 'react';
import { Route } from 'react-router-dom'; 
// import { withRouter } from 'react-router-dom';

import { ArticleList, LogIn, Admin, AdminRouter } from './components';

const App = () => (
  <React.Fragment>
    <Route path='/' exact component={ArticleList} />

    <Route path='/admin/login' component={LogIn} />

    <AdminRouter path='/admin' component={Admin} />
  </React.Fragment>
);

// const App = withRouter(AppComponent);

export default App;