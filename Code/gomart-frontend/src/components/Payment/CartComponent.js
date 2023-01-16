import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./PaymentCss.css";
import { Link } from 'react-router-dom';

const CartComponent = () => {

    const [cartProduct, setCartProduct] = useState([]);
    console.log(cartProduct);
    
    const fetchData = async () => {
        const product = await axios.get("http://localhost:8000/api/customerCart/getAll");
        setCartProduct(product.data);
    }
    useEffect(() => {
        fetchData();
        // console.log(cartProduct);
    }, []);

    const increase = async (id) => {
        await axios.get(`http://localhost:8000/api/customerCart/increase/${id}`);
        window.location.reload(false);
    }

    const decrease = async (id) => {
        await axios.get(`http://localhost:8000/api/customerCart/decrease/${id}`);
        window.location.reload(false);
    }
    
    const deleteProd = async (id) => {
        await axios.delete(`http://localhost:8000/api/customerCart/deleteProd/${id}`);
        window.location.reload(false);
    }
    return (
        <div className='mt-5'>
            <h1 className='container'>Cart</h1>
            <div className='container'>
                <table class="table">
                    <thead>
                        <tr className='table-dark'>
                        <th scope="col">id</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Unit Price(Rs.)</th>
                        <th scope="col">Quentity</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartProduct.map((element, id) => {
                                return (
                        <tr>
                        <th scope="row">{id + 1}</th>
                            <td>{element.name}</td>
                            <td>{element.price}</td>
                            <td>{element.buyingQty}</td>
                            <td className='d-flex justify-content-between'>
                                <button className='btn btn-primary' onClick={() => increase(element._id)}><i class="fa-solid fa-plus"></i></button>
                                <button className='btn btn-primary' onClick={() => decrease(element._id)}><i class="fa-solid fa-minus"></i></button>
                                <button className='btn btn-danger' onClick={() => deleteProd(element._id)}><i class="fa-solid fa-xmark"></i></button>
                            </td>
                        </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className='add_btn mt-2'>
                    <Link to={`/store/order/store-order-create-cart`}>
                    <button className='btn btn-primary' ><a className='link' navigate>Proceed To Pay  <i class="fa-solid fa-arrow-right"></i></a></button></Link>
                </div>
            </div>
        </div>
    )
}

export default CartComponent