import './ItemDetailContainer';
import './ItemDetailContainer.css'
import { useEffect, useState } from 'react';
import { getProductoById } from '../../listaDeProductos';
import ItemDetail from '../ItemDetail/ItemDetail';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetailContainer = () => {

    const [producto, setProducto] = useState();

    const {productId} = useParams();

    useEffect(
        () => {
            axios.get(
                '/api/productos/detail', 
                {
                    params: {
                        id: productId
                    }
                }
            )
            .then(
                res => {
                    /* console.log(res.data); */
                    setProducto(res.data);
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
        }, [productId]
    )

    return (
        <div className="container-itemDetail">
            {
                producto ? <ItemDetail key={producto.id} {...producto}/> : <Loader />
            }
        </div>
    );
}
export default ItemDetailContainer;