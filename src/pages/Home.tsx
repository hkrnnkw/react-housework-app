import React from 'react'
import SignIn from '../components/SignIn'
import StyledPaper from '../components/atoms/StyledPaper'
import DateDisplay from '../components/DateDisplay'
import TodoList from '../components/TodoList'
import { useHouse } from '../contexts/houses'

const Home: React.FC = () => {
  const { user } = useHouse()

  if (!user) return <SignIn />
  return (
    <StyledPaper>
      <DateDisplay />
      <TodoList />
    </StyledPaper>
  )
}

export default Home
