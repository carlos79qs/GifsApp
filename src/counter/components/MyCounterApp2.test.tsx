import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { MyCounterApp } from './MyCounterApp';
// import { useCounter } from "../hooks/useCounter";

//! Simulación del custom hook para poder personalizarlo
// Simulamos las funciones para poder detectar cuando son llamadas
const handleAddMock = vi.fn();
const handleSubtractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock('../hooks/useCounter', () => ({
	useCounter: () => ({
		counter: 20,
		handleAdd: handleAddMock,
		handleSubtract: handleSubtractMock,
		handleReset: handleResetMock,
	}),
}));

describe('MyCounterApp', () => {
	test('should render the component', () => {
		render(<MyCounterApp />);

		// 'heading', { level: 1 } => encontrar el primer h1
		expect(screen.getByRole('heading', { level: 1 }).innerHTML).contain(
			'counter: 20',
		);

		expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
		expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
		expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
	});

	test('should call handleAdd if button is clicked', () => {
		render(<MyCounterApp />);

		const button = screen.getByRole('button', { name: '+1' });
		fireEvent.click(button);

		expect(handleAddMock).toHaveBeenCalled();
		expect(handleAddMock).toHaveBeenCalledTimes(1);
		expect(handleSubtractMock).not.toHaveBeenCalled();
		expect(handleResetMock).not.toHaveBeenCalled();
	});
});
