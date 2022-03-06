import React from 'react'
import { Link as RouterLink, Outlet } from 'react-router-dom'
import { Link, List } from '@mui/material'
import StyledPaper from '../components/atoms/StyledPaper'
import ListItem from '../components/atoms/ListItem'
import paths from '../utils/paths'
import { useHouse } from '../contexts/houses'

const HouseworkList: React.FC = () => {
  const { currentHouse, houses } = useHouse()

  if (!currentHouse || !houses) return null
  const { housework } = houses[currentHouse.id]

  return (
    <StyledPaper>
      <Outlet />
      <List>
        {Object.entries(housework).map(([key, value]) => (
          <Link
            key={key}
            component={RouterLink}
            to={`${paths.settings}${paths.houseworkList}/${key}`}
            state={{ id: key }}
          >
            <ListItem
              id={key}
              primaryText={value.title}
              secondaryText={value.points}
            />
          </Link>
        ))}
      </List>
    </StyledPaper>
  )
}

export default HouseworkList
