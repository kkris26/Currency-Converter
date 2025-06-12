const apiCurrencies = async (req, res) => {
  const API_KEY = process.env.CURRENCIES_API_KEY;
  const API_CURRENCIES = process.env.API_CURRENCIES;

  try {
    const response = await fetch(API_CURRENCIES + API_KEY);
    console.log(API_CURRENCIES + API_KEY);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch",
    });
  }
};

export default apiCurrencies;
