import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { menuItems } from '../../utils/menuitems';
import { signout } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalcontext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosinstance"

function Navigation({ active, setActive }) {
  useEffect(() => {
    getAccount();
    return () => { };
  }, [])
  const navigate = useNavigate();
  const { userId, userInfo, setUserInfo, setUserId, logout } = useGlobalContext();
  // const [userInfo, setUserInfo] = useState({});
  console.log("Useringonav", userInfo)
  console.log("Navigation", userInfo);
  const handleClick = () => {
    navigate('/');
    logout();
  };
  const getAccount = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      const user = response.data;
      console.log("Homepage User", user);
      if (response.data) {
        const user = response.data;
        setUserInfo(user);
        // console.log("Our user", userInfo[0]);
      }
    }
    catch (error) {
      // setError(error);

    }


  }

  return (
    <NavStyled>
      <div className="user-container">
        <img src={avatar} alt="avatar" />
        <div className="text">
          <h2>{userInfo.name}</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? 'active' : ''}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <ul onClick={handleClick} className="bottom">
        <li>{signout} Sign Out</li>
      </ul>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-container {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  .bottom {
    border: 0;
    display: grid;
    align-items: center;
    margin: 0.6rem 0;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    color: rgba(34, 34, 96, 0.6);
    padding-left: 1rem;
    position: relative;
    i {
      color: rgba(34, 34, 96, 0.6);
      font-size: 1.4rem;
      transition: all 0.4s ease-in-out;
    }
  }
`;

export default Navigation;
