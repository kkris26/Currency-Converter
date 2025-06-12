export default async function apiConvert(req, res) {
  const API_KEY = process.env.CURRENCIES_API_KEY;
  const API_CONVERT = process.env.API_CONVERT;

  const { baseCurrency, currencies } = req.query;
  if (!baseCurrency || !currencies) {
    return res.status(400).json({
      error: "Missing parameters",
    });
  }
  const url = `${API_CONVERT}${API_KEY}&base_currency=${baseCurrency}&currencies=${currencies}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res(500).json({
      error: "Gagal Fetch",
    });
  }
}
