import json
import boto3
import os
from botocore.exceptions import ClientError

bedrock_runtime = boto3.client('bedrock-runtime')
dynamodb = boto3.resource('dynamodb')
credit_cards_table = dynamodb.Table(os.environ['CREDIT_CARDS_TABLE_NAME'])
user_table = dynamodb.Table(os.environ['USER_TABLE_NAME'])

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        user_id = body['userId']
        financial_goals = body['financialGoals']

        # Get user profile
        user = user_table.get_item(Key={'userId': user_id})['Item']

        # Get all credit cards
        response = credit_cards_table.scan()
        all_cards = response['Items']

        # Use Bedrock to analyze and recommend credit cards
        prompt = f"""Given a user with the following profile:
        {json.dumps(user, indent=2)}

        And the following financial goals:
        {json.dumps(financial_goals, indent=2)}

        Analyze and recommend the most suitable credit cards from this list:
        {json.dumps(all_cards, indent=2)}

        Provide a personalized analysis for each recommended card, explaining its benefits 
        in relation to the user's profile and financial goals.
        Rank the cards from most suitable to least suitable.
        For each card, include a 'suitabilityScore' from 0 to 100.

        Format the response as a JSON array of objects, each with 'name', 'benefits', 
        'suitabilityScore', and 'analysis' properties."""

        response = bedrock_runtime.invoke_model(
            modelId='anthropic.claude-3-sonnet-20240229-v1:0',
            body=json.dumps({
                'anthropic_version': 'bedrock-2023-05-31',
                'max_tokens': 2000,
                'messages': [{'role': 'user', 'content': prompt.strip()}],
                'temperature': 0.7,
                'top_p': 0.95
            }),
            contentType='application/json'
        )

        recommended_cards = json.loads(response['body'])['content'][0]['text']
        return {
            'statusCode': 200,
            'body': recommended_cards
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }