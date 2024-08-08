import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import bg from '../img/bg.png';
import { MainLayout } from '../styles/Layouts';
import Orb from '../Components/Orb/Orbe'; // Ensure this path is correct
import Navigation from '../Components/Navigation/Navigation';
import Dashboard from '../Components/Dashboard/Dashboard';
import Expenses from '../Components/Expenses/Expenses';
import Incomes from '../Components/Incomes/Incomes';
import ViewTransactions from '../Components/View-Transactions/ViewTransactions';
import { useGlobalContext } from '../context/globalcontext'
import { useNavigate } from 'react-router-dom';


function Home() {

  const navigate = useNavigate();

  const [active, setActive, userId, setError, setUserId] = useState(1);

  // const userinfo = getAccount();
  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  const global = useGlobalContext()
  console.log(global)
  const displayData = () => {
    // if (userId == '')
    //   navigate('/')

    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <ViewTransactions />
      case 3:
        return <Incomes />
      case 4:
        return <Expenses />

      default:
        return <Dashboard />

    }
  }

  return (
    <HomeStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </HomeStyled>
  );
}

const HomeStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default Home;
