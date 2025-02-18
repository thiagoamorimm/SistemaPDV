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

    .add-button {
      padding: 0.75rem 1.5rem;
      background: #2ecc71;
      color: white;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background: #27ae60;
      }
    }
  }

  .products-table {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .table-header {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
      padding: 1rem;
      background: #f8f9fa;
      border-bottom: 2px solid #eee;

      span {
        font-weight: bold;
        color: #333;
      }
    }

    .table-body {
      .table-row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        padding: 1rem;
        border-bottom: 1px solid #eee;
        align-items: center;

        &:hover {
          background: #f8f9fa;
        }

        span {
          color: #666;
        }

        .actions {
          display: flex;
          gap: 0.5rem;

          button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s;

            &.edit-button {
              background: #3498db;
              color: white;

              &:hover {
                background: #2980b9;
              }
            }

            &.delete-button {
              background: #e74c3c;
              color: white;

              &:hover {
                background: #c0392b;
              }
            }
          }
        }
      }
    }
  }
`;