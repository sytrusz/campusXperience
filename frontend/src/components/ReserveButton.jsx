import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => (props.isReserved ? '#181A2F' : '#B4182D')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const ReserveButton = ({ isReserved, onReserve }) => {
  return (
    <Button isReserved={isReserved} onClick={onReserve}>
      {isReserved ? 'Cancel Reservation' : 'Reserve'}
    </Button>
  );
};

export default ReserveButton;
