import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      color: #333;
    }

    .status-filter {
      display: flex;
      gap: 0.5rem;

      .filter-button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;

        &.pending {
          background: #f1c40f;
          color: #fff;
          &:hover { background: #f39c12; }
        }

        &.preparing {
          background: #3498db;
          color: #fff;
          &:hover { background: #2980b9; }
        }

        &.ready {
          background: #2ecc71;
          color: #fff;
          &:hover { background: #27ae60; }
        }

        &.delivered {
          background: #95a5a6;
          color: #fff;
          &:hover { background: #7f8c8d; }
        }
      }
    }
  }

  .orders-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;

    .order-card {
      background: #fff;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        .order-id {
          font-weight: bold;
          color: #333;
        }

        .order-time {
          color: #666;
          font-size: 0.875rem;
        }
      }

      .order-customer {
        font-weight: bold;
        color: #333;
        margin-bottom: 1rem;
      }

      .order-items {
        margin-bottom: 1rem;

        .order-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;

          &:last-child {
            border-bottom: none;
          }

          span {
            color: #666;
          }
        }
      }

      .order-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;

        .order-total {
          font-weight: bold;
          color: #333;
        }

        .order-status {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          color: white;
          font-size: 0.875rem;
          text-transform: capitalize;
        }
      }
    }
  }
`;