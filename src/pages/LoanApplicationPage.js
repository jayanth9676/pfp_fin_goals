import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Card } from '@mui/material';
import { styled } from '@mui/system';
// import { API } from 'aws-amplify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const StyledCard = styled(Card)`
  padding: 24px;
  margin-top: 24px;
`;

const validationSchema = Yup.object().shape({
  loanAmount: Yup.number()
    .min(1000, 'Loan amount must be at least $1,000')
    .max(1000000, 'Loan amount cannot exceed $1,000,000')
    .required('Loan amount is required'),
});

function LoanApplicationPage() {
  const { loanType } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    loanType: loanType,
    loanAmount: '',
  };

  useEffect(() => {
    // Ensure user is logged in and loan type is selected
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) {
      enqueueSnackbar('Please log in first', { variant: 'error' });
      navigate('/login');
    }
  }, [navigate, enqueueSnackbar]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Store loan amount
      localStorage.setItem('loanAmount', values.loanAmount);

      // // Prepare and log the request body
      // const requestBody = {
      //   userId: localStorage.getItem('loggedInUserId'),
      //   loanType: loanType,
      //   loanAmount: parseFloat(values.loanAmount)
      // };
      // console.log('Lambda function request body:', JSON.stringify(requestBody, null, 2));






    const requestBody = {
        user_id: localStorage.getItem('loggedInUserId'),
        loan_amount: parseFloat(values.loanAmount),
        loan_type: loanType,
    };

    console.log('Lambda function request body:', JSON.stringify(requestBody, null, 2));

    // Prepare the body for the Lambda function
    // const lambdaRequest = {
    //     body: JSON.stringify(requestBody),
    // };
    // console.log('Request Body:', lambdaRequest);

    // Make API call to the Lambda function
    const response = await axios.post('https://7un76m4aa2.execute-api.us-east-1.amazonaws.com/default/LLMRAGHandler_t5', JSON.stringify(requestBody));
    
    // Parse the response from the Lambda function
    // const responseBody = JSON.parse(response.data.body);
    
    // // Assuming responseBody is in the expected format
    // const recommendation = responseBody.response;

    // // Store recommendation in local storage for use in the OfferPage
    // localStorage.setItem('recommendation', JSON.stringify(recommendation));

    // console.log('Recommendation:', JSON.stringify(recommendation, null, 2));

// Log the response for debugging
        console.log(response);

        // // Extract and parse the body of the response
        const responseBody = response.data.response;

        if (!responseBody) {
            throw new Error('Response body is undefined or empty');
        }

        // Use regex to extract the JSON object from the response
        const jsonMatch = responseBody.match(/```json(.*?)```/s);
        if (!jsonMatch || jsonMatch.length < 2) {
            throw new Error('Could not extract JSON from the response');
        }

        // Parse the extracted JSON string
        const loanOfferJson = jsonMatch[1].trim(); // Get the matched JSON part
        const loanOffer = JSON.parse(loanOfferJson);

        // Store the loan offer in local storage
        localStorage.setItem('recommendation', JSON.stringify(loanOffer));

        console.log('Loan Offer:', JSON.stringify(loanOffer, null, 2));

        // // Parse the JSON string in the body
        // const parsedBody = JSON.parse(responseBody);
        
        // // Extract the response text
        // const recommendationText = parsedBody.response;

        // // Use regex to extract the JSON object from the recommendation text
        // const jsonMatch = recommendationText.match(/```json(.*?)```/s);
        // if (!jsonMatch || jsonMatch.length < 2) {
        //     throw new Error('Could not extract JSON from the response');
        // }

        // // Parse the extracted JSON string
        // const loanOfferJson = jsonMatch[1].trim(); // Get the matched JSON part
        // const loanOffer = JSON.parse(loanOfferJson);

        // // Store the loan offer in local storage
        // localStorage.setItem('recommendation', JSON.stringify(loanOffer));



      // Simulating API call
      enqueueSnackbar('Loan application submitted successfully', { variant: 'success' });
      navigate('/offer');
    } catch (error) {
      console.error('Error submitting application:', error);
      enqueueSnackbar('Failed to submit loan application', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom align="center" sx={{ mt: 4 }}>
        Apply for {loanType} Loan
      </Typography>
      <StyledCard>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Loan Amount"
                name="loanAmount"
                type="number"
                error={touched.loanAmount && errors.loanAmount}
                helperText={touched.loanAmount && errors.loanAmount}
                margin="normal"
                required
              />
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  disabled={isSubmitting}
                >
                  Get Personalized Offer
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </StyledCard>
    </Container>
  );
}

export default LoanApplicationPage;