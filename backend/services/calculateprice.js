const { getRateByPurity } = require("../utils/getgoldprice");

const calculatePrice = async (req, res) => {
  try {
    const { item, purity, itemWeight } = req.body;

    if (!item || !purity || !itemWeight) {
      return res.status(400).json({
        success: false,
        message: "Item, purity and itemWeight are required.",
      });
    }

    const price = await getRateByPurity(item, purity);

    if (!price) {
      return res.status(400).json({
        success: false,
        message: "Price not found for the selected purity.",
      });
    }

    const totalPrice = Number((price * itemWeight).toFixed(2));

    res.status(200).json({
      success: true,
      data: {
        item,
        purity,
        itemWeight,
        pricePerGram: price,
        totalPrice,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  calculatePrice,
};