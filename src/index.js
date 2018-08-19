import React from 'react';
import ReactDOM from 'react-dom';
import ArticleList from './ArticleList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ArticleList />, document.getElementById('root'));
registerServiceWorker();
