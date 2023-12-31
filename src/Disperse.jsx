import React, { useEffect, useState } from "react";

function Disperse({ obj }) {
  const [mode, setMode] = useState(false);
  const [transactions, setTransactions] = useState([...obj]);
  const [userValue, setUserValue] = useState([]);
  const [alert, setAlert] = useState(null);

  const showAlert = (message) => {
    setAlert(message);
  };

  const handleKeepFirstOne = () => {
    // Keep only the first occurrence of each address
    const seenAddresses = new Set();
    const uniqueTransactions = [];
    for (const transaction of transactions) {
      const { address } = transaction;
      if (!seenAddresses.has(address)) {
        seenAddresses.add(address);
        uniqueTransactions.push(transaction);
      }
    }
    setTransactions(uniqueTransactions);
    showAlert(null);
    setMode(false);
  };

  const handleCombineBalances = () => {
    // Combine balances of duplicate addresses
    const combinedTransactions = {};
    for (const transaction of transactions) {
      const { address, amount } = transaction;
      if (combinedTransactions[address]) {
        combinedTransactions[address].amount += amount;
      } else {
        combinedTransactions[address] = { address, amount };
      }
    }
    setTransactions(Object.values(combinedTransactions));
    showAlert(null);
    setMode(true);
  };

  function hasDuplicateAddresses(transactions) {
    const seenAddresses = new Set();

    for (const transaction of transactions) {
      const { address } = transaction;

      // Check if the address has already been seen
      if (seenAddresses.has(address)) {
        return true;
      } else {
        seenAddresses.add(address);
      }
    }

    return false;
  }

  const handleProcessTransactions = () => {
    if (hasDuplicateAddresses(transactions)) {
      return showAlert(`Duplicate`);
    }

    setUserValue(transactions);
    setTransactions([]);
  };

  useEffect(() => {
    setTransactions(obj);
  }, [obj]);
  return (
    <>
      {transactions && transactions.length > 0 ? (
        <div>
          <label className="mt-3">Addresses with Amounts</label>
          <div className="mt-1" style={{ backgroundColor: "rgb(232 232 232)" }}>
            <div className="container p-4">
              <div className="row fs-6 fw-bold">
                {transactions.map((transaction, index) => (
                  <p key={index}>
                    <span style={{ color: "rgb(145 145 145)" }}>
                      {index + 1} |
                    </span>
                    <span style={{ marginLeft: "6px" }}>
                      {transaction.address} {transaction.amount}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </div>
          {alert ? (
            <div
              className="alert text-danger border border-danger mt-3 d-flex align-items-center"
              role="alert"
            >
              <div className="p-2 flex-grow-1">
                <span>
                  <i className="fa-solid fa-circle-exclamation"></i>
                </span>
                <span style={{ marginLeft: "10%" }}>{alert}</span>
              </div>

              <div className="p-2">
                <button
                  className="btn btn-outline-none-danger btn-sm"
                  style={{ color: "red" }}
                  onClick={handleKeepFirstOne}
                >
                  Keep First One
                </button>{" "}
                |
                <button
                  className="btn btn-outline-none-danger btn-sm"
                  style={{ color: "red" }}
                  onClick={handleCombineBalances}
                >
                  Combine Balances
                </button>
              </div>
            </div>
          ) : null}

          <button
            className="btn btn-primary form-control mt-2"
            style={
              mode
                ? { backgroundColor: "#712cf9" }
                : { backgroundColor: "#0016a9" }
            }
            disabled={transactions.length === 0}
            onClick={handleProcessTransactions}
          >
            Next
          </button>
        </div>
      ) : null}
      {userValue && userValue.length > 0 ? (
        <div className="mt-3">
          <label className="mt-3">Addresses with Amounts</label>
          <ol>
            {userValue.map((transaction, index) => (
              <li key={index}>
                Address: {transaction.address} Amount: {transaction.amount}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </>
  );
}

export default Disperse;
