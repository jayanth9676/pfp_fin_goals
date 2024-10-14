# Financial Goals Feature Setup Guide

This guide provides step-by-step instructions for setting up and integrating the Financial Goals feature, including both frontend and backend AWS services.

## Prerequisites

- Node.js and npm installed
- AWS account with appropriate permissions
- AWS CLI installed and configured
- Basic knowledge of React, AWS Lambda, and API Gateway

## Backend Setup

### 1. AWS Lambda Functions

1. Navigate to the AWS Lambda console.
2. Create the following Lambda functions:
   - `getFinancialGoalSuggestions`
   - `saveFinancialGoal`
   - `updateGoalProgress`
   - `getInvestmentOptions`
   - `getCreditCardSuggestions`
   - `getSpendingHabitsAnalysis`
   - `generateAIQuest`

3. For each function:
   - Use Python 3.8+ as the runtime.
   - Copy the corresponding code from the `aws_lambda` directory.
   - Set up environment variables (e.g., DynamoDB table names, SNS topic ARNs).
   - Configure appropriate IAM roles with necessary permissions.

### 2. DynamoDB Tables

1. Create the following DynamoDB tables:
   - `Users`: Partition key - `userId` (String)
   - `FinancialGoals`: Partition key - `userId` (String), Sort key - `goalId` (String)

2. Add any additional attributes as needed.

### 3. Amazon Bedrock

1. Set up Amazon Bedrock in your AWS account.
2. Configure the necessary model (e.g., Claude) for AI-powered suggestions.

### 4. Amazon SNS

1. Create SNS topics for notifications:
   - `GoalCreationTopic`
   - `GoalMilestoneTopic`

2. Set up subscriptions for these topics (e.g., email, SMS).

### 5. API Gateway

1. Create a new API in API Gateway.
2. Set up resources and methods for each Lambda function.
3. Configure request/response mappings.
4. Enable CORS if needed.
5. Deploy the API to a stage (e.g., "prod").

## Frontend Setup

1. Clone the repository and navigate to the project directory.

2. Install dependencies:
   ```
   npm install
   ```

3. Update the Amplify configuration in `src/index.js`:
   ```javascript
   Amplify.configure({
     API: {
       endpoints: [
         {
           name: "FinancialGoalsAPI",
           endpoint: "https://your-api-id.execute-api.your-region.amazonaws.com/prod"
         }
       ]
     }
   });
   ```

4. Update any hardcoded values or placeholders in the components with actual data or API calls.

## Integration Steps

1. Update the Lambda functions to handle API Gateway events:
   - Modify the `lambda_handler` functions to extract parameters from the `event` object.
   - Format responses to include proper status codes and CORS headers.

2. Update the frontend components to use Amplify for API calls:
   - Replace any mock data or placeholder functions with actual API calls.
   - Handle loading states and errors appropriately.

3. Test the integration:
   - Start the frontend development server: `npm start`
   - Test each feature, ensuring data flows correctly between the frontend and backend.

4. Set up CloudWatch logs and metrics for monitoring:
   - Configure log groups for each Lambda function.
   - Set up custom metrics and alarms as needed.

## Deployment

1. Frontend:
   - Build the production version: `npm run build`
   - Deploy the built files to your hosting service (e.g., AWS S3, Netlify, Vercel)

2. Backend:
   - Ensure all Lambda functions are deployed and up-to-date.
   - Verify API Gateway settings and redeploy if necessary.

## Security Considerations

1. Implement AWS Cognito for user authentication:
   - Set up a Cognito User Pool.
   - Configure the Amplify Auth module in the frontend.
   - Update Lambda functions to verify Cognito tokens.

2. Use IAM roles with least privilege principle for Lambda functions.

3. Encrypt sensitive data at rest and in transit.

4. Regularly review and rotate access keys and secrets.

## Monitoring and Maintenance

1. Set up CloudWatch dashboards for key metrics.

2. Configure alerts for abnormal behavior or errors.

3. Regularly review and optimize DynamoDB capacity and Lambda concurrency settings.

4. Keep all dependencies and runtime versions up-to-date.

5. Perform regular security audits and penetration testing.

## Troubleshooting

1. Check CloudWatch logs for Lambda function errors.

2. Verify API Gateway settings and test endpoints in the AWS Console.

3. Use browser developer tools to debug frontend issues and API calls.

4. Ensure proper CORS configuration if encountering cross-origin issues.

5. Verify AWS Cognito settings for authentication issues.

For any additional issues or questions, please refer to the AWS documentation or contact the development team.
