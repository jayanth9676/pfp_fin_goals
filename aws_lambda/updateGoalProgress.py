import json
import boto3
import os
from botocore.exceptions import ClientError
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
goals_table = dynamodb.Table(os.environ['GOALS_TABLE_NAME'])
sns = boto3.client('sns')
bedrock_runtime = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        user_id = body['userId']
        goal_id = body['goalId']
        progress = body['progress']

        response = goals_table.update_item(
            Key={'userId': user_id, 'goalId': goal_id},
            UpdateExpression='SET progress = :progress, lastUpdated = :lastUpdated',
            ExpressionAttributeValues={
                ':progress': progress,
                ':lastUpdated': datetime.now().isoformat()
            },
            ReturnValues='ALL_NEW'
        )

        updated_goal = response['Attributes']

        # Check if a milestone has been reached
        milestone_reached, milestone_percentage = is_milestone_reached(updated_goal)
        if milestone_reached:
            milestone_message = generate_milestone_message(updated_goal, milestone_percentage)
            sns.publish(
                TopicArn=os.environ['GOAL_MILESTONE_TOPIC_ARN'],
                Message=json.dumps({
                    'userId': user_id,
                    'goalId': goal_id,
                    'goalName': updated_goal['name'],
                    'progress': progress,
                    'milestonePercentage': milestone_percentage,
                    'milestoneMessage': milestone_message
                }),
                Subject='Financial Goal Milestone Reached'
            )

        # Generate feedback and next steps
        feedback = generate_feedback(updated_goal)

        return {
            'statusCode': 200,
            'body': json.dumps({
                'updatedGoal': updated_goal,
                'feedback': feedback,
                'milestoneReached': milestone_reached,
                'milestonePercentage': milestone_percentage if milestone_reached else None
            })
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

def is_milestone_reached(goal):
    progress_percentage = (goal['progress'] / goal['targetAmount']) * 100
    milestones = [25, 50, 75, 100]
    for milestone in milestones:
        if progress_percentage >= milestone and (progress_percentage - goal['progress']) < milestone:
            return True, milestone
    return False, None

def generate_milestone_message(goal, milestone_percentage):
    prompt = f"""Generate an encouraging message for a user who has reached a {milestone_percentage}% milestone 
    for their financial goal "{goal['name']}". The message should be motivating and provide a tip for maintaining momentum."""

    response = bedrock_runtime.invoke_model(
        modelId='anthropic.claude-3-sonnet-20240229-v1:0',
        body=json.dumps({
            'anthropic_version': 'bedrock-2023-05-31',
            'max_tokens': 150,
            'messages': [{'role': 'user', 'content': prompt.strip()}],
            'temperature': 0.7,
            'top_p': 0.95
        }),
        contentType='application/json'
    )

    return json.loads(response['body'])['content'][0]['text']

def generate_feedback(goal):
    progress_percentage = (goal['progress'] / goal['targetAmount']) * 100
    time_elapsed = (datetime.now() - datetime.fromisoformat(goal['createdAt'])).days
    total_days = (datetime.fromisoformat(goal['endDate']) - datetime.fromisoformat(goal['createdAt'])).days
    time_percentage = (time_elapsed / total_days) * 100

    prompt = f"""Given a financial goal with the following details:
    Name: {goal['name']}
    Category: {goal['category']}
    Progress: {progress_percentage:.2f}% (${goal['progress']} out of ${goal['targetAmount']})
    Time Elapsed: {time_percentage:.2f}% ({time_elapsed} days out of {total_days} days)

    Provide brief feedback on the user's progress and 2-3 actionable steps they can take to stay on track or improve their progress. 
    Consider whether they are ahead, behind, or on track with their goal."""

    response = bedrock_runtime.invoke_model(
        modelId='anthropic.claude-3-sonnet-20240229-v1:0',
        body=json.dumps({
            'anthropic_version': 'bedrock-2023-05-31',
            'max_tokens': 250,
            'messages': [{'role': 'user', 'content': prompt.strip()}],
            'temperature': 0.7,
            'top_p': 0.95
        }),
        contentType='application/json'
    )

    return json.loads(response['body'])['content'][0]['text']
