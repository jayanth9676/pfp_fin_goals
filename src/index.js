import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Amplify } from 'aws-amplify';
// import { API } from '@aws-amplify/api';

// Commented out Amplify configuration
// Amplify.configure({
//   API: {
//     endpoints: [
//       {
//         name: "FinancialGoalsAPI",
//         endpoint: "https://your-api-id.execute-api.your-region.amazonaws.com/prod"
//       }
//     ]
//   }
// });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
