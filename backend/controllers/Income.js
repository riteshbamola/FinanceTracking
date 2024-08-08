const incomeSchema = require('../models/incomemodel')
const User = require('../models/userlogin')
exports.addIncome = async (req, res) => {
  // console.log("addincome", req.user.email)
  const { title, amount, category, description, date } = req.body;
  const income = new incomeSchema({
    title: title,
    amount: amount,
    category: category,
    description: description,
    date: date,
    userid: req.user.id
  })
  // console.log(income)
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

exports.getIncome = async (req, res) => {

  try {
    const userid = req.user.id;
    const user = await User.findById(userid);

    const incomes = await incomeSchema.find({ userid: userid }).sort({ createdAt: -1 })
    res.status(200).json({ incomes: incomes, user: user })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  incomeSchema.findByIdAndDelete(id).then((income) => {
    res.status(200).json({ message: "Income Deleted" });

  }).catch((error) => {
    res.status(500).json({ message: "Internal server error" });
  })

}