import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from "./pages/main";
import Product from "./pages/product";
import Form from "./pages/form";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/products/create" component={Form} />
      <Route path="/products/edit/:id" component={Form} />
      <Route path="/products/:id" component={Product} />
    </Switch>
  </BrowserRouter>
);

export default Routes;