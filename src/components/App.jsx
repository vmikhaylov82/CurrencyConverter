import CurrencyInput from "./CurrencyInput"
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("USD");
  const[rates, setRates] = useState([]);

  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1);
    }
  }, []);

  useEffect(() => {
    axios.get("http://data.fixer.io/api/latest?access_key=25e2d19e541592b9b9025486966f1443")
      .then(response => {
        setRates(response.data.rates);
      })
  }, []);

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }
  
  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency1) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }

  function format(number) {
    return number.toFixed(4);
  }

  return (
    <>
      <h2>Конвертер валют</h2>
      <CurrencyInput currencies={Object.keys(rates)} amount={amount1} currency={currency1} onAmountChange={handleAmount1Change} onCurrencyChange={handleCurrency1Change} />
      <CurrencyInput currencies={Object.keys(rates)} amount={amount2} currency={currency2} onAmountChange={handleAmount2Change} onCurrencyChange={handleCurrency2Change} />
    </>
  )
}

export default App
