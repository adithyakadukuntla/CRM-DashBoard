import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

const DashBoard = () => {
  const { symbol } = useParams(); // Get the symbol from the URL
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [graphType, setGraphType] = useState("line"); // Default graph type
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Get the token from Clerk
        const token = await getToken();

        // Send the token in the Authorization header of the request
        const res = await axios.get(`http://localhost:5000/api/stocks/${symbol}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token here
          },
        });

        // Transform the data for the graph
        const data = Object.entries(res.data["Time Series (Daily)"]).map(([date, val]) => ({
          date,
          price: parseFloat(val["4. close"]),
        }));
        setStockData(data.reverse());
      } catch (err) {
        setError(err.Information);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchStockData();
    }
  }, [symbol, getToken]); // Re-run the effect when symbol changes

  // Render the selected graph type
  const renderGraph = () => {
    switch (graphType) {
      case "line":
        return (
          <LineChart width={800} height={400} data={stockData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              dot={false} // Remove circles on the line
            />
            <Legend />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart width={800} height={400} data={stockData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Bar dataKey="price" fill="#8884d8" />
            <Legend />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart width={800} height={400} data={stockData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              fill="#8884d8"
              dot={false} // Remove circles on the area chart
            />
            <Legend />
          </AreaChart>
        );
      default:
        return null;
    }
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-5"> 
      <h2>Stock Data for {symbol}</h2>
      <div>
        <label>Select Graph Type: </label>
        <select className="m-2 p-1" value={graphType} onChange={(e) => setGraphType(e.target.value)}>
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="area">Area Chart</option>
        </select>
      </div>
    
     <div className="">
     {renderGraph()}
     </div>
     
    </div>
  );
};

export default DashBoard;