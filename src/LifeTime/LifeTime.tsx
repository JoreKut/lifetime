import React, {useState, ChangeEvent} from 'react';
import {differenceInWeeks} from 'date-fns';
import './LifeTime.css';

const LifeTime: React.FC = () => {
    const [matrix, setMatrix] = useState<boolean[][]>(Array(100).fill(Array(52).fill(false)));
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        const birthDate = new Date(inputValue);
        if (isNaN(birthDate.getTime())) return;

        const today = new Date();
        const N = differenceInWeeks(today, birthDate);

        let count = 0;
        const newMatrix = matrix.map(row =>
            row.map(() => {
                if (count < N) {
                    count++;
                    return true;
                }
                return false;
            })
        );
        setMatrix(newMatrix);
    };

    return (
        <div className="App">
            <div className="input-section">
                <h1>Твоя Жизнь</h1>
                <input
                    type="date"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your birth date"
                />
                <button onClick={handleButtonClick}>Highlight</button>
            </div>
            <div className="matrix-section">
                <div className="matrix">
                    {matrix.map((row, rowIndex) => (
                        <div className="row" key={rowIndex}>
                            <div className="row-number">{rowIndex + 1}</div>
                            {row.map((cell, cellIndex) => (
                                <div
                                    className={`cell ${cell ? 'highlighted' : ''}`}
                                    key={cellIndex}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default LifeTime;
