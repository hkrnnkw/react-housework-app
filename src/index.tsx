import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { UserProvider } from './contexts/user'
import { HouseProvider } from './contexts/houses'

ReactDOM.render(
  <UserProvider>
    <HouseProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </HouseProvider>
  </UserProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
