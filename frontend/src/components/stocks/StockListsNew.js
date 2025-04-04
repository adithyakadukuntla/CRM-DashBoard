import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {FaChartLine} from 'react-icons/fa'

function StockListsNew() {
    const stocksCountry = ["US", "China", "Canada", "Israel", "Taiwan", "Netherlands", "Global"];
    const [activeCountry, setActiveCountry] = useState("US");
    const [stocksData, setStocksData] = useState([]);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchStocks() {
            setLoading(true);
            setErr(""); // Reset error before fetching
            try {
                const res = await axios.get(`http://localhost:5000/api/stockswithcountry/${activeCountry}`);
                setStocksData(res.data.payload);
            } catch (error) {
                setErr("Error fetching data: " + (error.response?.data?.message || error.message));
            } finally {
                setLoading(false);
            }
        }

        fetchStocks();
    }, [activeCountry]);
    const handleStockClick = (symbol) => {
        navigate(`/${symbol}/dashboard`);
      };
    

    return (
        <div className="pt-4">
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", margin: "auto" }}>
                {stocksCountry.map((country, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCountry(country)}
                        style={{
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            backgroundColor: activeCountry === country ? "#007bff" : "#f8f9fa",
                            color: activeCountry === country ? "#fff" : "#000",
                            cursor: "pointer",
                        }}
                    >
                        {country}
                    </button>
                ))}
            </div>

            {loading ? (
                    <div>Loading stocks...</div>
                  ) : err ? (
                    <div style={{ color: 'red' }}>{err}</div>
                  ) : stocksData.length === 0 ? (
                    <div>No stocks available.</div>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
              {stocksData.map((stock) => (
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
}

export default StockListsNew;
