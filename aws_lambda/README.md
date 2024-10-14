# Financial Goals Lambda Functions

This directory contains AWS Lambda functions for the Financial Goals feature of our application.

## Functions

1. `getFinancialGoalSuggestions.py`: Suggests personalized financial goals based on user profile.
2. `saveFinancialGoal.py`: Saves a new financial goal for a user.
3. `getInvestmentOptions.py`: Provides personalized investment options for a given goal.
4. `getCreditCardSuggestions.py`: Suggests credit cards based on user profile and financial goals.
5. `updateGoalProgress.py`: Updates the progress of a financial goal and checks for milestones.
6. `getSpendingHabitsAnalysis.py`: Analyzes user spending habits and provides insights.
7. `generateAIQuest.py`: Generates a personalized financial quest for the user.

## Setup and Deployment

1. Ensure you have the AWS CLI installed and configured with appropriate credentials.
2. Create a deployment package for each function, including any dependencies.
3. Create Lambda functions in the AWS Console or using the AWS CLI.
4. Set up environment variables for each function (e.g., DynamoDB table names, SNS topic ARNs).
5. Configure API Gateway to expose these Lambda functions as RESTful endpoints.
6. Set up appropriate IAM roles and permissions for each Lambda function.

## Integration Steps

1. Update the frontend React components to call these new API endpoints.
2. Implement error handling and loading states in the frontend.
3. Set up AWS Cognito for user authentication and pass the user ID to these Lambda functions.
4. Configure CloudWatch for monitoring and logging.
5. Set up SNS topics for notifications (e.g., goal creation, milestone achievements).
6. Implement a CI/CD pipeline for automated deployment of Lambda functions.

## Testing

1. Create unit tests for each Lambda function using a framework like pytest.
2. Set up integration tests to ensure proper interaction between Lambda functions and other AWS services.
3. Perform load testing to ensure the functions can handle expected traffic.

## Maintenance

1. Regularly review and update the AI prompts to improve the quality of suggestions and analysis.
2. Monitor CloudWatch logs and metrics to identify and resolve any issues.
3. Keep dependencies and runtime versions up to date.
4. Regularly backup DynamoDB tables and test the restoration process.