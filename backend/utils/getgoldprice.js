const fs = require("fs");
const path = require("path");
const axios = require("axios");

const FILE_PATH = path.join(__dirname, "../data/Price.json");

const getPrice = async () => {
  console.log("Now in getGoldPrice function");

  const today = new Date().toISOString().split("T")[0];

  // Check today's cache
  if (fs.existsSync(FILE_PATH)) {
    const cache = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));

    if (cache.date === today) {
      return cache;
    }
  }

  // Fetch latest rates
  const response = await axios.get(
    "https://freegoldprice.org/api/v2",
    {
      params: {
        key: process.env.FREE_GOLD_API_KEY,
        action: "GSJM",
      },
    }
  );

  // Gold (24K)
  const gold24 = Number(response.data.GSJM.Gold.INR.ask);
  const gold22 = Number(((gold24 * 22) / 24).toFixed(2));
  const gold18 = Number(((gold24 * 18) / 24).toFixed(2));

  // Silver (Fine Silver)
  const silver999 = Number(response.data.GSJM.Silver.INR.ask);
  const silver925 = Number((silver999 * 0.925).toFixed(2));
  const silver900 = Number((silver999 * 0.90).toFixed(2));
  const silver800 = Number((silver999 * 0.80).toFixed(2));

  const data = {
    date: today,
    gold: {
      "18K": gold18,
      "22K": gold22,
      "24K": gold24,
    },
    silver: {
      "80%": silver800,
      "90%": silver900,
      "92.5%": silver925,
      "99.9%": silver999,
    },
  };

  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

  console.log("Gold & Silver prices stored successfully.");

  return data;
};

const getRateByPurity = async (item, purity) => {
  const data = await getPrice();

  if (item === "Gold") {
    return data.gold[purity] || null;
  }

  if (item === "Silver") {
    return data.silver[purity] || null;
  }

  return null;
};

module.exports = {
  getPrice,
  getRateByPurity,
};