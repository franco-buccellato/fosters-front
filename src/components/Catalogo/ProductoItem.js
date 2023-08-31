import './ProductoItem.css';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const ProductoItem = ({producto}) => {

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [rubro, setRubro] = useState('');
    const [codigoFabrica, setCodigoFabrica] = useState('');
    const [tipoModificacion, setTipoModificacion] = useState('');
    const [marca, setMarca] = useState('');
    const [modelos, setModelos] = useState('');
    const [linkImagen, setLinkImagen] = useState('');

    /* MODAL Editar*/
    const [showEditar, setShowEditar] = useState(false);
    const handleCloseEditar = () => setShowEditar(false);
    const handleShowEditar = () => setShowEditar(true);
    /* MODAL Ok Editar*/
    const [showOkEditar, setShowOkEditar] = useState(false);
    const handleCloseOkEditar = () => setShowOkEditar(false);
    const handleShowOkEditar = () => setShowOkEditar(true);
    /* MODAL Eiminar*/
    const [showEliminar, setShowEliminar] = useState(false);
    const handleCloseEliminar = () => setShowEliminar(false);
    const handleShowEliminar = () => setShowEliminar(true);
    /* MODAL Ok Eiminar*/
    const [showOkEliminar, setShowOkEliminar] = useState(false);
    const handleCloseOkEliminar = () => setShowOkEliminar(false);
    const handleShowOkEliminar = () => setShowOkEliminar(true);
    /* MODAL Fallida*/
    const [showFallida, setShowFallida] = useState(false);
    const handleCloseFallida = () => setShowFallida(false);
    const handleShowFallida= () => setShowFallida(true);

    const editarProducto = (producto) => {
        console.log('Editar producto: ' + producto.nombre);
        handleShowEditar();
    }
    const eliminarProducto = (producto) => {
        console.log('Eliminar producto: ' + producto.nombre);
        handleShowEliminar();
    }

    //Guardar nuevos datos del producto
    const guardarNuevoProducto = (producto) => {
        console.log('Modificar producto: ' + producto.id + ' - '  + producto.nombre);
        handleCloseEditar();
        const productoActualizado = {
            id: id !== '' ? id : producto.id,
            nombre: nombre !== '' ? nombre : producto.nombre,
            precio: precio !== '' ? precio : producto.precio,
            rubro: rubro !== '' ? rubro : producto.rubro,
            codigoFabrica: codigoFabrica !== '' ? codigoFabrica : producto.codigoFabrica,
            tipoModificacion: tipoModificacion !== '' ? tipoModificacion : producto.tipoModificacion,
            modelos: modelos !== '' ? modelos : producto.modelos,
            linkImagen: linkImagen !== '' ? linkImagen : producto.linkImagen
        };
        axios.post('/api/productos/actualizar', productoActualizado)
            .then(
                res => {
                    console.log('Modificación correcta: ' + res);
                    handleShowOkEditar();
                }
            )
            .catch(
                err => {
                    console.log('Error:' + err);
                    handleShowFallida();
                }
            )
        }

        
    //Eliminar usuairo definitivamente
    const elimnarProductoDefinitivo = (producto) => {
        console.log('Eliminar producto: ' + producto.nombre);
        handleCloseEliminar();
        axios.post('/api/productos/eliminar', producto)
            .then(
                res => {
                    console.log('Eliminado correctamente: ' + res);
                    handleShowOkEliminar();
                }
            )
            .catch(
                err => {
                    console.log('Error:' + err);
                    handleShowFallida();
                }
            )

    }

    return (
        <tr>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>{producto.precio}</td>
            <td>{producto.rubro}</td>
            <td>{producto.codigoFabrica}</td>
            <td>{producto.tipoModificacion}</td>
            <td>{producto.marca}</td>
            <td>{producto.modelos}</td>
            <td>{producto.linkImagen}</td>
            <td><ion-icon name="create-outline" onClick={() => editarProducto(producto)}></ion-icon></td>
            <td><ion-icon name="trash-outline" onClick={() => eliminarProducto(producto)}></ion-icon></td>
            {/* Modales */}
            <Modal show={showEditar} onHide={handleCloseEditar}>
                <Modal.Header closeButton>
                <Modal.Title>Modificar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label for='id'>Nuevo ID:</Form.Label>
                            <Form.Control type="text" placeholder={producto.id} id="id" value={id} onChange={(e) => {setId(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='nombre'>Nombre:</Form.Label>
                            <Form.Control type="text" placeholder={producto.nombre}  id="nombre" value={nombre} onChange={(e) => {setNombre(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='precio'>Precio:</Form.Label>
                            <Form.Control type="number" placeholder={producto.precio}  id="precio" value={precio} onChange={(e) => {setPrecio(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='rubro'>Rubro:</Form.Label>
                            <Form.Control type="text" placeholder={producto.rubro} id="rubro" value={rubro} onChange={(e) => {setRubro(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='codigoFabrica'>Código Fabrica:</Form.Label>
                            <Form.Control type="text" placeholder={producto.codigoFabrica} id="codigoFabrica" value={codigoFabrica} onChange={(e) => {setCodigoFabrica(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='tipoModificacion'>Tipo de Modificación:</Form.Label>
                            <Form.Control type="text" placeholder={producto.tipoModificacion} id="tipoModificacion" value={tipoModificacion} onChange={(e) => {setTipoModificacion(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='marca'>Marca:</Form.Label>
                            <Form.Control type="text" placeholder={producto.marca} id="marca" value={marca} onChange={(e) => {setMarca(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='modelos'>Modelos:</Form.Label>
                            <Form.Control type="text" placeholder={producto.modelos} id="modelos" value={modelos} onChange={(e) => {setModelos(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label for='linkImagen'>Link:</Form.Label>
                            <Form.Control type="text" placeholder={producto.linkImagen} id="linkImagen" value={linkImagen} onChange={(e) => {setLinkImagen(e.target.value)}}/>
                        </Form.Group> 
                        <Button variant="outline-success" onClick={() => guardarNuevoProducto(producto)}>Editar Producto</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditar}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showOkEditar} onHide={handleCloseOkEditar}>
                <Modal.Header closeButton>
                <Modal.Title>Operación exitosa!</Modal.Title>
                </Modal.Header>
                <Modal.Body>El producto fue modificado correctamente.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseOkEditar}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEliminar} onHide={handleCloseEliminar}>
                <Modal.Header closeButton>
                <Modal.Title>Eliminar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Esta seguro que desea elimnar el producto {producto.nombre}?</Modal.Body>
                <Modal.Footer>
                <Button variant="outline-danger" onClick={() => elimnarProductoDefinitivo(producto)}>Eliminar Producto</Button>
                <Button variant="secondary" onClick={handleCloseEliminar}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showOkEliminar} onHide={handleCloseOkEliminar}>
                <Modal.Header closeButton>
                <Modal.Title>Operación exitosa!</Modal.Title>
                </Modal.Header>
                <Modal.Body>El producto fue eliminado correctamente.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseOkEliminar}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showFallida} onHide={handleCloseFallida}>
                <Modal.Header closeButton>
                <Modal.Title>Operación fallida!</Modal.Title>
                </Modal.Header>
                <Modal.Body>La operación falló, vuelva a intentarlo.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseFallida}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </tr>
    );
}
export default ProductoItem;