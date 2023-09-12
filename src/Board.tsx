import React, { useState, useEffect } from 'react';
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
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (animals[firstIndex].name === animals[secondIndex].name) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 1000);
      }
    }
  }, [flippedCards]);

  return (
    <div className="board flex flex-wrap justify-center">
      {showCelebration && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="animate-pulse text-3xl font-bold text-green-500">
            Match!
          </div>
        </div>
      )}
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
