import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';

function AIGeneratedQuest({ quest }) {
  if (!quest) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          AI-Generated Financial Quest
        </Typography>
        <Typography variant="h5" gutterBottom>
          {quest.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {quest.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Duration: {quest.duration} days
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Difficulty: {quest.difficulty}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Impact Area: {quest.impactArea}
        </Typography>
        <Typography variant="body1" fontWeight="bold" gutterBottom>
          Reward: {quest.reward}
        </Typography>
        <Button variant="contained" color="primary">
          Accept Quest
        </Button>
      </CardContent>
    </Card>
  );
}

export default AIGeneratedQuest;
