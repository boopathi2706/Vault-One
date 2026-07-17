const Customer = require("../models/Customer_Models");


const calculateInterest = async () => {
  try {
    const customers = await Customer.find({
      loanStatus: { $in: ["Active", "Overdue"] },
    });

    const today = new Date();

    for (const customer of customers) {
      const loanDate = new Date(customer.loanDate);

      // Month difference only
      let months =
        (today.getFullYear() - loanDate.getFullYear()) * 12 +
        (today.getMonth() - loanDate.getMonth());

      if (months <= 0) continue;

      // Monthly interest
      const monthlyInterest =
        (customer.principalAmount * customer.interestRate) / 100;

      // Total interest till current month
      const totalInterest = Number(
        (months * monthlyInterest).toFixed(2)
      );

      customer.interestAmount = totalInterest;

      // After 6 months
      if (months >= 6) {
        customer.principalAmount = Number(
          (customer.principalAmount + totalInterest).toFixed(2)
        );

        customer.interestAmount = 0;

        customer.loanDate = today;

        customer.loanStatus = "Overdue";
      }

      await customer.save();
    }

    console.log("Monthly interest calculation completed.");
  } catch (error) {
    console.log(error.message);
  }
};



module.exports = calculateInterest;