import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalcontext';
function ViewTransactions() {
  const { allHistory, } = useGlobalContext();

  const [...history] = allHistory();
  return (
    <ViewTransactionsStyled>
      <InnerLayout>
        <h1 className='title'>All Transactions</h1>
        {history.map((item) => {
          const { _id, title, amount, type } = item
          return (
            <div key={_id} className="history-item">
              <p style={{
                color: type === 'expense' ? 'red' : 'var(--color-green)'
              }}>
                {title}
              </p>

              <p style={{
                color: type === 'expense' ? 'red' : 'var(--color-green)'
              }}>
                {
                  type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`
                }
              </p>
            </div>
          )
        })}
      </InnerLayout>
    </ViewTransactionsStyled>
  )
}

const ViewTransactionsStyled = styled.div`
display: flex;
    overflow: auto;
    .title{
    margin-bottom:2rem;
    }
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .history-item:last-child {
    margin-bottom: 0; /* Remove margin from the last item */
  }
`;
export default ViewTransactions;
