import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function FinancialCalculators({ goal }) {
  const [principal, setPrincipal] = useState(goal?.defaultAmount || 0);
  const [rate, setRate] = useState(7);
  const [time, setTime] = useState(goal?.defaultPeriod || 12);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [results, setResults] = useState(null);

  const calculateCompoundInterest = () => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = time;
    let balance = principal;

    const yearlyResults = [];

    for (let month = 1; month <= totalMonths; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      
      if (month % 12 === 0) {
        yearlyResults.push({
          year: month / 12,
          balance: balance.toFixed(2),
          interest: (balance - principal - monthlyContribution * month).toFixed(2)
        });
      }
    }

    setResults(yearlyResults);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Financial Calculator
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Initial Investment"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Annual Interest Rate (%)"
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Time Period (months)"
            type="number"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Monthly Contribution"
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={calculateCompoundInterest}>
            Calculate
          </Button>
        </Grid>
      </Grid>
      {results && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell align="right">Interest Earned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row) => (
                <TableRow key={row.year}>
                  <TableCell component="th" scope="row">
                    {row.year}
                  </TableCell>
                  <TableCell align="right">${row.balance}</TableCell>
                  <TableCell align="right">${row.interest}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default FinancialCalculators;
