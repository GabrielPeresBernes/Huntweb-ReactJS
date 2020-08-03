import React, { useState, useEffect } from "react";
import { useParams, Redirect } from 'react-router-dom';
import { api } from "../../services";
import { alerts } from "../../utils";
import "./styles.css";

function Form() {
  const [product, setProduct] = useState({});
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  const saveProduct = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await api.put(`/products/${id}`, product);
        setRedirect(true);
      } else {
        await api.post("/products", product);
        setProduct({});
      }
      alerts();
    } catch (error) {
      alerts(error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]:value });
  };

  useEffect(() => {
    const loadProduct = async () => {
      if(!id) return;
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        alerts(error);
      }
    }
    loadProduct();
  }, [id]);

  return (
    <form>
      { redirect ? <Redirect to={`/products/${id}`} /> : "" }
      <div className="product-form">
        <input
          onChange={handleChange}
          value={product.title ? product.title : ""}
          type="text"
          name="title"
        />
        <p> Título </p>

        <input
          onChange={handleChange}
          value={product.description ? product.description : ""}
          type="text"
          name="description"
        />
        <p> Descrição </p>

        <input
          onChange={handleChange}
          value={product.url ? product.url : ""}
          type="text"
          name="url"
        />
        <p> URL </p>

        <div className="actions">
          <button onClick={saveProduct} className="action"> Salvar </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
