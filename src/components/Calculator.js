import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

function Calculator({ goal, amount, timePeriod }) {
  const [interestRate, setInterestRate] = useState(5);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    calculateSavings();
  }, [amount, timePeriod, interestRate, monthlyContribution]);

  const calculateSavings = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = timePeriod;
    const futureValue = amount * Math.pow(1 + monthlyRate, numPayments) +
      monthlyContribution * ((Math.pow(1 + monthlyRate, numPayments) - 1) / monthlyRate);
    setTotalSavings(futureValue);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Savings Calculator
      </Typography>
      <Box mb={2}>
        <TextField
          label="Interest Rate (%)"
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Monthly Contribution"
          type="number"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(Number(e.target.value))}
          fullWidth
        />
      </Box>
      <Typography variant="body1">
        Total Savings after {timePeriod} months: ${totalSavings.toFixed(2)}
      </Typography>
    </div>
  );
}

export default Calculator;
