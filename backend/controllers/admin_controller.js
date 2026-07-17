const Customer = require("../models/Customer_Models");

const getAdminDashboardData = async (req, res) => {
  try {
    const customers = await Customer.find();

    const dashboard = {
      gold: {
        totalCustomers: 0,
        totalWeight: 0,
        activeCustomers: 0,
        overdueCustomers: 0,
        closedCustomers: 0,
        activeLoanAmount: 0,
        activeOutstandingAmount: 0,
        totalInterestReceived: 0,
        closedLoanProfit: 0,
        totalProfit: 0,
      },

      silver: {
        totalCustomers: 0,
        totalWeight: 0,
        activeCustomers: 0,
        overdueCustomers: 0,
        closedCustomers: 0,
        activeLoanAmount: 0,
        activeOutstandingAmount: 0,
        totalInterestReceived: 0,
        closedLoanProfit: 0,
        totalProfit: 0,
      },

      overall: {
        totalCustomers: 0,
        activeCustomers: 0,
        overdueCustomers: 0,
        closedCustomers: 0,
        totalLoanAmount: 0,
        totalOutstandingAmount: 0,
        totalProfit: 0,
      },
    };

    for (const customer of customers) {
      const type = customer.item.toLowerCase(); // gold or silver

      if (!dashboard[type]) continue;

      const data = dashboard[type];

      data.totalCustomers++;
      data.totalWeight += customer.itemWeight;

      // Status Count
      if (customer.loanStatus === "Active") {
        data.activeCustomers++;

        data.activeLoanAmount += customer.principalAmount;

        data.activeOutstandingAmount +=
          customer.principalAmount + customer.interestAmount;
      }

      if (customer.loanStatus === "Overdue") {
        data.overdueCustomers++;
      }

      if (customer.loanStatus === "Closed") {
        data.closedCustomers++;
      }

      // Interest Paid
      let paidInterest = 0;

      if (customer.interestPaymentDetails.length > 0) {
        for (const payment of customer.interestPaymentDetails) {
          paidInterest += payment.amountPaid;
        }
      }

      data.totalInterestReceived += paidInterest;

      // Closed Loan Profit
      if (customer.loanStatus === "Closed") {
        const profit =
          customer.loanAmount -
          customer.principalAmount +
          customer.interestAmount +
          paidInterest;

        data.closedLoanProfit += profit;
      }

      data.totalProfit =
        data.totalInterestReceived + data.closedLoanProfit;
    }

    // Overall Data
    dashboard.overall.totalCustomers =
      dashboard.gold.totalCustomers + dashboard.silver.totalCustomers;

    dashboard.overall.activeCustomers =
      dashboard.gold.activeCustomers + dashboard.silver.activeCustomers;

    dashboard.overall.overdueCustomers =
      dashboard.gold.overdueCustomers + dashboard.silver.overdueCustomers;

    dashboard.overall.closedCustomers =
      dashboard.gold.closedCustomers + dashboard.silver.closedCustomers;

    dashboard.overall.totalLoanAmount =
      dashboard.gold.activeLoanAmount +
      dashboard.silver.activeLoanAmount;

    dashboard.overall.totalOutstandingAmount =
      dashboard.gold.activeOutstandingAmount +
      dashboard.silver.activeOutstandingAmount;

    dashboard.overall.totalProfit =
      dashboard.gold.totalProfit + dashboard.silver.totalProfit;

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const getMonthWiseProfit = async (req, res) => {
  try {
    const customers = await Customer.find();

    const months = {};

    customers.forEach((customer) => {
      const item = customer.item.toLowerCase();

      customer.interestPaymentDetails.forEach((payment) => {
        const date = new Date(payment.paidDate);

        const key = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

        if (!months[key]) {
          months[key] = {
            month: key,
            gold: 0,
            silver: 0,
            total: 0,
          };
        }

        months[key][item] += payment.amountPaid;
        months[key].total += payment.amountPaid;
      });
    });

    const result = Object.values(months).sort((a, b) =>
      a.month.localeCompare(b.month)
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDayWiseProfit = async (req, res) => {
  try {
    const customers = await Customer.find();

    const days = {};

    customers.forEach((customer) => {
      const item = customer.item.toLowerCase();

      customer.interestPaymentDetails.forEach((payment) => {
        const date = new Date(payment.paidDate);

        const key = date.toISOString().split("T")[0];

        if (!days[key]) {
          days[key] = {
            date: key,
            gold: 0,
            silver: 0,
            total: 0,
          };
        }

        days[key][item] += payment.amountPaid;
        days[key].total += payment.amountPaid;
      });
    });

    const result = Object.values(days).sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAdminDashboardData,
  getMonthWiseProfit,
  getDayWiseProfit,
};