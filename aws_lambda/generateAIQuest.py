import json
import boto3
import os
from botocore.exceptions import ClientError

bedrock_runtime = boto3.client('bedrock-runtime')
dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table(os.environ['USER_TABLE_NAME'])
goals_table = dynamodb.Table(os.environ['GOALS_TABLE_NAME'])

def lambda_handler(event, context):
    try:
        user_id = event['userId']
        user = user_table.get_item(Key={'userId': user_id})['Item']
        financial_profile = user['financialProfile']

        # Get user's current goals
        goals = goals_table.query(
            KeyConditionExpression='userId = :userId',
            ExpressionAttributeValues={':userId': user_id}
        )['Items']

        prompt = f"""Generate a personalized financial quest for a user with the following profile:
        {json.dumps(financial_profile, indent=2)}

        The user's current financial goals are:
        {json.dumps(goals, indent=2)}

        Create an engaging and challenging quest that aligns with the user's financial situation and goals.
        The quest should be achievable within 1-4 weeks and provide a meaningful impact on their financial health.

        Format the response as a JSON object with the following properties:
        'title': A catchy title for the quest
        'description': A detailed description of the quest, including steps to complete it
        'duration': The suggested duration in days
        'difficulty': A difficulty rating (Easy, Medium, Hard)
        'reward': A description of the reward for completing the quest
        'impactArea': The area of financial health this quest impacts (e.g., Savings, Debt Reduction, Investment)"""

        response = bedrock_runtime.invoke_model(
            modelId='anthropic.claude-3-sonnet-20240229-v1:0',
            body=json.dumps({
                'anthropic_version': 'bedrock-2023-05-31',
                'max_tokens': 1500,
                'messages': [{'role': 'user', 'content': prompt.strip()}],
                'temperature': 0.8,
                'top_p': 0.95
            }),
            contentType='application/json'
        )

        quest = json.loads(response['body'])['content'][0]['text']
        return {
            'statusCode': 200,
            'body': quest
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }