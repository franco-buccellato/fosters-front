import './Catalogo.css';
import { useContext, useEffect, useState} from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import Table from 'react-bootstrap/Table';
import ProductoItem from './ProductoItem';
import axios from 'axios';

const Catalogo = () => {

    const {esAdministrador} = useContext(UsuarioContext);
    const [listaProductos, setListaProductos] = useState([]);
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
                setListaProductos(res.data);
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        )
        }, [tablaProductos]
    )

    //Armar lista de usuario
    const tablaDeProductos = listaProductos.map(
        unProducto => {
            return (
                <ProductoItem producto={unProducto}/>
            )
        }
    )

    if(esAdministrador()) {
        return (
            <div className='container-productos'>
                <div className="container-tabla-productos">
                    <h1 className='titulo-tabla-productos'>Listado de Productos</h1>
                    <Table striped="columns">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Rubro</th>
                                <th>Código Fábrica</th>
                                <th>Tipo Modificación</th>
                                <th>Marca</th>
                                <th>Modelos</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tablaDeProductos}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    } 
}
export default Catalogo;