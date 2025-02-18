import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 2rem;
  padding: 2rem;

  .left-panel {
    flex: 1;
    background: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
      margin-bottom: 1.5rem;
      color: #333;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
  }

  .right-panel {
    width: 400px;
    background: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;

    h2 {
      margin-bottom: 1.5rem;
      color: #333;
    }

    .cart-items {
      flex: 1;
      overflow-y: auto;

      .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px solid #eee;

        span {
          color: #666;
        }
      }
    }

    .total {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 2px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        color: #333;
      }

      span {
        font-size: 1.25rem;
        font-weight: bold;
        color: #2ecc71;
      }
    }

    .finish-button {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #2ecc71;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background: #27ae60;
      }
    }
  }
`;