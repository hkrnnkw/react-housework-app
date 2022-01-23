import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { RootState } from '../stores';
import { changeDate } from '../stores/houses';

const DateDisplay: React.FC = () => {
  const dispatch = useDispatch();
  const { currentDate } = useSelector(
    (rootState: RootState) => rootState.houses
  );

  const handleDateChange = (to: 'prev' | 'next') => {
    dispatch(changeDate(to));
  };

  const makeDate = () => {
    const dt = new Date(currentDate);
    const year = dt.getFullYear();
    const month = dt.getMonth() + 1;
    const day = dt.getDate();
    return `${year} / ${month} / ${day}`;
  };

  return (
    <div style={{ display: 'flex' }}>
      <IconButton
        color="primary"
        aria-label="left"
        component="span"
        onClick={() => handleDateChange('prev')}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Typography variant="h5">{makeDate()}</Typography>
      <IconButton
        color="primary"
        aria-label="right"
        component="span"
        onClick={() => handleDateChange('next')}
      >
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
};

export default DateDisplay;
