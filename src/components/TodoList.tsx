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
import { Role } from '../utils/types';
import { switchRoleStatus } from '../stores/houses';

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
    if (!houseOnDisplay) return;
    const date = new Date(selectingDate);
    const yearNum = date.getFullYear();
    const monthNum = date.getMonth();
    const dayNum = date.getDate();
    const roles: Role[] = houseOnDisplay.logs[yearNum][monthNum][dayNum] ?? [];
    setDailyRoles(roles);
  }, [selectingDate, houseOnDisplay]);

  const handleToggle = (houseworkId: string) => () => {
    dispatch(switchRoleStatus(houseworkId));
  };

  return (
    <List>
      {dailyRoles.map(({ houseworkId, memberId, isCompleted }, i) => (
        <ListItem
          key={`${houseworkId}-${i}`} // eslint-disable-line react/no-array-index-key
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
