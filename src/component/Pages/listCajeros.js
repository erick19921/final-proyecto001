import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class CajeroList extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            cedula: '',
            nombre: '',
            apellido: '',
            nombre_usuario: '',
            contrasenia: '',
            tipo_usuario: '',
            fecha_nacimiento: '',
            ciudad_nacimiento: '',
            direccion: '',
            telefono: '',
            email: '',
            activo: '',
        }
    }
    peticionGet = () => {
        axios.get('https://c-x-c-utn.herokuapp.com/usuario/Cajero').then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPost = async () => {
        await axios.post('https://c-x-c-utn.herokuapp.com/usuario?cedula='+this.state.form.cedula+'&nombre='+this.state.form.nombre+'&apellido='+this.state.form.apellido+'&nombre_usuario='+this.state.form.nombre_usuario+'&contrasenia='+this.state.form.contrasenia+'&tipo_usuario='+this.state.form.tipo_usuario+'&fecha_nacimiento='+this.state.form.fecha_nacimiento+'&ciudad_nacimiento='+this.state.form.ciudad_nacimiento+'&direccion='+this.state.form.direccion+'&telefono='+this.state.form.telefono+'&email='+this.state.form.email+'&activo='+this.state.form.activo, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPut = () => {
        axios.put('https://c-x-c-utn.herokuapp.com/usuario?cedula='+this.state.form.cedula+'&nombre='+this.state.form.nombre+'&apellido='+this.state.form.apellido+'&nombre_usuario='+this.state.form.nombre_usuario+'&contrasenia='+this.state.form.contrasenia+'&tipo_usuario='+this.state.form.tipo_usuario+'&fecha_nacimiento='+this.state.form.fecha_nacimiento+'&ciudad_nacimiento='+this.state.form.ciudad_nacimiento+'&direccion='+this.state.form.direccion+'&telefono='+this.state.form.telefono+'&email='+this.state.form.email+'&activo='+this.state.form.activo, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        })
    }

    peticionDelete = () => {
        axios.delete('https://c-x-c-utn.herokuapp.com/usuario?cedula=' + this.state.form.cedula).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    seleccionarUsuario = (usuario) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                cedula: usuario.cedula,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                nombre_usuario: usuario.nombre_usuario,
                contrasenia: usuario.contrasenia,
                tipo_usuario: usuario.tipo_usuario,
                fecha_nacimiento: usuario.fecha_nacimiento,
                ciudad_nacimiento: usuario.ciudad_nacimiento,
                direccion: usuario.direccion,
                telefono: usuario.telefono,
                email: usuario.email,
                activo: usuario.activo,
            }
        })
    }


    handleChange = async e => {
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
        const { form } = this.state;
        return (
            
            <div className="App">
                <br /><br /><br />
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Usuario</button>
                <br /><br />
                <table className="table ">
                    <thead>
                        <tr>
                            <th>Cédula</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Nombre Usuario</th>
                            <th>Tipo Usuario</th>
                            <th>Fecha Nacimiento</th>
                            <th>Ciudad Nacimiento</th>
                            <th>Direccion</th>
                            <th>Telefono</th>
                            <th>Email</th>
                            <th>Activo</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(usuario => {
                            return (
                                <tr>
                                    <td>{usuario.cedula}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellido}</td>
                                    <td>{usuario.nombre_usuario}</td>
                                    <td>{usuario.tipo_usuario}</td>
                                    <td>{usuario.fecha_nacimiento}</td>
                                    <td>{usuario.ciudad_nacimiento}</td>
                                    <td>{usuario.direccion}</td>
                                    <td>{usuario.telefono}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.activo}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => { this.seleccionarUsuario(usuario); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={() => { this.seleccionarUsuario(usuario); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                            <label htmlFor="id">Cedula</label>
                            <input className="form-control" type="text" pattern="[0-9]{10}" maxLength="10" name="cedula" id="cedula" onChange={this.handleChange} value={form ? form.cedula : ''} />
                            <br />
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} />
                            <br />
                            <label htmlFor="apellido">Apellido</label>
                            <input className="form-control" type="text" name="apellido" id="apellido" onChange={this.handleChange} value={form ? form.apellido : ''} />
                            <br />
                            <label htmlFor="nombre_usuario">Nombre Usuario</label>
                            <input className="form-control" type="text" name="nombre_usuario" id="nombre_usuario" onChange={this.handleChange} value={form ? form.nombre_usuario : ''} />
                            <br />
                            <label htmlFor="contrasenia">Contraseña</label>
                            <input className="form-control" type="password" name="contrasenia" id="contrasenia" onChange={this.handleChange} value={form ? form.contrasenia : ''} />
                            <br />
                            <label htmlFor="tipo_usuario">Tipo Usuario</label>
                            <select name="tipo_usuario" value={form ? form.tipo_usuario : ''} onChange={this.handleChange}>
                                <option value="Cajero">Cajero</option>
                            </select>
                            <br />
                            <label htmlFor="fecha_nacimiento">Fecha Nacimiento</label>
                            <input className="form-control" type="date" name="fecha_nacimiento" id="fecha_nacimiento" onChange={this.handleChange.bind(this)} value={form ? form.fecha_nacimiento : ''} />
                            <br />
                            <label htmlFor="ciudad_nacimiento">Ciudad Nacimiento</label>
                            <input className="form-control" type="text" name="ciudad_nacimiento" id="ciudad_nacimiento" onChange={this.handleChange} value={form ? form.ciudad_nacimiento : ''} />
                            <br />
                            <label htmlFor="direccion">Direccion</label>
                            <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} value={form ? form.direccion : ''} />
                            <br />
                            <label htmlFor="telefono">Telefono</label>
                            <input className="form-control" type="tel" pattern="[0-9]{10}" maxLength="10" name="telefono" id="telefono" onChange={this.handleChange} value={form ? form.telefono : ''} />
                            <br />
                            <label htmlFor="email">E-Mail</label>
                            <input className="form-control" type="email" name="email" id="email" onChange={this.handleChange} value={form ? form.email : ''} />
                            <br />
                            <label htmlFor="activo">Activo</label>
                            <select name="activo" value={form ? form.activo : ''} onChange={this.handleChange}>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                            <br />
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        {this.state.tipoModal === 'insertar' ?
                            <button className="btn btn-success" onClick={() => this.peticionPost()}>
                                Insertar
                      </button> : <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                                Actualizar
                      </button>
                        }
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estás seguro que deseas eliminar este Usuario {form && form.nombre}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </div>



        );
    }
}

export default CajeroList