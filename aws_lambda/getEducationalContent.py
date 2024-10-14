import json
import boto3
import os
from botocore.exceptions import ClientError

bedrock_runtime = boto3.client('bedrock-runtime')
s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        user_id = event['userId']
        user_goals = event['userGoals']

        # Fetch educational content from S3
        response = s3.get_object(Bucket=os.environ['EDUCATIONAL_CONTENT_BUCKET'], Key='financial_literacy/modules.json')
        modules = json.loads(response['Body'].read().decode('utf-8'))

        # Use Bedrock to personalize educational content
        prompt = f"""Given a user with the following financial goals:
        {json.dumps(user_goals, indent=2)}

        And the following educational modules:
        {json.dumps(modules, indent=2)}

        Recommend 3-5 educational modules that would be most relevant and beneficial for this user.
        For each recommended module, provide a brief explanation of why it's relevant to the user's goals.

        Format the response as a JSON array of objects, each with 'moduleId', 'title', 'description', and 'relevance' properties."""

        response = bedrock_runtime.invoke_model(
            modelId='anthropic.claude-3-sonnet-20240229-v1:0',
            body=json.dumps({
                'anthropic_version': 'bedrock-2023-05-31',
                'max_tokens': 1500,
                'messages': [{'role': 'user', 'content': prompt.strip()}],
                'temperature': 0.7,
                'top_p': 0.95
            }),
            contentType='application/json'
        )

        personalized_modules = json.loads(response['body'])['content'][0]['text']
        return {
            'statusCode': 200,
            'body': personalized_modules
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
