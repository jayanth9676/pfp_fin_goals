import json
import boto3
import os
from botocore.exceptions import ClientError

bedrock_runtime = boto3.client('bedrock-runtime')
dynamodb = boto3.resource('dynamodb')
investment_options_table = dynamodb.Table(os.environ['INVESTMENT_OPTIONS_TABLE_NAME'])

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        goal_type = body['goalType']
        amount = body['amount']
        timeframe = body['timeframe']
        risk_tolerance = body.get('riskTolerance', 'moderate')

        # Get general investment options from DynamoDB
        response = investment_options_table.scan()
        general_options = response['Items']

        # Use Bedrock to personalize and rank these options
        prompt = f"""Given a financial goal of type '{goal_type}' with a target amount of ${amount} 
        and a timeframe of {timeframe} months, and a {risk_tolerance} risk tolerance, 
        analyze and rank the following investment options:

        {json.dumps(general_options, indent=2)}

        Consider the following factors:
        1. The goal type and its implications for investment strategy
        2. The time horizon and how it affects risk tolerance
        3. The user's stated risk tolerance
        4. Diversification principles
        5. Historical performance and volatility of each option
        6. Fees and expenses associated with each option
        7. Tax implications of each option

        Provide a personalized analysis for each option, explaining its suitability for the given goal.
        Rank the options from most suitable to least suitable.
        For each option, include a 'suitabilityScore' from 0 to 100.

        Format the response as a JSON array of objects, each with 'name', 'risk', 'potentialReturn', 
        'suitabilityScore', 'analysis', and 'recommendedAllocation' properties."""

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

        personalized_options = json.loads(response['body'])['content'][0]['text']
        return {
            'statusCode': 200,
            'body': personalized_options
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
