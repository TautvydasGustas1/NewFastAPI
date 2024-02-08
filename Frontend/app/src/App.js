import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState();
  const [slider, setSlider] = useState(50);
  const [result, setResult] = useState();

  const getProducts = () => {
    axios
      .get('http://localhost:8000/api')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    let queryRequest = `?input1=${formJson.input1}&input2=${formJson.input2}&slider=${slider}`;

    axios
      .post('http://localhost:8000/api/setInfo' + queryRequest)
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <h1>Frontend</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="outer-container">
          <div className="slidecontainer">
            <input
              type="range"
              min="1"
              max="100"
              value={slider}
              className="slider"
              id="myRange"
              onChange={(e) => setSlider(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              id="input1"
              name="input1"
              style={{ marginRight: '10px' }}
            />
            <input type="text" id="input2" name="input2" />
          </div>
          <div className="submit-container">
            <button type="submit">Submit</button>
          </div>
          <div className="result-container">
            <h3>{result && result.message}</h3>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
