import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';
import { Day, Month, Role } from '../utils/types';

type Props = {
  uid: string;
};

const TodoList: React.FC<Props> = ({ uid }) => {
  const dispatch = useDispatch();
  const { selectingDate, houseOnDisplay } = useSelector(
    (rootState: RootState) => rootState.houses
  );
  const [dailyRoles, setDailyRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (!selectingDate || !houseOnDisplay) return;
    const date = new Date(selectingDate);
    const year = date.getFullYear();
    const monthNum = date.getMonth() + 1;
    const month: Month = houseOnDisplay.logs[year] ?? {
      [monthNum]: {} as Day,
    };
    const day: Day = month[monthNum];
    const dayNum = date.getDate();
    const roles: Role[] = day[dayNum] ?? [];
    setDailyRoles(roles);
  }, [selectingDate, houseOnDisplay, dispatch]);

  const handleToggle = (houseworkId: string) => () => {
    // @todo update dailyRolls
  };

  return (
    <List>
      {dailyRoles.map(({ houseworkId, memberId, isCompleted }) => (
        <ListItem
          key={houseworkId}
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={handleToggle(houseworkId)}
              checked={isCompleted}
              inputProps={{ 'aria-labelledby': houseworkId }}
            />
          }
          disablePadding
          style={{
            backgroundColor: memberId === uid ? '#DDDDFF' : '#FFFFFF',
          }}
        >
          <ListItemButton>
            <ListItemText
              id={houseworkId}
              primary={houseworkId}
              secondary={memberId}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
