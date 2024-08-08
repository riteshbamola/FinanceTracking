const expenseSchema = require('../models/expensemodel')
exports.addExpense = async (req, res) => {

  const { title, amount, category, description, date } = req.body;
  const income = new expenseSchema({
    title: title,
    amount: amount,
    category: category,
    description: description,
    date: date,
    userid: req.user.id
  })

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (amount <= 0 || !amount === Number) {
      return res.status(400).json({ message: "Amount should be positive" })
    }
    await income.save()
    return res.status(200).json({ message: "Success" })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

exports.getExpenses = async (req, res) => {

  try {
    const userid = req.user.id;

    const incomes = await expenseSchema.find({ userid: userid }).sort({ createdAt: -1 })

    res.status(200).json(incomes)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  expenseSchema.findByIdAndDelete(id).then((income) => {
    res.status(200).json({ message: "Expense Deleted" });

  }).catch((error) => {
    res.status(500).json({ message: "Internal server error" });
  })

}