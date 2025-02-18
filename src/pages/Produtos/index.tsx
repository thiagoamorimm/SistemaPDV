import { useState } from "react";
import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .products-table {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 1rem;
    background: #f5f5f5;
    font-weight: bold;
  }

  .table-body .table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 1rem;
    border-top: 1px solid #ddd;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }

  .add-button {
    background: #4CAF50;
    color: white;
  }

  .edit-button {
    background: #2196F3;
    color: white;
  }

  .delete-button {
    background: #f44336;
    color: white;
  }
`;

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export function Produtos() {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <Container>
      <div className="header">
        <h2>Gerenciamento de Produtos</h2>
        <button className="add-button">Adicionar Produto</button>
      </div>

      <div className="products-table">
        <div className="table-header">
          <span>Nome</span>
          <span>Categoria</span>
          <span>Preço</span>
          <span>Estoque</span>
          <span>Ações</span>
        </div>

        <div className="table-body">
          {products.map((product) => (
            <div key={product.id} className="table-row">
              <span>{product.name}</span>
              <span>{product.category}</span>
              <span>R$ {product.price.toFixed(2)}</span>
              <span>{product.stock}</span>
              <div className="actions">
                <button className="edit-button">Editar</button>
                <button className="delete-button">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}