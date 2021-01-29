import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { extend } from 'jquery';

const url="https://c-x-c-utn.herokuapp.com/pago";
const url2="https://fac-utn.herokuapp.com/factura";


class PagosCliente extends React.Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id_pago_cliente: '',
    id_factura: '',
    codigo_pago: '',
    descripcion: '',
    numero_cuenta: '',
    valor_pago: '',
    valor_factura:''
  }
}

peticionGet=()=>{
  axios.get(url).then(response=>{
    this.setState({data: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
  }

peticionPost=async()=>{
   await axios.post('https://c-x-c-utn.herokuapp.com/pago?id_pago_cliente='+this.state.form.id_pago_cliente+'&id_factura='+this.state.form.id_factura+'&codigo_pago='+this.state.form.codigo_pago+'&descripcion='+this.state.form.descripcion+'&numero_cuenta='+this.state.form.numero_cuenta+'&valor_pago='+this.state.form.valor_pago+'&valor_factura='+this.state.form.valor_factura,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put('https://c-x-c-utn.herokuapp.com/pago?id_pago_cliente='+this.state.form.id_pago_cliente+'&id_factura='+this.state.form.id_factura+'&codigo_pago='+this.state.form.codigo_pago+'&descripcion='+this.state.form.descripcion+'&numero_cuenta='+this.state.form.numero_cuenta+'&valor_pago='+this.state.form.valor_pago+'&valor_factura='+this.state.form.valor_factura,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
  axios.delete('https://c-x-c-utn.herokuapp.com/pago?id_pago_cliente='+this.state.form.id_pago_cliente).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarCxc=(cxc)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id_pago_cliente: cxc.id_pago_cliente,
      id_factura: cxc.id_factura,
      codigo_pago: cxc.codigo_pago,
      descripcion: cxc.descripcion,
      numero_cuenta: cxc.numero_cuenta,
      valor_pago: cxc.valor_pago,
      valor_factura : cxc.valor_factura

    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();

  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="PagosCliente">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar CXC</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>ID Pago Cliente</th>
          <th>ID Factura</th>
          <th>Codigo de pago</th>
          <th>Descripcion</th>
          <th>Numero de cuenta</th>
          <th>Valor de pago</th>
          <th>Valor de la factura</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(cxc=>{
          return(
            <tr>
          <td>{cxc.id_pago_cliente}</td>
          <td>{cxc.id_factura}</td>
          <td>{cxc.codigo_pago}</td>
          <td>{cxc.descripcion}</td>
          <td>{cxc.numero_cuenta}</td>
          <td>{cxc.valor_pago}</td>
          <td>{cxc.valor_factura}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarCxc(cxc); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarCxc(cxc); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id_pago_cliente">ID Pago Cliente</label>
                    <input className="form-control" type="text" name="id_pago_cliente" id="id_pago_cliente" onChange={this.handleChange} value={form?form.id_pago_cliente: ''}/>
                    <br />
                    <label htmlFor="id_factura">ID Factura</label>
                    <input className="form-control" type="text" name="id_factura" id="id_factura" onChange={this.handleChange} value={form?form.id_factura: ''}/>
                    <br />
                    <label htmlFor="codigo_pago">Codigo de pago</label>
                    <input className="form-control" type="text" name="codigo_pago" id="codigo_pago" onChange={this.handleChange} value={form?form.codigo_pago:''}/>
                    <br />
                    <label htmlFor="descripcion">Descripcion</label>
                    <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} value={form?form.descripcion: ''}/>
                    <br />
                    <label htmlFor="numero_cuenta">Numero de cuenta</label>
                    <input className="form-control" type="text" name="numero_cuenta" id="numero_cuenta" onChange={this.handleChange} value={form?form.numero_cuenta:''}/>
                    <br />
                    <label htmlFor="valor_pago">Valor de pago</label>
                    <input className="form-control" type="text" name="valor_pago" id="valor_pago" onChange={this.handleChange} value={form?form.cvalor_pago: ''}/>
                    <br />   
                    <label htmlFor="valor_factura">Valor de la factura</label>
                    <input className="form-control" type="text" name="valor_factura" id="valor_factura" onChange={this.handleChange} value={form?form.valor_factura: ''}/>
                    <br />                    
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar el registro de pago {form && form.codigo_pago} ?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>

  );
}
}
export default PagosCliente;
