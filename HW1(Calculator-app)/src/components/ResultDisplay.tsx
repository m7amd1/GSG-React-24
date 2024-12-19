import React from 'react';

interface ResultDisplayProps {
  expression: string;
  result: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ expression, result }) => {
  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg mb-4 text-right text-2xl font-mono">
      {expression} {result !== null && `= ${result}`}
    </div>
  );
};

export default ResultDisplay;