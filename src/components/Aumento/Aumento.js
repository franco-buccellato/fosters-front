import './Aumento.css';
import { useContext, useState, useEffect} from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Aumento = () => {

    const {esAdministrador} = useContext(UsuarioContext);
    const [aumento, setAumento] = useState('');
    const [listaProductos, setListaProductos] = useState([]);
    const [seActualizo, setSeActualizo] = useState([]);

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
                setListaProductos(res.data);
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        )
        }, [seActualizo]
    )

    const realizarAumento = () => {
        listaProductos.forEach(
            unProducto => {
                if (!unProducto.nombre.toString().includes('EVA') && unProducto.precio !== '' && aumento !== undefined) {
                    let nuevoAumento = {
                        id: unProducto.id.toString(),
                        nuevoPrecio: (unProducto.precio * ((100 + parseInt(aumento))/100)).toFixed(2)
                    }
                    axios
                    .post('/api/productos/aumento', nuevoAumento)
                    .then(
                        res => {
                            handleShowOk();
                            console.log('Precio actualizado del id de preoducto: ' + unProducto.id + ' al precio ' + nuevoAumento.nuevoPrecio)
                        }
                    )
                    .catch(
                        err => {
                            console.log('Error:' + err.response.data);
                            handleShowError();
                        }
                    )
                }
            }
        )
        setSeActualizo('');
    }

        /* MODAL Ok*/
        const [showOk, setShowOk] = useState(false);
        const handleCloseOk = () => setShowOk(false);
        const handleShowOk = () => {
            setShowOk(true)
            setAumento('');
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
                            <Form.Label for='id'>Aumento:</Form.Label>
                            <Form.Control type="number" placeholder="Ingrese % de aumento" id="aumento" value={aumento} onChange={(e) => {setAumento(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="outline-success" onClick={() => realizarAumento()}>Aplicar Aumento</Button>
                    </Form>
                </div>
                <Modal show={showOk} onHide={handleCloseOk}>
                    <Modal.Header closeButton>
                    <Modal.Title>Carga exitosa!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>El aumento se impacto correctamente!</Modal.Body>
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
                    <Modal.Body>El aumento no pudo impactarse.<br></br>Intentelo nuevamente!</Modal.Body>
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
export default Aumento;