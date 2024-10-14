import json
import boto3
import os
from botocore.exceptions import ClientError

bedrock_runtime = boto3.client('bedrock-runtime')
dynamodb = boto3.resource('dynamodb')
transactions_table = dynamodb.Table(os.environ['TRANSACTIONS_TABLE_NAME'])

def lambda_handler(event, context):
    try:
        user_id = event['userId']
        transactions = transactions_table.query(
            KeyConditionExpression='userId = :userId',
            ExpressionAttributeValues={':userId': user_id}
        )['Items']

        transaction_data = json.dumps(transactions)
        prompt = f"""Analyze the following transaction data and provide insights on spending habits:
        {transaction_data}

        1. Identify the top 5 spending categories and their total amounts.
        2. Calculate the average monthly spending.
        3. Identify any unusual or high-value transactions.
        4. Provide 3-5 personalized recommendations for reducing expenses or improving savings.
        5. Generate data for a spending habits graph, showing spending by category over time.

        Format the response as a JSON object with the following properties:
        'topCategories', 'averageMonthlySpending', 'unusualTransactions', 'recommendations', and 'graphData'."""

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

        analysis = json.loads(response['body'])['content'][0]['text']
        return {
            'statusCode': 200,
            'body': analysis
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }