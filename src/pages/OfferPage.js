import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Container, Typography, Card, CardContent, Box, Slider, Grid, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function OfferPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [recommendation, setRecommendation] = useState(null);
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTenure, setLoanTenure] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetchRecommendation();
  }, []);

  useEffect(() => {
    if (recommendation) {
      setLoanAmount(recommendation.loanAmount);
      setLoanTenure(recommendation.loanTenure);
    }
  }, [recommendation]);

  useEffect(() => {
    if (recommendation) {
      calculateLoanDetails();
    }
  }, [loanAmount, loanTenure, recommendation]);

  // const fetchRecommendation = async () => {
  //   // This is a mock function. Replace with actual API call in production.
  //   const mockRecommendation = {
  //     loanAmount: 250000,
  //     loanAmountMin: 100000,
  //     loanAmountMax: 500000,
  //     loanTenure: 20,
  //     loanTenureMin: 5,
  //     loanTenureMax: 30,
  //     interestRate: 3.75,
  //     creditScore: 730,
  //     explanation: "Based on your credit score of 750 and annual income of $80,000, we recommend a home loan of $250,000. This amount falls within our lending range of $100,000 to $500,000 for your profile. The suggested loan tenure is 20 years, but you can choose between 5 to 30 years based on your preference. The interest rate of 3.75% is competitive for your credit profile. This loan amount and tenure balance affordable monthly payments with a reasonable time to pay off the loan."
  //   };
  //   console.log('Mock Recommendation:', JSON.stringify(mockRecommendation, null, 2));

  //   // Store the credit score in localStorage
  //   localStorage.setItem('userCreditScore', mockRecommendation.creditScore);

  //   setRecommendation(mockRecommendation);
  // };
  const fetchRecommendation = () => {
    const storedRecommendation = JSON.parse(localStorage.getItem('recommendation'));
    if (storedRecommendation) {
      console.log('Stored Recommendation:', JSON.stringify(storedRecommendation, null, 2));
      
      setRecommendation(storedRecommendation);
      
      // Add this console log to check the credit score
      //console.log('Credit Score:', storedRecommendation.credit_score);
      
      // if (storedRecommendation.credit_score) {
      //   localStorage.setItem('userCreditScore', storedRecommendation.credit_score);
      //   // Add this console log to verify the credit score is being stored
      //   console.log('Stored Credit Score:', localStorage.getItem('userCreditScore'));
      // }
    } else {
      console.error('No recommendation found in localStorage');
      enqueueSnackbar('Failed to load recommendation', { variant: 'error' });
      navigate('/loan-application');
    }
  };

  const calculateLoanDetails = () => {
    const monthlyRate = recommendation.interestRate / 100 / 12;
    const numberOfPayments = loanTenure * 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    localStorage.setItem('userCreditScore', recommendation.creditScore);
    setMonthlyPayment(monthlyPayment);
    setTotalInterest(totalInterest);
    setTotalCost(totalPayment);
  };
  // localStorage.setItem('userCreditScore', recommendation.creditScore);
  const handleLoanAmountChange = (event, newValue) => {
    setLoanAmount(newValue);
  };

  const handleLoanTenureChange = (event, newValue) => {
    setLoanTenure(newValue);
  };

  if (!recommendation) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Your Personalized Loan Recommendation
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Recommended Loan Details</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1"><strong>Loan Amount:</strong> ${loanAmount.toLocaleString()}</Typography>
              <Slider
                value={loanAmount}
                onChange={handleLoanAmountChange}
                min={recommendation.loanAmountMin}
                max={recommendation.loanAmountMax}
                step={1000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                aria-labelledby="loan-amount-slider"
              />
              <Typography variant="body2" color="text.secondary">
                Range: ${recommendation.loanAmountMin.toLocaleString()} - ${recommendation.loanAmountMax.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1"><strong>Loan Tenure:</strong> {loanTenure} years</Typography>
              <Slider
                value={loanTenure}
                onChange={handleLoanTenureChange}
                min={recommendation.loanTenureMin}
                max={recommendation.loanTenureMax}
                step={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} years`}
                aria-labelledby="loan-tenure-slider"
              />
              <Typography variant="body2" color="text.secondary">
                Range: {recommendation.loanTenureMin} - {recommendation.loanTenureMax} years
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1"><strong>Interest Rate:</strong> {recommendation.interestRate}%</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Loan Summary</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">Monthly Payment:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  ${monthlyPayment.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  Total Interest:
                  <Tooltip title="The total amount of interest you'll pay over the life of the loan">
                    <InfoIcon fontSize="small" sx={{ ml: 1, verticalAlign: 'middle' }} />
                  </Tooltip>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  ${totalInterest.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  Total Cost:
                  <Tooltip title="The total amount you'll pay over the life of the loan, including principal and interest">
                    <InfoIcon fontSize="small" sx={{ ml: 1, verticalAlign: 'middle' }} />
                  </Tooltip>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  ${totalCost.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Explanation</Typography>
            <Typography variant="body1">{recommendation.explanation}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default OfferPage;