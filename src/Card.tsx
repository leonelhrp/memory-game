import React from 'react';

interface CardProps {
  animal: { url: string; name: string };
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ animal, isFlipped, onClick }) => {
  return (
    <div
      className="card m-2 w-32 h-48 bg-gray-300 rounded shadow-lg cursor-pointer"
      onClick={onClick}
    >
      {isFlipped ? (
        <img
          src={animal.url}
          alt={animal.name}
          className="w-full h-full rounded"
        />
      ) : (
        <div className="card-back w-full h-full bg-blue-500 rounded"></div>
      )}
    </div>
  );
};

export default Card;
