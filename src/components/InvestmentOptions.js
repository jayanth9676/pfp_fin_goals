import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Chip, Slider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import { API } from '@aws-amplify/api';

function InvestmentOptions({ goal, amount, timePeriod }) {
  const [options, setOptions] = useState([]);
  const [riskTolerance, setRiskTolerance] = useState('moderate');

  useEffect(() => {
    fetchInvestmentOptions();
  }, [goal, amount, timePeriod, riskTolerance]);

  const fetchInvestmentOptions = async () => {
    try {
      // Mock data for demonstration
      const mockOptions = {
        low: [
          {
            name: "High-Yield Savings Account",
            risk: "Very Low",
            potentialReturn: "1-2% annually",
            suitabilityScore: 90,
            analysis: "Ideal for short-term goals or emergency funds with minimal risk."
          },
          {
            name: "Certificate of Deposit (CD)",
            risk: "Low",
            potentialReturn: "2-3% annually",
            suitabilityScore: 85,
            analysis: "Suitable for short to medium-term goals with guaranteed returns."
          }
        ],
        moderate: [
          {
            name: "Index Fund",
            risk: "Moderate",
            potentialReturn: "7-10% annually",
            suitabilityScore: 85,
            analysis: "Suitable for long-term goals with balanced risk and return."
          },
          {
            name: "Balanced Mutual Fund",
            risk: "Moderate",
            potentialReturn: "5-8% annually",
            suitabilityScore: 80,
            analysis: "Good for medium to long-term goals with diversified assets."
          }
        ],
        high: [
          {
            name: "Growth Stocks ETF",
            risk: "High",
            potentialReturn: "10-15% annually",
            suitabilityScore: 75,
            analysis: "Suitable for long-term goals with higher risk tolerance."
          },
          {
            name: "Real Estate Investment Trust (REIT)",
            risk: "High",
            potentialReturn: "8-12% annually",
            suitabilityScore: 70,
            analysis: "Good for diversification and potential high returns in real estate."
          }
        ]
      };

      setOptions(mockOptions[riskTolerance]);
    } catch (error) {
      console.error('Error fetching investment options:', error);
    }
  };

  const handleRiskToleranceChange = (event) => {
    setRiskTolerance(event.target.value);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Recommended Investment Options
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Risk Tolerance</InputLabel>
        <Select value={riskTolerance} onChange={handleRiskToleranceChange}>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="moderate">Moderate</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>
      <List>
        {options.map((option, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={option.name}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    Potential Return: {option.potentialReturn}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textSecondary">
                    {option.analysis}
                  </Typography>
                </>
              }
            />
            <Chip label={`Risk: ${option.risk}`} color={option.risk === 'Low' ? 'success' : option.risk === 'Medium' ? 'warning' : 'error'} />
            <Slider
              value={option.suitabilityScore}
              step={1}
              marks
              min={0}
              max={100}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}% Suitable`}
              disabled
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default InvestmentOptions;
