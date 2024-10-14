import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

function GoalCustomization({ goal, onCustomize }) {
  const [customizedGoal, setCustomizedGoal] = useState(goal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomizedGoal(prevGoal => ({
      ...prevGoal,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCustomize(customizedGoal);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Customize Your Goal
      </Typography>
      <TextField
        fullWidth
        label="Goal Name"
        name="name"
        value={customizedGoal.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Target Amount"
        name="targetAmount"
        type="number"
        value={customizedGoal.targetAmount}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Time Period (months)"
        name="timePeriod"
        type="number"
        value={customizedGoal.timePeriod}
        onChange={handleChange}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Save Goal
      </Button>
    </Box>
  );
}

export default GoalCustomization;
