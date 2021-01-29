import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="https://c-x-c-utn.herokuapp.com/TipoPago";

class TipoPago extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    codigo_pago: '',
    nombre_tp: '',
    estado: ''
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
   await axios.post('https://c-x-c-utn.herokuapp.com/TipoPago?codigo_pago='+this.state.form.codigo_pago+'&nombre_tp='+this.state.form.nombre_tp+'&estado='+this.state.form.estado,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put('https://c-x-c-utn.herokuapp.com/TipoPago?codigo_pago='+this.state.form.codigo_pago+'&nombre_tp='+this.state.form.nombre_tp+'&estado='+this.state.form.estado,this.state.form,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
  axios.delete('https://c-x-c-utn.herokuapp.com/TipoPago?codigo_pago='+this.state.form.codigo_pago).then(response=>{
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
      codigo_pago: cxc.codigo_pago,
      nombre_tp: cxc.nombre_tp,
      estado: cxc.estado
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
    <div className="TipoPago">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar CXC</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>Codigo de pago</th>
          <th>Nombre</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(cxc=>{
          return(
            <tr>
          <td>{cxc.codigo_pago}</td>
          <td>{cxc.nombre_tp}</td>
          <td>{cxc.estado}</td>
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
                    <label htmlFor="id_pago_cliente">CODIGO</label>
                    <input className="form-control" type="text" name="codigo_pago" id="codigo_pago" onChange={this.handleChange} value={form?form.codigo_pago: ''}/>
                    <br />
                    <label htmlFor="nombre_tp">NOMBRE</label>
                    <input className="form-control" type="text" name="nombre_tp" id="nombre_tp" onChange={this.handleChange} value={form?form.nombre_tp: ''}/>
                    <br />
                    <label htmlFor="estado">ESTADO</label>
                            <select name="estado" value={form ? form.estado : ''} onChange={this.handleChange}>
                            <option value="-">Seleccione</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
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
               Estás seguro que deseas eliminar el registro de pago {form && form.codigo_pago}
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
export default TipoPago;