import { useState } from "react";
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  height: 100vh;

  .left-panel {
    flex: 1;
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .product-card {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #f0f0f0;
      }
    }
  }

  .right-panel {
    width: 400px;
    border-left: 1px solid #ccc;
    padding-left: 2rem;

    .cart-items {
      margin: 1rem 0;

      .cart-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
      }
    }

    .total {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
    }

    .finish-button {
      width: 100%;
      padding: 1rem;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #45a049;
      }
    }
  }
`;
import { mockProducts } from "./mockData";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export function Caixa() {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    setTotal(total + product.price * product.quantity);
  };

  return (
    <Container>
      <div className="left-panel">
        <h2>Produtos</h2>
        <div className="products-grid">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleAddToCart(product)}
            >
              <h3>{product.name}</h3>
              <span>R$ {product.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="right-panel">
        <h2>Carrinho</h2>
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>{item.quantity}x</span>
              <span>R$ {item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="total">
          <h3>Total:</h3>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        
        <button className="finish-button">Finalizar Venda</button>
      </div>
    </Container>
  );
}