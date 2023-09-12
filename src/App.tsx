import React, { useState, useEffect } from 'react';
import Board from './Board';

const App: React.FC = () => {
  const [animals, setAnimals] = useState<{ url: string; name: string }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      const response = await fetch(
        'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20'
      );
      const data = await response.json();

      const animalsData = data.entries.map((entry: any) => {
        return {
          url: entry.fields.image.url,
          name: entry.meta.name,
        };
      });

      const duplicatedAnimals = [...animalsData, ...animalsData];
      setAnimals(duplicatedAnimals);
    };

    fetchAnimals();
  }, []);

  const onCardClick = (index: number) => {
    if (flippedCards.length === 2) {
      setFlippedCards([]);
    } else {
      setFlippedCards([...flippedCards, index]);
    }
  };

  return (
    <div className="app bg-gray-100 min-h-screen py-8">
      <h1 className="text-center text-2xl font-bold mb-4">Memory Game</h1>
      <Board
        animals={animals}
        flippedCards={flippedCards}
        onCardClick={onCardClick}
      />
    </div>
  );
};

export default App;
