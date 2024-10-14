import json
import boto3
import os
from botocore.exceptions import ClientError

bedrock_runtime = boto3.client('bedrock-runtime')
dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table(os.environ['USER_TABLE_NAME'])

def lambda_handler(event, context):
    try:
        # Extract user ID from the event (API Gateway request)
        user_id = event['queryStringParameters']['userId']
        
        user = user_table.get_item(Key={'userId': user_id})['Item']
        age = user['age']
        financial_profile = user['financialProfile']

        prompt = f"""Given a {age}-year-old user with the following financial profile:
        {json.dumps(financial_profile, indent=2)}
        
        Suggest 5-7 personalized financial goals based on their life stage and financial situation. For each goal, provide:
        1. A specific name
        2. A default target amount
        3. A default time period in months
        4. A brief explanation of why this goal is suitable
        5. A category (e.g., Savings, Investment, Debt Reduction, Retirement, Education, Home Ownership)
        6. 2-3 actionable steps to achieve this goal

        Consider the following aspects:
        - Short-term, medium-term, and long-term goals
        - Emergency fund creation
        - Debt management (if applicable)
        - Retirement planning
        - Major life events (e.g., buying a home, starting a family, education)
        - Investment diversification

        Format the response as a JSON array of objects, each with 'name', 'defaultAmount', 'defaultPeriod', 'explanation', 'category', and 'steps' properties."""

        response = bedrock_runtime.invoke_model(
            modelId='anthropic.claude-3-sonnet-20240229-v1:0',
            body=json.dumps({
                'anthropic_version': 'bedrock-2023-05-31',
                'max_tokens': 2500,
                'messages': [{'role': 'user', 'content': prompt.strip()}],
                'temperature': 0.7,
                'top_p': 0.95
            }),
            contentType='application/json'
        )

        suggestions = json.loads(response['body'])['content'][0]['text']
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            },
            'body': json.dumps(suggestions)
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            },
            'body': json.dumps({'error': str(e)})
        }
