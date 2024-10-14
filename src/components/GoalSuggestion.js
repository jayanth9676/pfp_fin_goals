import React from 'react';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';

function GoalSuggestion({ goals, onSelectGoal }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Suggested Financial Goals
      </Typography>
      <List>
        {goals.map((goal, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={goal.name}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    ${goal.defaultAmount} in {goal.defaultPeriod} months
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textSecondary">
                    {goal.explanation}
                  </Typography>
                </>
              }
            />
            <Button variant="outlined" onClick={() => onSelectGoal(goal)}>
              Select
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default GoalSuggestion;
