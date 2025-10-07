import React, { useState } from 'react';

const ApiKeyGate = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (apiKey) {
      onApiKeySubmit(apiKey);
    }
  };

  return (
    <div className="api-key-gate">
      <h2>Enter Your Nano Banana API Key</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApiKeyGate;