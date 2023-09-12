import React, { useState, useEffect } from 'react';
import Card from './Card.tsx';

interface BoardProps {
  animals: { url: string; name: string }[];
  flippedCards: number[];
  onCardClick: (index: number) => void;
  match: Boolean;
}

const Board: React.FC<BoardProps> = ({
  animals,
  flippedCards,
  onCardClick,
  match,
}) => {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (match) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1000);
    }
  }, [match]);

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
