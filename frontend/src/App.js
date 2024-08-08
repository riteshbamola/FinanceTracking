import React from 'react';
import bg from './img/bg.png';
import back from './img/back.png'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Home from './Pages/Home';
import { GlobalProvider } from './context/globalcontext';

function App() {
  return (
    <Router>

      <AppStyled>
        <main>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Signin />} />
          </Routes>
        </main>
      </AppStyled>

    </Router>
  );
}
// background-img:${back};

const AppStyled = styled.div`
  height: 100vh;
  background-img:${bg};
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

export default App;
