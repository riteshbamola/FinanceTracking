import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../utils/axiosinstance";
// import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState({});
  // const navigate = useNavigate();

  // User account functions

  const getAccount = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data) {
        const user = response.data;
        setUserId(user.name);
      }
    }
    catch (error) {
      setError(error);

    }


  }
  const logout = async () => {
    await axiosInstance.get('/logout');
    localStorage.removeItem("token")
    // setUserId('');
  }

  // Income functions
  const addIncome = async (income) => {
    try {
      await axiosInstance.post('/add-income', income);
      getIncome();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const getIncome = async () => {
    try {
      const response = await axiosInstance.get('/get-incomes');
      setIncomes(response.data.incomes);
      setUserInfo(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(`/delete-income/${id}`);
      getIncome();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const totalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  // Expense functions
  const addExpense = async (expense) => {
    try {
      await axiosInstance.post('/add-expense', expense);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axiosInstance.get('/get-expenses');
      setExpenses(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`/delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const totalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Balance and history functions
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  const allHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history;
  };



  return (
    <GlobalContext.Provider value={{
      addIncome,
      getIncome,
      incomes,
      error,
      expenses,
      setError,
      deleteIncome,
      totalIncome,
      addExpense,
      getExpenses,
      deleteExpense,
      totalExpenses,
      totalBalance,
      transactionHistory,
      allHistory,
      userId,
      setUserId,
      logout,
      getAccount,
      userInfo,
      setUserInfo
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
