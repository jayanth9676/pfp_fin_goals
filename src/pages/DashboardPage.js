import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Button, List, ListItem, ListItemText, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import GaugeComponent from 'react-gauge-component';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StyledCard = styled(Card)`
  height: 99%;
`;

const ScrollableCardContent = styled(CardContent)`
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const GifBox = styled(Box)`
  width: 100%;
  height: 150px;
  background-size: cover;
  background-position: center;
  margin-bottom: 16px;
`;

function DashboardPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    // This would typically be an API call. For now, we'll use mock data.
    const storedCreditScore = localStorage.getItem('userCreditScore');
    console.log('Retrieved Credit Score:', storedCreditScore);
    
    const mockUserData = {
      creditScore: storedCreditScore, // Use the stored credit score or default to 750
      marketingCampaigns: [
        { 
          id: 1, 
          title: 'Summer Home Loan Special', 
          description: 'Low rates for your dream home!', 
          cta: 'Learn More',
          gifUrl: 'https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif'
        },
        { 
          id: 2, 
          title: 'Quick Cash Loans', 
          description: 'Get approved in minutes!', 
          cta: 'Apply Now',
          gifUrl: 'https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif'
        },
        { 
          id: 3, 
          title: 'Credit Card Rewards Bonanza', 
          description: 'Earn 5x points on all purchases this month!', 
          cta: 'See Offers',
          gifUrl: 'https://media.giphy.com/media/3oKIPa2TdahY8LAAxy/giphy.gif'
        },
      ],
      financialHealth: {
        savings: 15000,
        debt: 5000,
        monthlyIncome: 5000,
        monthlyExpenses: 3500
      },
      financialGoals: [
        { name: 'Save for a down payment', progress: 0.5 },
        { name: 'Pay off credit card debt', progress: 0.8 },
        { name: 'Increase emergency fund', progress: 0.2 }
      ],
      recentTransactions: [
        { date: '2023-05-01', description: 'Grocery Store', amount: -120.50 },
        { date: '2023-04-30', description: 'Salary Deposit', amount: 2500.00 },
        { date: '2023-04-29', description: 'Electric Bill', amount: -85.20 },
      ]
    };

    setUserData(mockUserData);
  };

  if (!userData) return <div>Loading...</div>;

  const financialHealthData = [
    { name: 'Savings', value: userData.financialHealth.savings },
    { name: 'Debt', value: userData.financialHealth.debt },
    { name: 'Monthly Income', value: userData.financialHealth.monthlyIncome },
    { name: 'Monthly Expenses', value: userData.financialHealth.monthlyExpenses },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Container maxWidth="lg" sx={{ mt: '10vh' }}>
      <Typography variant="h3" gutterBottom>
        Welcome!
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledCard sx={{ height: '30%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Credit Score
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <GaugeComponent
                    type="semicircle"
                    arc={{
                      width: 0.2,
                      padding: 0.005,
                      cornerRadius: 1,
                      subArcs: [
                        { limit: 580, color: '#EA4228', showTick: true },
                        { limit: 670, color: '#F5CD19', showTick: true },
                        { limit: 850, color: '#5BE12C', showTick: true },
                      ]
                    }}
                    pointer={{
                      color: '#345243',
                      length: 0.80,
                      width: 15,
                    }}
                    labels={{
                      valueLabel: { hide: true },
                      tickLabels: {
                        type: 'outer',
                        ticks: [
                          { value: 300 },
                          { value: 580 },
                          { value: 670 },
                          { value: 850 }
                        ],
                      }
                    }}
                    value={userData.creditScore}
                    minValue={300}
                    maxValue={850}
                  />
                </Box>
              </Box>
              <Typography variant="h4" align="center">
                {userData.creditScore}
              </Typography>
            </CardContent>
          </StyledCard>
          <StyledCard sx={{ height: '25%', mt: 2 }}>
            <ScrollableCardContent>
              <Typography variant="h6" gutterBottom>
                Financial Health
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={financialHealthData}
                    cx="40%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {financialHealthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    wrapperStyle={{ paddingLeft: '20px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ScrollableCardContent>
          </StyledCard>
          <StyledCard sx={{ height: '20%', mt: 2 }}>
            <ScrollableCardContent>
              <Typography variant="h6" gutterBottom>
                Financial Goals
              </Typography>
              {userData.financialGoals.map((goal, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body2">{goal.name}</Typography>
                  <LinearProgress variant="determinate" value={goal.progress * 100} sx={{ mt: 1 }} />
                  <Typography variant="body2" align="right">{`${(goal.progress * 100).toFixed(0)}%`}</Typography>
                </Box>
              ))}
            </ScrollableCardContent>
          </StyledCard>
          <StyledCard sx={{ height: '20%', mt: 2 }}>
            <ScrollableCardContent>
              <Typography variant="h6" gutterBottom>
                Recent Transactions
              </Typography>
              <List dense>
                {userData.recentTransactions.map((transaction, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={transaction.description}
                      secondary={`${transaction.date} | $${transaction.amount.toFixed(2)}`}
                    />
                  </ListItem>
                ))}
              </List>
            </ScrollableCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Loan Offers
              </Typography>
              {userData.marketingCampaigns.map((campaign) => (
                <Box key={campaign.id} sx={{ mb: 4 }}>
                  <GifBox style={{ backgroundImage: `url(${campaign.gifUrl})` }} />
                  <Typography variant="subtitle1">
                    {campaign.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {campaign.description}
                  </Typography>
                  <Button variant="contained" color="primary" size="small" sx={{ mt: 1 }}>
                    {campaign.cta}
                  </Button>
                </Box>
              ))}
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardPage;