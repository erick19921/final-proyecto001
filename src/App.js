import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './component/Navbar/Navbar';
import Home from './component/Pages/Home';
import User from './component/Pages/User';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import CajeroList from './component/Pages/listCajeros';
import PagoCliente from './component/Pages/PagosCliente';
import TipoPago from './component/Pages/TipoPago';
import Factura from './component/Pages/Factura';

class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />
        <div className="container-fluid">
          <Route exact path='/admin' component={Home} />
          <Route exact path='/admin/user' component={User} />
          <Route exact path='/admin/listCajeros' component={CajeroList} />
          <Route exact path='/admin/TipoPago' component={TipoPago} />
          <Route exact path='/admin/PagosCliente' component={PagoCliente} />
          <Route exact path='/admin/Facturas' component={Factura} />
        </div>
      </Router>
    )
  }
}

export default App;
