import React from 'react'
import ReactDOM from 'react-dom/client'
import Page from './page' // ou App se você renomeou

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
)