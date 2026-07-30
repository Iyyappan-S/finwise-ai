import { useEffect, useState } from "react";
import API from "../api/axios";

function AIInsights() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const res = await API.get("/ai/insights");
      setInsights(res.data.insights);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ai-card">
      <h2>🤖 AI Financial Insights</h2>

      {insights.length === 0 ? (
        <p>No insights available.</p>
      ) : (
        insights.map((item, index) => (
          <div key={index} className="insight-item">
            ✅ {item}
          </div>
        ))
      )}
    </div>
  );
}

export default AIInsights;