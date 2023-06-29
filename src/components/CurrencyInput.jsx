function CurrencyInput(props) {
    return (
        <div>
            <input type="text" value={props.amount} onChange={ev => props.onAmountChange(ev.target.value)} /> 
            <select value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)}>
                {props.currencies.map((currency => (
                    <option value={currency}>{currency}</option>
                )))}
            </select>
        </div>
    )
}

export default CurrencyInput