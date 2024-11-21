// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Parse the JSON input
      const parsedData = JSON.parse(jsonInput);

      // Send the POST request to the backend
      const res = await axios.post('http://localhost:5000/bfhl', parsedData);

      // Set the response from the backend to display in the UI
      setResponse(res.data);
      setError('');
    } catch (err) {
      // Handle errors (invalid JSON or others)
      if (err.response) {
        setError('Server Error: ' + err.response.data.error);
      } else {
        setError('Invalid JSON format or unable to connect to server.');
      }
    }
  };

  return (
    <div>
      <h1>Roll Number: ABCD123</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder="Enter JSON data here"
          rows="5"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
