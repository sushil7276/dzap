import { useState } from "react";
import Disperse from "./Disperse.jsx";

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [alert, setAlert] = useState(null);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  // Check string only digit
  function containsOnlyDigits(inputString) {
    const digitPattern = /^[0-9]+$/;
    return digitPattern.test(inputString);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const words = id.split(/[ ,=]+/);
    const address = words[0];
    if (!address.startsWith("0x")) {
      showAlert('Address must start with "0x"');
      return;
    }

    let amount = words[1];
    if (!containsOnlyDigits(amount)) {
      showAlert("wrong amount");
      return;
    }
    amount = Number(amount);

    const newData = [...data, { address, amount }];
    setData(newData);
  };
  return (
    <>
      <div className="container">
        <div className="mt-3">
          <form onSubmit={onSubmit}>
            <input
              className="form-control"
              required
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <label htmlFor="id">separated by ',' or ' ' or '='</label>
            <button
              className="btn btn-primary form-control mt-2"
              style={{ backgroundColor: "#0016a9" }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        {alert ? (
          <div className="alert mt-3 text-danger border border-danger">
            <span>
              <i class="fa-solid fa-circle-exclamation"></i>
            </span>
            <span style={{ marginLeft: "10%" }}>{alert}</span>
          </div>
        ) : null}
        <Disperse obj={data} />
      </div>
      <div className="mt-3">
        <a href="https://github.com/sushil7276/dzap-test/tree/47a55a01fca001ec2bc9ce5ed5974b0843180bff">
          source code
        </a>
      </div>
    </>
  );
}

export default App;
