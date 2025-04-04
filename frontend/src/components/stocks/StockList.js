import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {FaChartLine} from 'react-icons/fa'
const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/all-stocks')
      .then(response => {
        const stocksData = Array.isArray(response.data) ? response.data : [];
        
        setStocks(stocksData);
        setError(null);
      })
      .catch(error => {
        setError("Failed to fetch stocks. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleStockClick = (symbol) => {
    navigate(`/${symbol}/dashboard`);
  };

  return (
    <div className='pt-2'>
      <h1>Stocks</h1>
      {loading ? (
        <div>Loading stocks...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : stocks.length === 0 ? (
        <div>No stocks available.</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
  {stocks.map((stock) => (
    <div
      key={stock._id}
      style={{
        border: '1px solid #ddd',
        padding: '20px',
        margin: '10px',
        width: '220px',
        cursor: 'pointer',
        borderRadius: '10px',
        textAlign: 'center',
        background: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onClick={() => handleStockClick(stock.symbol)}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
        <FaChartLine size={24} color="#8884d8" />
      </div>
      <h3 style={{ color: '#3b3b3b', fontWeight: '600', fontSize: '18px' }}>{stock.name}</h3>
      <p style={{ color: '#6c757d', fontSize: '14px' }}>{stock.symbol}</p>
      <p style={{ color: '#6c757d', fontSize: '14px' }}>{stock.country}</p>
      <p style={{ color: '#6c757d', fontSize: '14px' }}>{stock.type}</p>
    </div>
  ))}
</div>

      )}
    </div>
  );
};

export default StockList;