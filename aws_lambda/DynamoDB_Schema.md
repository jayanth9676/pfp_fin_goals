# DynamoDB Schema

## Users Table

- Partition Key: userId (String)
- Attributes:
  - age (Number)
  - financialProfile (Map)
    - income (Number)
    - expenses (Number)
    - savings (Number)
    - debt (Number)
    - creditScore (Number)
  - createdAt (String - ISO8601 timestamp)
  - updatedAt (String - ISO8601 timestamp)

## Financial Goals Table

- Partition Key: userId (String)
- Sort Key: goalId (String)
- Attributes:
  - name (String)
  - targetAmount (Number)
  - currentAmount (Number)
  - startDate (String - ISO8601 timestamp)
  - endDate (String - ISO8601 timestamp)
  - status (String - 'active', 'completed', 'abandoned')
  - category (String)
  - createdAt (String - ISO8601 timestamp)
  - updatedAt (String - ISO8601 timestamp)

## Transactions Table

- Partition Key: userId (String)
- Sort Key: transactionId (String)
- Attributes:
  - amount (Number)
  - category (String)
  - description (String)
  - date (String - ISO8601 timestamp)
  - type (String - 'income', 'expense')

## Investment Options Table

- Partition Key: optionId (String)
- Attributes:
  - name (String)
  - type (String)
  - riskLevel (String - 'low', 'medium', 'high')
  - potentialReturn (String)
  - minimumInvestment (Number)
  - description (String)

## Credit Cards Table

- Partition Key: cardId (String)
- Attributes:
  - name (String)
  - issuer (String)
  - annualFee (Number)
  - rewardsType (String)
  - rewardsRate (String)
  - apr (String)
  - creditScoreRequired (String)
  - benefits (List of Strings)