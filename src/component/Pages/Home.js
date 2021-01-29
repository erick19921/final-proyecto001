import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <div className="col-md-4 mx-auto">
                <div className="card" >
                    <div className="card-body">
                        <h5 class="card-title">Usuarios</h5>
                        <p class="card-text">Crear y ver lista de usuarios registrados.</p>
                        <Link classNameName="btn btn-primary mt-2 btn-block" to="/admin/user" role="Button">Usuarios</Link>
                    </div>
                </div>
                <div className="card" >
                    <div className="card-body">
                        <h5 class="card-title">Lista Cajeros</h5>
                        <p class="card-text">Crear y ver lista de cajeros registrados.</p>
                        <Link classNameName="btn btn-primary mt-2 btn-block" to="/admin/listCajeros" role="Button">Lista Cajeros</Link>
                    </div>
                </div>
                <div className="card" >
                    <div className="card-body">
                        <h5 class="card-title">Tipo Pagos</h5>
                        <p class="card-text">Crear y ver lista de tipo pagos.</p>
                        <Link classNameName="btn btn-primary mt-2 btn-block" to="/admin/TipoPago" role="Button">Tipo Pagos</Link>
                    </div>
                </div>
                <div className="card" >
                    <div className="card-body">
                        <h5 class="card-title">Pagos Clientes</h5>
                        <p class="card-text">Crear y ver lista de Pagos clientes.</p>
                        <Link classNameName="btn btn-primary mt-2 btn-block" to="/admin/PagosCliente" role="Button">Pagos Clientes</Link>
                    </div>
                </div>
                <div className="card" >
                    <div className="card-body">
                        <h5 class="card-title">Facturas</h5>
                        <p class="card-text">Ver las facturas de clientes.</p>
                        <Link classNameName="btn btn-primary mt-2 btn-block" to="/admin/Facturas" role="Button">Facturas</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;