const express = require('express');
const { addIncome, getIncome, deleteIncome } = require('../controllers/Income');
const { addExpense, deleteExpense, getExpenses } = require('../controllers/expenses');
const { authenticateToken } = require('../utilites');
const router = express.Router();
router.post('/add-income', authenticateToken, addIncome)
  .get('/get-incomes', authenticateToken, getIncome)
  .delete('/delete-income/:id', deleteIncome)
  .post('/add-expense', authenticateToken, addExpense)
  .get('/get-expenses', authenticateToken, getExpenses)
  .delete('/delete-expense/:id', deleteExpense)


module.exports = router;