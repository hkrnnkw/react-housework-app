import React from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Role } from '../utils/types';
import { useDispatchHouse, useHouse } from '../contexts/houses';
import { getDateObj } from '../handlers/logsHandler';

const TodoList: React.FC = () => {
  const { currentDate, currentHouse, houses, user } = useHouse();
  const { switchRoleStatus } = useDispatchHouse();
  if (!user || !currentHouse) return null;

  const { logs } = houses[currentHouse.id];
  const { yyyy, mm, dd } = getDateObj(currentDate);
  const roles: Role[] = logs[yyyy][mm][dd] ?? [];

  const handleToggle = async (houseworkId: string) => {
    await switchRoleStatus(houseworkId);
  };

  return (
    <List>
      {roles.map(({ houseworkId, memberId, isCompleted }, i) => (
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
