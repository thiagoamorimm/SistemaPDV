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

    .period-filter {
      display: flex;
      gap: 0.5rem;

      .filter-button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
        background: #f8f9fa;
        color: #666;

        &:hover {
          background: #e9ecef;
        }

        &.active {
          background: #3498db;
          color: white;
        }
      }
    }
  }

  .reports-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .report-card {
      background: #fff;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      h3 {
        color: #333;
        margin-bottom: 1.5rem;
      }

      &.sales .metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;

        .metric {
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 4px;

          .label {
            display: block;
            color: #666;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
          }

          .value {
            display: block;
            color: #333;
            font-size: 1.5rem;
            font-weight: bold;
          }
        }
      }

      &.products .top-products {
        .product-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          padding: 0.75rem 0;
          border-bottom: 1px solid #eee;

          &:last-child {
            border-bottom: none;
          }

          .product-name {
            color: #333;
          }

          .product-quantity {
            color: #666;
            text-align: center;
          }

          .product-revenue {
            color: #2ecc71;
            font-weight: bold;
            text-align: right;
          }
        }
      }
    }
  }
`;