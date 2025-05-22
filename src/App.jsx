import { use, useEffect, useState } from "react";
import InputCurrency from "./components/InputCurrency";

function App() {
  const [currenciesData, setCurrenciesData] = useState(
    JSON.parse(localStorage.getItem("currenciesData"))
  );
  const [baseCurrency, setBaseCurrency] = useState("");
  const [currencies, setCurrencies] = useState("");
  const [inputNumber, setInputNumber] = useState(1);
  const [convertResult, setConvertResult] = useState("");

  if (!localStorage.getItem("currenciesData")) {
    console.log("Localstorage tidak ada");
    const urlCountry =
      "https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_COIYEep2Ufn6L7oxWJRFvRVD41YSyLzXvvoOZYwg";
    async function getDataCurrency() {
      try {
        const response = await fetch(urlCountry);
        const data = await response.json();
        localStorage.setItem("currenciesData", JSON.stringify(data));
        setCurrenciesData(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDataCurrency();
  }

  const urlConvert = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_COIYEep2Ufn6L7oxWJRFvRVD41YSyLzXvvoOZYwg&base_currency=${baseCurrency}&currencies=${currencies}`;
  const getDataExchange = async () => {
    try {
      const response = await fetch(urlConvert);
      const data = await response.json();
      setConvertResult(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (inputNumber && baseCurrency && currencies) {
      getDataExchange();
    }
  }, [baseCurrency, currencies]);

  const handleBase = (e) => {
    setBaseCurrency(e.target.value);
  };
  const handleCurrency = (e) => {
    setCurrencies(e.target.value);
  };
  const handleInputNumber = (e) => {
    const input = e.target.value;
    if (input < 1) return;
    setInputNumber(input);
  };

  const numberFormat = (value) => {
    return Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const symbol = (country) => {
    return currenciesData.data[country].symbol;
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 gap-6">
      <div className="flex flex-col gap-6 items-center">
        <div className="flex gap-1 justify-center flex-col w-full">
          <label
            htmlFor="inputNumber"
            className="text-lg text-neutral-600 dark:text-neutral-200"
          >
            Input Currency
          </label>
          <input
            className="border p-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow-md"
            type="number"
            id="inputNumber"
            name="input-number"
            min={1}
            onChange={handleInputNumber}
            value={inputNumber}
          />
        </div>

        <div className="flex flex-col gap-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white border p-8 rounded-2xl shadow-md">
          <InputCurrency
            label="Base Currency"
            inputName="baseCurrency"
            action={handleBase}
            value={baseCurrency}
            data={currenciesData}
          />
          <InputCurrency
            label="Convert Currency"
            inputName="currencies"
            action={handleCurrency}
            value={currencies}
            data={currenciesData}
          />
        </div>
        <div className="border px-6 py-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow-md w-full">
          <h2 className="text-xl text-center">
            {convertResult.data
              ? convertResult.data[currencies]
                ? `${symbol(baseCurrency)} ${inputNumber} = ${symbol(
                    currencies
                  )} ${numberFormat(
                    convertResult.data[currencies] * inputNumber
                  )}`
                : "Converting... Please wait."
              : "Select currencies to convert"}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
