import './ItemDetail.css';
import Counter from '../Counter/Counter';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react'
import CartContext from '../Context/CartContext';
import ItemPrecioDetail from '../ItemPrecioDetail/ItemPrecioDetail';
import UsuarioContext from '../Context/UsuarioContext';

const ItemDetail = ({id, nombre, marca, modelos, codigoFabrica, precio, linkImagen, stock}) => {

    const { esClienteDirecto} = useContext(UsuarioContext);

    const {addItem} = useContext(CartContext);

    const [cantidad, setCantidad] = useState(0);

    const handleOnAdd = (nuevaCantidad) => {
        setCantidad(parseInt(nuevaCantidad));
        const precioDefinitivo = precio;
        const objProd = {
            id,
            nombre,
            codigoFabrica,
            precioDefinitivo,
            nuevaCantidad,
            linkImagen
        }
        addItem(objProd);
    }

    return (
        <div className="container-item-detail">
            <div className="product">
                <div className="product__photo">
                    <div className="photo-container">
                        <div className="photo-main">
                            <img src={linkImagen} alt="Imagen principal"></img>
                        </div>
                    </div>
                </div>
                <div className="product__info">
                    <div className="title">
                        <h1>{id}</h1>
                    </div>
                    <div className="title">
                        <span className='span-subtitulo'><u>Descripción:</u></span>
                        <span className='span-contenido'>{nombre}</span>
                    </div>
                    <div className="title">
                        <span className='span-subtitulo'><u>Marca:</u></span>
                        <span className='span-contenido'>{marca}</span>
                    </div>
                    <div className="price">
                        <u>Precio:</u> <ItemPrecioDetail precioProducto={precio}></ItemPrecioDetail>
                    </div>
                    <div className="title">
                        <span className='span-subtitulo'><u>Modelos:</u></span>
                        <div className="variant">
                            <ul className='variant-list'>
                                {
                                    modelos.map(
                                        (unModelo, index)=> {return <li key={index}>{unModelo}</li>}
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    {
                        codigoFabrica !== '' 
                        && 
                        <div className="title">
                            <span className='span-subtitulo'><u>Código SKF o INA:</u></span>
                            <span className='span-contenido'>{codigoFabrica}</span>
                        </div>
                    }
                    
                    <br></br>
                    {   
                        esClienteDirecto() &&           
                        <Counter inicial={1} maximoStock={stock} onAdd={handleOnAdd}/>
                    }
                    {(cantidad > 0) && <Link className='boton-carrito' to ={`/carrito`}>Ir al Carrito</Link>}
                    {(cantidad > 0) && <Link className='boton-carrito' to ={`/productos`}>Seguir comprando</Link>}
                </div>
            </div>
        </div>
    );
}
export default ItemDetail;