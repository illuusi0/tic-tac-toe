import React from 'react';
import { CellValue } from '../../model/types';
import styles from './GameCell.module.css';

interface GameCellProps {
  value: CellValue;
  onClick: () => void;
}

const GameCell: React.FC<GameCellProps> = ({ value, onClick }) => {
  return (
    <button className={styles.cell} onClick={onClick}>
      {value}
    </button>
  );
};

export default GameCell;