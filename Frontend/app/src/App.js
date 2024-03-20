import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [result, setResult] = useState();

  // const getProducts = () => {
  //   axios
  //     .get('http://localhost:8000/api')
  //     .then((res) => {
  //       setProducts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    let params = formJson.input1 && { input_sentence: formJson.input1 };

    axios
      .get('http://34.22.226.54:8000/api/inference/calc', { params })
      .then((res) => {
        setResult(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="App">
      <h1>Frontend</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="outer-container">
          <div className="input-container">
            <input
              type="text"
              id="input1"
              name="input1"
              style={{ marginRight: '10px' }}
            />
            <button type="submit">Submit</button>
          </div>
          <div className="result-container">
            <h3>{result && JSON.stringify(result.results, null, 4)}</h3>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
