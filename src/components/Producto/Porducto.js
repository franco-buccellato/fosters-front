import './Producto.css';
import { useContext, useEffect, useState} from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import uniqid from 'uniqid';
import axios from 'axios';

const Producto = () => {

    const {esAdministrador} = useContext(UsuarioContext);
    const [tablaProductos, setTablaProductos] = useState();

    useEffect( 
        () => {
        axios.get(
            '/api/productos/', 
            {
                params: {
                }
            }
        )
        .then(
            res => {
                console.log(res.data);
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        )
        }, [tablaProductos]
    )

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [rubro, setRubro] = useState('');
    const [codigoFabrica, setCodigoFabrica] = useState('');
    const [tipoModificacion, setTipoModificacion] = useState('');
    const [marca, setMarca] = useState('');
    const [modelos, setModelos] = useState('');
    const [linkImagen, setLinkImagen] = useState('');

    const agregarProducto = () => {
        let nuevoProducto = {
            id: id,
            nombre: nombre,
            precio: precio,
            rubro: rubro,
            codigoFabrica: codigoFabrica,
            tipoModificacion: tipoModificacion,
            marca: marca,
            modelos: modelos,
            linkImagen: linkImagen,
            _id: uniqid()
        }
        console.log(nuevoProducto);
        
        axios.post('/api/productos/nuevo', nuevoProducto)
            .then(
                res => {
                    handleShowOk();
                    setTablaProductos(1);
                }
            )
            .catch(
                err => {
                    console.log('Error:' + err);
                    handleShowError();
                }
            )
    }

        /* MODAL Ok*/
        const [showOk, setShowOk] = useState(false);
        const handleCloseOk = () => setShowOk(false);
        const handleShowOk = () => {
            setShowOk(true)
            setNombre('');
            setPrecio('');
            setRubro('');
            setCodigoFabrica('');
            setTipoModificacion('');
            setMarca('');
            setModelos('');
            setLinkImagen('');
        };
        /* MODAL Error*/
        const [showError, setShowError] = useState(false);
        const handleCloseError = () => setShowError(false);
        const handleShowError = () => setShowError(true);

    if(esAdministrador()) {
        return (
            <div className='container-productos'>
                <div className="container-usuarios">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label for='id'>Nuevo ID:</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese nuevo ID" id="id" value={id} onChange={(e) => {setId(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='nombre'>Nombre:</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" id="nombre" value={nombre} onChange={(e) => {setNombre(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='precio'>Precio:</Form.Label>
                            <Form.Control type="number" placeholder="Precio" id="precio" value={precio} onChange={(e) => {setPrecio(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='rubro'>Rubro:</Form.Label>
                            <Form.Control type="text" placeholder="Rubro" id="rubro" value={rubro} onChange={(e) => {setRubro(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='codigoFabrica'>Código Fabrica:</Form.Label>
                            <Form.Control type="text" placeholder="Codigo Fabrica" id="codigoFabrica" value={codigoFabrica} onChange={(e) => {setCodigoFabrica(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='tipoModificacion'>Tipo de Modificación:</Form.Label>
                            <Form.Control type="text" placeholder="Tipo de Modificacion" id="tipoModificacion" value={tipoModificacion} onChange={(e) => {setTipoModificacion(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='marca'>Marca:</Form.Label>
                            <Form.Control type="text" placeholder="Marca" id="marca" value={marca} onChange={(e) => {setMarca(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='modelos'>Modelos:</Form.Label>
                            <Form.Control type="text" placeholder="Modelos" id="modelos" value={modelos} onChange={(e) => {setModelos(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label for='linkImagen'>Link:</Form.Label>
                            <Form.Control type="text" placeholder="Link genereado en el Excel" id="linkImagen" value={linkImagen} onChange={(e) => {setLinkImagen(e.target.value)}}/>
                        </Form.Group> 
                        <Button variant="outline-success" onClick={() => agregarProducto()}>Agregar Producto</Button>
                    </Form>
                </div>
                <Modal show={showOk} onHide={handleCloseOk}>
                    <Modal.Header closeButton>
                    <Modal.Title>Carga exitosa!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>El producto fue creado correctamente</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseOk}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showError} onHide={handleCloseError}>
                    <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>El producto no se pudo crear.<br></br>Intentelo nuevamente!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseError}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    } 
}
export default Producto;