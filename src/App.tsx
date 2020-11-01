import React from 'react';
import './App.css';
import QueryBuilder from './components/QueryBuilder';
import queryConfig from './queryConfig/queryConfig';

function App() {
  return (
    <div className="App">
      <QueryBuilder queryConfig={queryConfig} />
    </div>
  );
}

export default App;
