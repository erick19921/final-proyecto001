import React, { Component } from "react";
import { Link } from 'react-router-dom'

class Navigation extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/admin">Administrador</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/admin">Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/user">Usuarios</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/listCajeros">Lista Cajeros</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/TipoPago">Tipo Pagos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/PagosCliente">Pagos Clientes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/Facturas">Facturas</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
} 

export default Navigation;