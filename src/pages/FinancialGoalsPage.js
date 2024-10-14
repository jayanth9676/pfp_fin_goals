import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/system';
import GoalSuggestion from '../components/GoalSuggestion';
import GoalCustomization from '../components/GoalCustomization';
import InvestmentOptions from '../components/InvestmentOptions';
import FinancialCalculators from '../components/FinancialCalculators';
import CreditCardSuggestions from '../components/CreditCardSuggestions';
import SpendingHabitsAnalysis from '../components/SpendingHabitsAnalysis';
import AIGeneratedQuest from '../components/AIGeneratedQuest';
import EducationalContent from '../components/EducationalContent';
// import { API } from '@aws-amplify/api';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function FinancialGoalsPage() {
  const [user, setUser] = useState(null);
  const [suggestedGoals, setSuggestedGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [aiQuest, setAiQuest] = useState(null);
  const [educationalContent, setEducationalContent] = useState(null);
  const [openEducationDialog, setOpenEducationDialog] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchFinancialGoalSuggestions();
    fetchAIQuest();
    fetchEducationalContent();
  }, []);

  const fetchUserData = async () => {
    try {
      // Commented out AWS Amplify API call
      // const userData = await API.get('FinancialGoalsAPI', '/user');
      // setUser(userData);

      // Mock user data for demonstration
      setUser({
        id: '123456',
        name: 'John Doe',
        age: 30,
        income: 75000
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchFinancialGoalSuggestions = async () => {
    try {
      // Mock goal suggestions for demonstration
      setSuggestedGoals([
        { id: 1, name: 'Emergency Fund', category: 'Savings', defaultAmount: 10000, defaultPeriod: 12 },
        { id: 2, name: 'Retirement', category: 'Investment', defaultAmount: 500000, defaultPeriod: 360 },
        { id: 3, name: 'Down Payment for a House', category: 'Savings', defaultAmount: 50000, defaultPeriod: 60 },
        { id: 4, name: 'Children Education Fund', category: 'Investment', defaultAmount: 100000, defaultPeriod: 216 },
        { id: 5, name: 'Debt Repayment', category: 'Debt', defaultAmount: 20000, defaultPeriod: 24 },
        { id: 6, name: 'Travel Fund', category: 'Savings', defaultAmount: 5000, defaultPeriod: 12 },
        { id: 7, name: 'Start a Business', category: 'Investment', defaultAmount: 50000, defaultPeriod: 36 },
        { id: 8, name: 'Buy a Car', category: 'Savings', defaultAmount: 30000, defaultPeriod: 48 },
      ]);
    } catch (error) {
      console.error('Error fetching financial goal suggestions:', error);
    }
  };

  const fetchAIQuest = async () => {
    try {
      // Commented out AWS Amplify API call
      // const quest = await API.get('FinancialGoalsAPI', '/ai-quest');
      // setAiQuest(quest);

      // Mock AI quest for demonstration
      setAiQuest({
        title: "Eco-Friendly Investing Challenge",
        description: "Invest $500 in green energy stocks or funds this month.",
        duration: 30,
        difficulty: "Medium",
        impactArea: "Sustainable Investing",
        reward: "Unlock exclusive sustainable investment options"
      });
    } catch (error) {
      console.error('Error fetching AI quest:', error);
    }
  };

  const fetchEducationalContent = async () => {
    try {
      // Commented out AWS Amplify API call
      // const content = await API.get('FinancialGoalsAPI', '/educational-content');
      // setEducationalContent(content);

      // Mock educational content for demonstration
      setEducationalContent([
        { id: 1, title: "Basics of Budgeting", description: "Learn how to create and stick to a budget." },
        { id: 2, title: "Introduction to Investing", description: "Understand different investment options and strategies." },
        // Add more mock educational content as needed
      ]);
    } catch (error) {
      console.error('Error fetching educational content:', error);
    }
  };

  const handleGoalSelection = (goal) => {
    setSelectedGoal(goal);
  };

  const handleGoalCustomization = async (customizedGoal) => {
    try {
      // Commented out AWS Amplify API call
      // const savedGoal = await API.post('FinancialGoalsAPI', '/save-financial-goal', {
      //   body: { userId: user.id, goalDetails: customizedGoal }
      // });
      // setSelectedGoal(savedGoal);

      // Mock saving the goal for demonstration
      console.log('Goal saved:', customizedGoal);
      setSelectedGoal(customizedGoal);
    } catch (error) {
      console.error('Error saving customized goal:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Financial Goals
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <GoalSuggestion goals={suggestedGoals} onSelectGoal={handleGoalSelection} />
            </CardContent>
          </StyledCard>
          {selectedGoal && (
            <>
              <StyledCard>
                <CardContent>
                  <GoalCustomization 
                    goal={selectedGoal}
                    onCustomize={handleGoalCustomization}
                  />
                </CardContent>
              </StyledCard>
              <StyledCard>
                <CardContent>
                  <InvestmentOptions goal={selectedGoal} />
                </CardContent>
              </StyledCard>
              <StyledCard>
                <CardContent>
                  <FinancialCalculators goal={selectedGoal} />
                </CardContent>
              </StyledCard>
              <StyledCard>
                <CardContent>
                  <CreditCardSuggestions goal={selectedGoal} />
                </CardContent>
              </StyledCard>
            </>
          )}
          <StyledCard>
            <CardContent>
              <AIGeneratedQuest quest={aiQuest} />
            </CardContent>
          </StyledCard>
          <Button variant="outlined" onClick={() => setOpenEducationDialog(true)}>
            Learn More About Financial Planning
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <SpendingHabitsAnalysis />
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
      <Dialog open={openEducationDialog} onClose={() => setOpenEducationDialog(false)}>
        <DialogTitle>Financial Education</DialogTitle>
        <DialogContent>
          <EducationalContent content={educationalContent} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEducationDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default FinancialGoalsPage;
