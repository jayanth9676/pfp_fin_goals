// import React, { useEffect, useState, useCallback } from 'react';
// import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useSnackbar } from 'notistack';

// function LoanRecommendationsPage() {
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { enqueueSnackbar } = useSnackbar();
//   const navigate = useNavigate();

//   const fetchRecommendations = useCallback(async () => {
//     try {
//       // Simulating API call
//       const mockRecommendations = [
//         { type: 'Home', suggestedAmount: 200000, estimatedAPR: 3.5 },
//         { type: 'Car', suggestedAmount: 25000, estimatedAPR: 4.5 },
//         { type: 'Gold', suggestedAmount: 10000, estimatedAPR:  5.5 },
//         { type: 'Student', suggestedAmount: 10000, estimatedAPR: 6.5},
//       ];
//       setRecommendations(mockRecommendations);
//     } catch (error) {
//       console.error('Error fetching recommendations:', error);
//       enqueueSnackbar('Failed to fetch loan recommendations', { variant: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   }, [enqueueSnackbar]);

//   useEffect(() => {
//     fetchRecommendations();
//   }, [fetchRecommendations]);

//   const handleSelectLoan = (loanType) => {
//     // Store the selected loan type in localStorage
//     localStorage.setItem('selectedLoanType', loanType);
//     // Navigate to the loan application page
//     navigate(`/apply/${loanType.toLowerCase()}`);
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Typography variant="h3" gutterBottom align="center">
//         What are you looking for?
//       </Typography>
//       <Grid container spacing={3}>
//         {recommendations.map((loan, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h5" gutterBottom>
//                   {loan.type} Loan
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   Suggested Amount: ${loan.suggestedAmount.toLocaleString()}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   Estimated APR: {loan.estimatedAPR}%
//                 </Typography>
//                 <Button
//                   onClick={() => handleSelectLoan(loan.type)}
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   sx={{ mt: 2 }}
//                 >
//                   Select This Loan
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

// export default LoanRecommendationsPage;

















import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function LoanRecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const fetchRecommendations = useCallback(async () => {
    try {
      // Simulating API call
      const mockRecommendations = [
        { type: 'Home', suggestedAmount: 200000, estimatedAPR: 3.5 },
        { type: 'Car', suggestedAmount: 25000, estimatedAPR: 4.5 },
        { type: 'Gold', suggestedAmount: 10000, estimatedAPR:  5.5 },
        { type: 'Student', suggestedAmount: 10000, estimatedAPR: 6.5},
      ];
      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      enqueueSnackbar('Failed to fetch loan recommendations', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const handleSelectLoan = (loan) => {
    // Store the selected loan type and its details in localStorage
    localStorage.setItem('selectedLoanType', JSON.stringify({
      type: loan.type,
      estimatedAPR: loan.estimatedAPR,
      loanAmountMin: loan.loanAmountMin,
      loanAmountMax: loan.loanAmountMax,
      loanTenureMin: loan.loanTenureMin,
      loanTenureMax: loan.loanTenureMax
    }));

    // Navigate to the offer page
    navigate('/offer');
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        What are you looking for?
      </Typography>
      <Grid container spacing={3}>
        {recommendations.map((loan, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {loan.type} Loan
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Suggested Amount: ${loan.suggestedAmount.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Estimated APR: {loan.estimatedAPR}%
                </Typography>
                <Button
                  onClick={() => handleSelectLoan(loan)}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Select This Loan
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default LoanRecommendationsPage;