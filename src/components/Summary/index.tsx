import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import { UseTransactions } from '../../hooks/UseTransactions';

import { Container } from "./styles";

export function Summary(){

  const {transactions} = UseTransactions();

  const summary = transactions.reduce((acumulator, transaction) => {
    if(transaction.type === 'deposit'){
      acumulator.deposits += transaction.amount;
      acumulator.total += transaction.amount;
    }else {
      acumulator.withdraws += transaction.amount;
      acumulator.total -= transaction.amount;
    }

    return acumulator;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  });

  return(
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saindas</p>
          <img src={outcomeImg} alt="Saidas" />
        </header>
        <strong>- 
          {new Intl.NumberFormat('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={total} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}