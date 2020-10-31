import React from 'react';
import './App.css';
import QueryBuilder from './components/QueryBuilder';
import queryConfig from './queryConfig/queryConfig';

function App() {
  console.log("hey");
  return (
    <div className="App">
      <QueryBuilder queryConfig={queryConfig} />
    </div>
  );
}

export default App;
