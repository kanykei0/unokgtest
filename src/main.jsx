import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { client } from './client.js'
import { ApolloProvider } from '@apollo/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider> 
  </React.StrictMode>,
)
