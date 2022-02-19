import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Role } from '../utils/types';
import { setLogToFirestore } from '../handlers/firestoreHandler';
import { useDispatchHouse, useHouse } from '../contexts/houses';

const TodoList: React.FC = () => {
  const { currentDate, currentHouseId, houses, user } = useHouse();
  const { switchRoleStatus } = useDispatchHouse();
  const [dailyRoles, setDailyRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (!currentHouseId) return;
    const date = new Date(currentDate);
    const yearNum = date.getFullYear();
    const monthNum = date.getMonth();
    const dayNum = date.getDate();
    const roles: Role[] =
      houses[currentHouseId].logs[yearNum][monthNum][dayNum] ?? [];
    setDailyRoles(roles);
  }, [currentDate, currentHouseId, houses]);

  const handleToggle = async (houseworkId: string) => {
    if (!currentHouseId) return;
    switchRoleStatus(houseworkId);
    try {
      const { logs } = houses[currentHouseId];
      await setLogToFirestore(currentHouseId, logs);
    } catch (e) {
      switchRoleStatus(houseworkId);
    }
  };

  if (!user) return null;
  return (
    <List>
      {dailyRoles.map(({ houseworkId, memberId, isCompleted }, i) => (
        <ListItem
          key={`${houseworkId}-${i}`} // eslint-disable-line react/no-array-index-key
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={() => handleToggle(houseworkId)}
              checked={isCompleted}
              inputProps={{ 'aria-labelledby': houseworkId }}
            />
          }
          disablePadding
          style={{
            backgroundColor: memberId === user.uid ? '#DDDDFF' : '#FFFFFF',
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
