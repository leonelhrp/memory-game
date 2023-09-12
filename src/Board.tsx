import React from 'react';
import Card from './Card.tsx';

interface BoardProps {
  animals: { url: string; name: string }[];
  flippedCards: number[];
  onCardClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({
  animals,
  flippedCards,
  onCardClick,
}) => {
  return (
    <div className="board flex flex-wrap justify-center mt-10">
      {animals.map((animal, index) => (
        <Card
          key={index}
          animal={animal}
          isFlipped={flippedCards.includes(index)}
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
