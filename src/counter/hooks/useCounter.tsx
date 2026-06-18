import { useState } from 'react';

export const useCounter = (initialValue: number = 10) => {
	const [counter, setCounter] = useState(initialValue);

	const handleAdd = () => {
		setCounter(counter + 1);
	};

	const handleReset = () => {
		setCounter(initialValue);
	};

	const handleSubtract = () => {
		if (counter === 1) return;
		setCounter(counter - 1);
	};

	return {
		// Values
		counter,

		// Methods / Actions
		handleAdd,
		handleSubtract,
		handleReset,
	};
};
