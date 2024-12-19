import React, { useState } from 'react';
import ResultDisplay from './ResultDisplay';

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const handleNumberClick = (num: number) => {
    setExpression(prev => prev + num);
    setResult(null);
  };

  const handleOperatorClick = (operator: string) => {
    setExpression(prev => prev + operator);
    setResult(null);
  };

  const calculateResult = () => {
    try {
      // Using Function constructor to safely evaluate the mathematical expression
      const calculatedResult = new Function('return ' + expression)();
      setResult(calculatedResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="w-64 bg-white p-4 rounded-xl shadow-lg">
      <ResultDisplay expression={expression} result={result} />
      
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg text-xl"
          >
            {num}
          </button>
        ))}
        
        <button
          onClick={() => handleNumberClick(0)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg text-xl"
        >
          0
        </button>
        
        <button
          onClick={() => handleOperatorClick('+')}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 rounded-lg text-xl"
        >
          +
        </button>
        
        <button
          onClick={() => handleOperatorClick('-')}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 rounded-lg text-xl"
        >
          -
        </button>
        
        <button
          onClick={calculateResult}
          className="col-span-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg text-xl mt-2"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;