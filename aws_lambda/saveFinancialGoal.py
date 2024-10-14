import json
import boto3
import os
from botocore.exceptions import ClientError
from datetime import datetime
import uuid

dynamodb = boto3.resource('dynamodb')
goals_table = dynamodb.Table(os.environ['GOALS_TABLE_NAME'])
sns = boto3.client('sns')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        user_id = body['userId']
        goal_details = body['goalDetails']

        goal_id = str(uuid.uuid4())
        item = {
            'userId': user_id,
            'goalId': goal_id,
            'createdAt': datetime.now().isoformat(),
            'status': 'active',
            'progress': 0,
            'lastUpdated': datetime.now().isoformat(),
            **goal_details
        }

        goals_table.put_item(Item=item)

        # Publish a message to SNS topic for goal creation
        sns.publish(
            TopicArn=os.environ['GOAL_CREATION_TOPIC_ARN'],
            Message=json.dumps({
                'userId': user_id,
                'goalId': goal_id,
                'goalName': goal_details['name'],
                'category': goal_details['category'],
                'targetAmount': goal_details['targetAmount'],
                'endDate': goal_details['endDate']
            }),
            Subject='New Financial Goal Created'
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Goal saved successfully', 'goalId': goal_id})
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
