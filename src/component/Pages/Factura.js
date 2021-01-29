import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url="https://c-x-c-utn.herokuapp.com/factura/";

class Factura extends Component {
  state = {
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id_factura: '',
      cedula_cli: '',
      nombre_cli: '',
      apellido_cli: '',
      detalle_fac: '',
      valor_total: '',
      tipoModal: ''

    }
  }

  peticionGet = () => {
    axios.get(url).then(response => {
      this.setState({ data: response.data });
      console.log(response.data)
    }).catch(error => {
      console.log(error.message)
    })
  }

  peticionDelete=()=>{
    axios.delete('https://c-x-c-utn.herokuapp.com/factura?id_factura='+this.state.form.id_factura).then(response=>{
      this.setState({modalEliminar:false});
      this.peticionGet();
    })
  }
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  seleccionarFactura = (factura) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id_factura: factura.id_factura,
        cedula_cli: factura.cedula_cli,
        nombre_cli: factura.nombre_cli,
        apellido_cli: factura.apellido_cli,
        detalle_fac: factura.detalle_fac,
        valor_total: factura.valor_total
      }
    })
  }

  handleChange = async e=> {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }

  componentDidMount() {
    this.peticionGet();

  }

  render() {
    const {form} = this.state;
    return (
      <div className="App">
        <br />
        <h1>FACTURAS</h1>
        
        <br /><br />
        <table class="table table-bordered border-dark">
          <thead class>
            <tr>
              <th>ID Factura</th>
              <th >Cedula Cliente</th>
              <th >Nombre Cliente</th>
              <th >Apellido Cliente</th>
              <th >Detalle Factura</th>
              <th >Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(factura => {
              return (
                <tr>
                  <td>{factura.id_factura}</td>
                  <td>{factura.cedula_cli}</td>
                  <td>{factura.nombre_cli}</td>
                  <td>{factura.apellido_cli}</td>
                  <td>{factura.detalle_fac}</td>
                  <td>{factura.valor_total}</td>
                  <td>
                   
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarFactura(factura);this.setState({modalEliminar:true})}}><FontAwesomeIcon icon={faTrashAlt}/>Eliminar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="id_factura">ID Factura</label>
              <input className="form-control" type="text" name="id_factura" id="id_factura" onChange={this.handleChange} value={form ? form.id_factura :''} />
              <br />
              <label htmlFor="cedula_cli">Cedula Cliente</label>
              <input className="form-control" type="text" name="cedula_cli" id="cedula_cli" onChange={this.handleChange} value={form ? form.cedula_cli: ''} />
              <br />
              <label htmlFor="nombre_cli">Nombre Cliente</label>
              <input className="form-control" type="text" name="nombre_cli" id="nombre_cli" onChange={this.handleChange} value={form ? form.nombre_cli : ''} />
              <br />
              <label htmlFor="apellido_cli">Apellido Cliente</label>
              <input className="form-control" type="text" name="apellido_cli" id="apellido_cli" onChange={this.handleChange} value={form ? form.apellido_cli : ''} />
              <br />
              <label htmlFor="detalle_fac">Detalle Factura</label>
              <input className="form-control" type="text" name="detalle_fac" id="detalle_fac" onChange={this.handleChange} value={form ? form.detalle_fac : ''} />
              <br />
              <label htmlFor="valor_total">Valor Total</label>
              <input className="form-control" type="text" name="valor_total" id="valor_total" onChange={this.handleChange} value={form ? form.valor_total : ''} />
            </div>
          </ModalBody>

          
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            EstÃ¡s seguro que deseas eliminar la factura{form && form.id_factura}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>SÃ­</button>
            <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar:false})}>No</button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default Factura;