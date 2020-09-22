import React from 'react';
import ProductList from './ProductList';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="ui container">
          <h1 className="header">My Warehouse</h1>
          <ProductList />
          <footer></footer>
        </div>
      </div>
    );
  }
}

export default App;