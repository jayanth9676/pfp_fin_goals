// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSnackbar } from 'notistack';
// import { Container, Typography, Card, CardContent, Box, Slider, Grid, Tooltip } from '@mui/material';
// import InfoIcon from '@mui/icons-material/Info';

// function OfferPage() {
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
//   const [recommendation, setRecommendation] = useState(null);
//   const [loanAmount, setLoanAmount] = useState(0);
//   const [loanTenure, setLoanTenure] = useState(0);
//   const [monthlyPayment, setMonthlyPayment] = useState(0);
//   const [totalInterest, setTotalInterest] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);

//   useEffect(() => {
//     fetchRecommendation();
//   }, []);

//   useEffect(() => {
//     if (recommendation) {
//       setLoanAmount(recommendation.loanAmount);
//       setLoanTenure(recommendation.loanTenure);
//     }
//   }, [recommendation]);

//   useEffect(() => {
//     if (recommendation) {
//       calculateLoanDetails();
//     }
//   }, [loanAmount, loanTenure, recommendation]);

//   // const fetchRecommendation = async () => {
//   //   // This is a mock function. Replace with actual API call in production.
//   //   const mockRecommendation = {
//   //     loanAmount: 250000,
//   //     loanAmountMin: 100000,
//   //     loanAmountMax: 500000,
//   //     loanTenure: 20,
//   //     loanTenureMin: 5,
//   //     loanTenureMax: 30,
//   //     interestRate: 3.75,
//   //     creditScore: 730,
//   //     explanation: "Based on your credit score of 750 and annual income of $80,000, we recommend a home loan of $250,000. This amount falls within our lending range of $100,000 to $500,000 for your profile. The suggested loan tenure is 20 years, but you can choose between 5 to 30 years based on your preference. The interest rate of 3.75% is competitive for your credit profile. This loan amount and tenure balance affordable monthly payments with a reasonable time to pay off the loan."
//   //   };
//   //   console.log('Mock Recommendation:', JSON.stringify(mockRecommendation, null, 2));

//   //   // Store the credit score in localStorage
//   //   localStorage.setItem('userCreditScore', mockRecommendation.creditScore);

//   //   setRecommendation(mockRecommendation);
//   // };
//   const fetchRecommendation = () => {
//     const storedRecommendation = JSON.parse(localStorage.getItem('recommendation'));
//     if (storedRecommendation) {
//       console.log('Stored Recommendation:', JSON.stringify(storedRecommendation, null, 2));
      
//       setRecommendation(storedRecommendation);
      
//       // Add this console log to check the credit score
//       //console.log('Credit Score:', storedRecommendation.credit_score);
      
//       // if (storedRecommendation.credit_score) {
//       //   localStorage.setItem('userCreditScore', storedRecommendation.credit_score);
//       //   // Add this console log to verify the credit score is being stored
//       //   console.log('Stored Credit Score:', localStorage.getItem('userCreditScore'));
//       // }
//     } else {
//       console.error('No recommendation found in localStorage');
//       enqueueSnackbar('Failed to load recommendation', { variant: 'error' });
//       navigate('/loan-application');
//     }
//   };

//   const calculateLoanDetails = () => {
//     const monthlyRate = recommendation.interestRate / 100 / 12;
//     const numberOfPayments = loanTenure * 12;
//     const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
//     const totalPayment = monthlyPayment * numberOfPayments;
//     const totalInterest = totalPayment - loanAmount;
//     localStorage.setItem('userCreditScore', recommendation.creditScore);
//     setMonthlyPayment(monthlyPayment);
//     setTotalInterest(totalInterest);
//     setTotalCost(totalPayment);
//   };
//   // localStorage.setItem('userCreditScore', recommendation.creditScore);
//   const handleLoanAmountChange = (event, newValue) => {
//     setLoanAmount(newValue);
//   };

//   const handleLoanTenureChange = (event, newValue) => {
//     setLoanTenure(newValue);
//   };

//   if (!recommendation) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Typography variant="h3" gutterBottom align="center">
//         Your Personalized Loan Recommendation
//       </Typography>

//       <Card sx={{ mb: 4 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom>Recommended Loan Details</Typography>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Typography variant="body1"><strong>Loan Amount:</strong> ${loanAmount.toLocaleString()}</Typography>
//               <Slider
//                 value={loanAmount}
//                 onChange={handleLoanAmountChange}
//                 min={recommendation.loanAmountMin}
//                 max={recommendation.loanAmountMax}
//                 step={1000}
//                 valueLabelDisplay="auto"
//                 valueLabelFormat={(value) => `$${value.toLocaleString()}`}
//                 aria-labelledby="loan-amount-slider"
//               />
//               <Typography variant="body2" color="text.secondary">
//                 Range: ${recommendation.loanAmountMin.toLocaleString()} - ${recommendation.loanAmountMax.toLocaleString()}
//               </Typography>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Typography variant="body1"><strong>Loan Tenure:</strong> {loanTenure} years</Typography>
//               <Slider
//                 value={loanTenure}
//                 onChange={handleLoanTenureChange}
//                 min={recommendation.loanTenureMin}
//                 max={recommendation.loanTenureMax}
//                 step={1}
//                 valueLabelDisplay="auto"
//                 valueLabelFormat={(value) => `${value} years`}
//                 aria-labelledby="loan-tenure-slider"
//               />
//               <Typography variant="body2" color="text.secondary">
//                 Range: {recommendation.loanTenureMin} - {recommendation.loanTenureMax} years
//               </Typography>
//             </Grid>
//           </Grid>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="body1"><strong>Interest Rate:</strong> {recommendation.interestRate}%</Typography>
//           </Box>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="h6" gutterBottom>Loan Summary</Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Typography variant="body1">Monthly Payment:</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="body1" align="right">
//                   ${monthlyPayment.toFixed(2)}
//                 </Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="body1">
//                   Total Interest:
//                   <Tooltip title="The total amount of interest you'll pay over the life of the loan">
//                     <InfoIcon fontSize="small" sx={{ ml: 1, verticalAlign: 'middle' }} />
//                   </Tooltip>
//                 </Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="body1" align="right">
//                   ${totalInterest.toFixed(2)}
//                 </Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="body1">
//                   Total Cost:
//                   <Tooltip title="The total amount you'll pay over the life of the loan, including principal and interest">
//                     <InfoIcon fontSize="small" sx={{ ml: 1, verticalAlign: 'middle' }} />
//                   </Tooltip>
//                 </Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="body1" align="right">
//                   ${totalCost.toFixed(2)}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="h6" gutterBottom>Explanation</Typography>
//             <Typography variant="body1">{recommendation.explanation}</Typography>
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// }

// export default OfferPage;
















import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Container, Typography, Card, CardContent, Box, Slider, Grid, Tooltip, CircularProgress, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

function OfferPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loanDetails, setLoanDetails] = useState(null);
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTenure, setLoanTenure] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [creditScore, setCreditScore] = useState(null);

  useEffect(() => {
    const storedLoanType = localStorage.getItem('selectedLoanType');
    if (storedLoanType) {
      const parsedLoanType = JSON.parse(storedLoanType);
      setLoanDetails(parsedLoanType);
      setDefaultValues(parsedLoanType.type);
    } else {
      enqueueSnackbar('No loan type selected', { variant: 'error' });
      navigate('/loan-recommendations');
    }
  }, [navigate, enqueueSnackbar]);

  useEffect(() => {
    // Retrieve credit score from local storage when component mounts
    const storedCreditScore = localStorage.getItem('creditScore');
    if (storedCreditScore) {
      setCreditScore(parseInt(storedCreditScore, 10));
    }
  }, []);

  const setDefaultValues = (loanType) => {
    switch (loanType) {
      case 'Car':
        setLoanAmount(5000);
        setLoanTenure(0.5);
        break;
      case 'Gold':
        setLoanAmount(60);
        setLoanTenure(0.5);
        break;
      case 'Student':
        setLoanAmount(500);
        setLoanTenure(5);
        break;
      case 'Home':
        setLoanAmount(3500);
        setLoanTenure(2);
        break;
      default:
        setLoanAmount('');
        setLoanTenure(null);
    }
  };

  const getLoanRanges = (loanType) => {
    switch (loanType) {
      case 'Car':
        return { amountMin: 5000, amountMax: 40000, tenureMin: 0.5, tenureMax: 7 };
      case 'Gold':
        return { amountMin: 60, amountMax: 150000, tenureMin: 0.5, tenureMax: 3 };
      case 'Student':
        return { amountMin: 500, amountMax: 125000, tenureMin: 5, tenureMax: 15 };
      case 'Home':
        return { amountMin: 3500, amountMax: 1000000, tenureMin: 2, tenureMax: 30 };
      default:
        return { amountMin: 0, amountMax: 0, tenureMin: 0, tenureMax: 0 };
    }
  };

  const handleLoanAmountChange = (event, newValue) => {
    setLoanAmount(newValue);
  };

  const handleLoanTenureChange = (event, newValue) => {
    setLoanTenure(newValue);
  };

  const updateLoanDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://y235o0abmk.execute-api.us-east-1.amazonaws.com/default/pfpkidont5', JSON.stringify({
        user_id: localStorage.getItem('loggedInUserId'),
        loan_type: loanDetails.type,
        loan_amount: loanAmount,
        loan_tenure: loanTenure,
      }));
      
      const responseBody = response.data.response;
      
      if (!responseBody) {
        throw new Error('Response body is undefined or empty');
      }

      const jsonMatch = responseBody.match(/```json(.*?)```/s);
      if (!jsonMatch || jsonMatch.length < 2) {
        throw new Error('Could not extract JSON from the response');
      }

      const loanOfferJson = jsonMatch[1].trim();
      const loanOffer = JSON.parse(loanOfferJson);

      console.log('Updated loan details:', loanOffer);
      // const score = localStorage.setItemItem('userCreditScore');
      localStorage.setItem('userCreditScore', loanOffer.creditScore);
      //setCreditScore(score);
      setRecommendation(loanOffer);

    } catch (error) {
      console.error('Error updating loan details:', error);
      enqueueSnackbar(`Failed to update loan details: ${error.message}`, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreditScoreSubmit = (score) => {
    // Store credit score in local storage

    // ... other logic for handling credit score submission
  };

  if (!loanDetails) {
    return <Typography>Loading...</Typography>;
  }

  const ranges = getLoanRanges(loanDetails.type);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Your {loanDetails.type} Loan Offer
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          {/* <Typography variant="h5" gutterBottom>Enter Loan Details</Typography> */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1"><strong>Loan Amount:</strong> {loanAmount} $ </Typography>
              <Slider
                value={loanAmount}
                onChange={handleLoanAmountChange}
                min={ranges.amountMin}
                max={ranges.amountMax}
                step={1000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value.toLocaleString()}$`}
                aria-labelledby="loan-amount-slider"
              />
              <Typography variant="body2" color="text.secondary">
                Range: ${ranges.amountMin.toLocaleString()} - ${ranges.amountMax.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1"><strong>Loan Tenure:</strong> {loanTenure} years</Typography>
              <Slider
                value={loanTenure}
                onChange={handleLoanTenureChange}
                min={ranges.tenureMin}
                max={ranges.tenureMax}
                step={0.5}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} years`}
                aria-labelledby="loan-tenure-slider"
              />
              <Typography variant="body2" color="text.secondary">
                Range: {ranges.tenureMin} - {ranges.tenureMax} years
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={updateLoanDetails}
              disabled={isLoading || !loanAmount}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Get Loan Details'}
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Loan Summary</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">Interest Rate:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  {recommendation ? `${recommendation.interestRate}%` : '-'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Monthly Payment:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  {recommendation ? `$${recommendation.monthlyPayment?.toFixed(2)}` : '-'}
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
                  {recommendation ? `$${recommendation.totalInterest?.toFixed(2)}` : '-'}
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
                  {recommendation ? `$${recommendation.totalCost?.toFixed(2)}` : '-'}
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>Explanation</Typography>
              <Typography variant="body1">{recommendation ? recommendation.explanation : '-'}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default OfferPage;