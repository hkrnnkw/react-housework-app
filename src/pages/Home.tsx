import React from 'react'
import StyledPaper from '../components/atoms/StyledPaper'
import DateDisplay from '../components/DateDisplay'
import TodoList from '../components/TodoList'

const Home: React.FC = () => (
  <StyledPaper>
    <DateDisplay />
    <TodoList />
  </StyledPaper>
)

export default Home
