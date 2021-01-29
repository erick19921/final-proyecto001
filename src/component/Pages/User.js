import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

//import 'jspdf-autotable'


class User extends Component {
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
            activo: ''
        }
    }

    //const [usuario, setUsuario] = usestate(this.state)
    peticionGet = () => {
        axios.get('https://c-x-c-utn.herokuapp.com/usuario').then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPost = async () => {
        await axios.post('https://c-x-c-utn.herokuapp.com/usuario?cedula=' + this.state.form.cedula + '&nombre=' + this.state.form.nombre + '&apellido=' + this.state.form.apellido + '&nombre_usuario=' + this.state.form.nombre_usuario + '&contrasenia=' + this.state.form.contrasenia + '&tipo_usuario=' + this.state.form.tipo_usuario + '&fecha_nacimiento=' + this.state.form.fecha_nacimiento + '&ciudad_nacimiento=' + this.state.form.ciudad_nacimiento + '&direccion=' + this.state.form.direccion + '&telefono=' + this.state.form.telefono + '&email=' + this.state.form.email + '&activo=' + this.state.form.activo, this.state.form).then(response => {
                        this.modalInsertar();
                        this.peticionGet();
                    }).catch(error => {
                        console.log(error.message);
                    })
        /*const [usuario, setUsuario] = usestate(this.state)
        if ((usuario.cedula.trim()) && (usuario.nombre.trim()) && (usuario.apellido.trim()) && (usuario.nombre_usuario.trim()) && (usuario.contrasenia.trim()) && (usuario.ciudad_nacimiento.trim()) && (usuario.direccion.trim()) && (usuario.telefono.trim()) && (usuario.email.trim())) {
            if (this.validarCedula()) {
                if (this.validarEmail()) {
                    
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Correo Incorrecto', life: 3000 });
                }
            } else {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Cédula Incorrecta', life: 3000 });
            }
        } else {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Campo vacios', life: 3000 });
        }*/
    }


    peticionPut = () => {
        axios.put('https://c-x-c-utn.herokuapp.com/usuario?cedula=' + this.state.form.cedula + '&nombre=' + this.state.form.nombre + '&apellido=' + this.state.form.apellido + '&nombre_usuario=' + this.state.form.nombre_usuario + '&contrasenia=' + this.state.form.contrasenia + '&tipo_usuario=' + this.state.form.tipo_usuario + '&fecha_nacimiento=' + this.state.form.fecha_nacimiento + '&ciudad_nacimiento=' + this.state.form.ciudad_nacimiento + '&direccion=' + this.state.form.direccion + '&telefono=' + this.state.form.telefono + '&email=' + this.state.form.email + '&activo=' + this.state.form.activo, this.state.form).then(response => {
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
                activo: usuario.activo
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
/*
    validarCedula() {
        var cad = usuario.cedula.trim();
        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;

        if (cad !== "" && longitud === 10) {
            for (let i = 0; i < longcheck; i++) {
                if (i % 2 === 0) {
                    var aux = cad.charAt(i) * 2;
                    if (aux > 9) aux -= 9;
                    total += aux;
                } else {
                    total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                }
            }

            total = total % 10 ? 10 - total % 10 : 0;

            if (cad.charAt(longitud - 1) == total) {
                return true
            } else {
                return false
            }
        }
    }

    validarEmail() {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(compras.correo)) {
            return true
        } else {
            return false
        }
    }
    */
/*
    generarPDF = (rowData) => {
        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(20)
        doc.getStyle('normal', 'bold')
        doc.text(275, 40, 'Reporte Usuarios')
        var columns = ["Cedula", "Nombre", "Apellido", "Nombre Usuario", "Tipo Usuario", "Fecha Nacimiento", "Ciudad Nacimiento", "Dirección", "Teléfono", "Email"]
        for (let i = 0; i < rowData.usuario.length; i++) {
            data[i] = [rowData.usuario[i].cedula, rowData.usuario[i].nombre, rowData.usuario[i].apellido, rowData.usuario[i].nombre_usuario, rowData.usuario[i].tipo_usuario, rowData.usuario[i].fecha_nacimiento, rowData.usuario[i].ciudad_nacimiento, rowData.usuario[i].direccion, rowData.usuario[i].telefono, rowData.usuario[i].email]
        }
        doc.autoTable(columns, data,
            { margin: { top: 200 } }
        )
        doc.save('Lista usuarios.pdf')
    }
    */

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
                        <form action="" className="formulario" id="formulario">
                            <div className="form-group">
                                <label htmlFor="cedula_usuario">Cedula</label>
                                <input className="form-control" type="text" pattern="[0-9]{10}" maxLength="10" name="cedula" id="cedula" onChange={this.handleChange} value={form ? form.cedula : ''} required autoFocus />
                                <br />
                                <label htmlFor="nombre_usuario">Nombre</label>
                                <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} />
                                <br />
                                <label htmlFor="apellido_usuario">Apellido</label>
                                <input className="form-control" type="text" name="apellido" id="apellido" onChange={this.handleChange} value={form ? form.apellido : ''} />
                                <br />
                                <label htmlFor="nombre_us">Nombre Usuario</label>
                                <input className="form-control" type="text" name="nombre_usuario" id="nombre_usuario" onChange={this.handleChange} value={form ? form.nombre_usuario : ''} />
                                <br />
                                <label htmlFor="contrasenia_usuario">Contraseña</label>
                                <input className="form-control" type="password" name="contrasenia" id="contrasenia" onChange={this.handleChange} value={form ? form.contrasenia : ''} />
                                <br />
                                <label htmlFor="tipo_us">Tipo Usuario</label>
                                <select name="tipo_usuario" value={form ? form.tipo_usuario : ''} onChange={this.handleChange}>
                                    <option value="0">Seleccione el tipo de usuario:</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Cajero">Cajero</option>
                                </select>
                                <br />
                                <label htmlFor="fecha_nacimiento_usuario">Fecha Nacimiento</label>
                                <input className="form-control" type="date" name="fecha_nacimiento" id="fecha_nacimiento" onChange={this.handleChange.bind(this)} value={form ? form.fecha_nacimiento : ''} />
                                <br />
                                <label htmlFor="ciudad_nacimiento_usuario">Ciudad Nacimiento</label>
                                <input className="form-control" type="text" name="ciudad_nacimiento" id="ciudad_nacimiento" onChange={this.handleChange} value={form ? form.ciudad_nacimiento : ''} />
                                <br />
                                <label htmlFor="direccion_usuario">Direccion</label>
                                <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} value={form ? form.direccion : ''} />
                                <br />
                                <label htmlFor="telefono_usuario">Telefono</label>
                                <input className="form-control" type="tel" pattern="[0-9]" maxLength="10" name="telefono" id="telefono" onChange={this.handleChange} value={form ? form.telefono : ''} />
                                <br />
                                <label htmlFor="email_usuario">E-Mail</label>
                                <input className="form-control" type="email" name="email" id="email" onChange={this.handleChange} value={form ? form.email : ''} />
                                <br />
                                <label htmlFor="activo_usuario">Activo</label>
                                <select name="activo" value={form ? form.activo : ''} onChange={this.handleChange}>
                                    <option value="0">Seleccione el estado del usuaio:</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                        </form>
                        <script src="validacion.js"></script>
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

export default User