import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AllProductsPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
      </Switch>
    </Router>
  );
}

export default App;
