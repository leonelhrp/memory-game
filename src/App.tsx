import React, { useState, useEffect } from 'react';
import Board from './Board';

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const App: React.FC = () => {
  const [animals, setAnimals] = useState<{ url: string; name: string }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [guessedCards, setGuessedCards] = useState<number[]>([]);
  const [errors, setErrors] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);
  const [match, setMatch] = useState<Boolean>(false);

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
      shuffleArray(duplicatedAnimals);
      setAnimals(duplicatedAnimals);
    };

    fetchAnimals();
  }, []);

  const onCardClick = (index: number) => {
    if (flippedCards.length === 1) {
      const [firstIndex] = flippedCards;

      if (
        animals[firstIndex].name === animals[index].name &&
        firstIndex !== index
      ) {
        setMatch(true);
        setMatches(matches + 1);
        setGuessedCards([...guessedCards, firstIndex, index]);
        setFlippedCards([]);
      } else {
        setMatch(false);
        setErrors(errors + 1);
        setFlippedCards([firstIndex, index]);
      }
    } else {
      setFlippedCards([index]);
    }
  };

  return (
    <div className="app bg-gray-100 min-h-screen py-8">
      <h1 className="text-center text-2xl font-bold mb-4">Memory Game</h1>
      <div className="text-center mb-4">
        <span className="mr-4">Errors: {errors}</span>
        <span>Matches: {matches}</span>
      </div>
      <Board
        animals={animals}
        flippedCards={flippedCards.concat(guessedCards)}
        onCardClick={onCardClick}
        match={match}
      />
      {matches === animals.length / 2 && (
        <div className="text-center mt-4 text-2xl font-bold">
          Congratulations!
        </div>
      )}
    </div>
  );
};

export default App;
