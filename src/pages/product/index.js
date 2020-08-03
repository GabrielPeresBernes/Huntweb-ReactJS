import React, { useState, useEffect } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { alerts } from '../../utils';
import { api } from "../../services";

import "./styles.css";

function Product() {
  const [product, setProduct] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  const deleteProduct = async () => {
    try {
      await api.delete(`/products/${id}`);
      setRedirect(true);
      alerts();
      return <Redirect to="/" />
    } catch (error) {
      alerts(error);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        alerts(error);
      }
    };
    loadProduct();
  }, [id])

  return (
    <div className="product-info">
      { redirect ? <Redirect to={"/"} /> : "" }
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>
        URL: <a href={product.url} target="_blank" rel="noopener noreferrer" >{product.url}</a>
      </p>
      <div className="actions">
        <Link className="action" to={`/products/edit/${id}`}> Editar </Link>
        <button onClick={deleteProduct} className="action"> Excluir </button>
      </div>
    </div>
  )
}

export default Product;