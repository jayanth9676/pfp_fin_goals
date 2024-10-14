import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function CreditCardSuggestions({ goal }) {
  // This is a simplified version. In a real application, you'd fetch this data from an API
  const creditCards = [
    { name: 'Cash Back Rewards Card', benefit: '2% cash back on all purchases' },
    { name: 'Travel Rewards Card', benefit: '3x points on travel and dining' },
    { name: 'Low Interest Card', benefit: '0% APR for 18 months' },
  ];

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Recommended Credit Cards
      </Typography>
      <List>
        {creditCards.map((card, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={card.name}
              secondary={card.benefit}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default CreditCardSuggestions;
