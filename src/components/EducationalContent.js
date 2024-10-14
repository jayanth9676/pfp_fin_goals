import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function EducationalContent({ content }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Educational Content
      </Typography>
      <List>
        {content.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.title}
              secondary={item.description}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default EducationalContent;
