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
import { setLogToFirestore } from '../handlers/firestoreHandler';

type Props = {
  uid: string;
};

const TodoList: React.FC<Props> = ({ uid }) => {
  const dispatch = useDispatch();
  const { currentDate, currentHouse } = useSelector(
    (rootState: RootState) => rootState.houses
  );
  const [dailyRoles, setDailyRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (!currentHouse) return;
    const date = new Date(currentDate);
    const yearNum = date.getFullYear();
    const monthNum = date.getMonth();
    const dayNum = date.getDate();
    const roles: Role[] = currentHouse.logs[yearNum][monthNum][dayNum] ?? [];
    setDailyRoles(roles);
  }, [currentDate, currentHouse]);

  const handleToggle = async (houseworkId: string) => {
    if (!currentHouse) return;
    dispatch(switchRoleStatus(houseworkId));
    try {
      await setLogToFirestore(houseworkId, currentHouse, currentDate);
    } catch (e) {
      dispatch(switchRoleStatus(houseworkId));
    }
  };

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
