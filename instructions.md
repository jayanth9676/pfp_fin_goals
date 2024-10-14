# Financial Goals Feature Setup Instructions

This document provides instructions for setting up and running the Financial Goals feature of our application.

## Frontend Setup

1. Ensure you have Node.js and npm installed on your system.

2. Navigate to the project root directory and install dependencies:   ```
   npm install   ```

3. Update the Amplify configuration in `src/index.js` with your API Gateway endpoint:   ```javascript
   Amplify.configure({
     API: {
       endpoints: [
         {
           name: "FinancialGoalsAPI",
           endpoint: "https://your-api-id.execute-api.your-region.amazonaws.com/prod"
         }
       ]
     }
   });   ```

4. Start the development server:   ```
   npm start   ```

## Backend Setup

1. Ensure you have the AWS CLI installed and configured with appropriate credentials.

2. Set up the required AWS services:
   - Create a DynamoDB table for storing financial goals
   - Set up an S3 bucket for storing user data (if needed)
   - Configure API Gateway to expose Lambda functions as RESTful endpoints
   - Set up AWS Cognito for user authentication

3. Deploy Lambda functions:
   - `getFinancialGoalSuggestions.py`
   - `saveFinancialGoal.py`
   - `updateGoalProgress.py`
   - Other Lambda functions as needed

4. Set up environment variables for Lambda functions (e.g., DynamoDB table names, SNS topic ARNs).

5. Configure API Gateway:
   - Create resources and methods for each endpoint
   - Set up proper request/response mappings
   - Enable CORS if needed
   - Deploy the API to a stage (e.g., "prod")

6. Update the frontend Amplify configuration with the correct API Gateway endpoint.

## Testing

1. Run frontend tests:   ```
   npm test   ```

2. Test Lambda functions using the AWS Console or AWS CLI.

3. Perform end-to-end testing to ensure proper integration between frontend and backend.

## Deployment

1. Build the frontend for production:   ```
   npm run build   ```

2. Deploy the frontend to your hosting service (e.g., AWS S3, Netlify, Vercel).

3. Ensure all Lambda functions are deployed and up-to-date.

4. Verify that the API Gateway configuration is correct and deployed.

## Maintenance

1. Regularly review and update AI prompts in Lambda functions to improve suggestion quality.

2. Monitor CloudWatch logs and metrics for issues and performance optimization opportunities.

3. Keep dependencies and runtime versions up-to-date for both frontend and backend.

4. Regularly backup DynamoDB tables and test the restoration process.

5. Implement and maintain a CI/CD pipeline for automated testing and deployment.

## Troubleshooting

1. Check CloudWatch logs for Lambda function errors.

2. Verify API Gateway settings and test endpoints using the AWS Console.

3. Ensure proper CORS configuration if encountering cross-origin issues.

4. Verify AWS Cognito settings for authentication issues.

5. Check frontend console for any JavaScript errors or API call failures.

For any additional issues or questions, please contact the development team.
