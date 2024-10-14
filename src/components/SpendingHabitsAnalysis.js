import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function SpendingHabitsAnalysis() {
  const [spendingData, setSpendingData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpendingDataAndRecommendations();
  }, []);

  const fetchSpendingDataAndRecommendations = async () => {
    // Simulate API call to AI service
    setLoading(true);
    setTimeout(() => {
      setSpendingData([
        { category: 'Food', amount: 500 },
        { category: 'Entertainment', amount: 200 },
        { category: 'Shopping', amount: 300 },
        { category: 'Bills', amount: 1000 },
        { category: 'Transportation', amount: 150 },
      ]);
      setRecommendations([
        'AI Recommendation: Your entertainment spending is 20% above average. Consider reducing it by finding free local events.',
        'AI Recommendation: Your food expenses could be optimized. Try meal planning to reduce costs by up to 25%.',
        'AI Recommendation: Your shopping habits show potential for savings. Consider a 30-day no-spend challenge on non-essential items.',
      ]);
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        AI-Powered Spending Analysis
      </Typography>
      <BarChart width={300} height={300} data={spendingData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
      <Typography variant="subtitle1" gutterBottom>
        AI-Generated Recommendations:
      </Typography>
      <List>
        {recommendations.map((recommendation, index) => (
          <ListItem key={index}>
            <ListItemText primary={recommendation} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SpendingHabitsAnalysis;
