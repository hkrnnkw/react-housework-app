import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../stores';
import StyledPaper from '../components/atoms/StyledPaper';

const HouseworkItem: React.FC = () => {
  const { id } = useLocation().state as { id: string };
  const { currentHouse } = useSelector(
    (rootState: RootState) => rootState.houses
  );

  if (!currentHouse) return null;
  return (
    <StyledPaper>
      <p>{id}</p>
    </StyledPaper>
  );
};

export default HouseworkItem;
