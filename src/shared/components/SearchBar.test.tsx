import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
	test('should render searchBar correctly', () => {
		const { container } = render(<SearchBar onQuery={() => {}} />);

		expect(container).toMatchSnapshot();
	});

	test('should call onQuery with the correct value after 1000ms', async () => {
		const onQuery = vi.fn();
		render(<SearchBar onQuery={onQuery} />);

		const input = screen.getByRole('textbox');
		// Simulamos escribir algo en el input
		fireEvent.change(input, { target: { value: 'test' } });

		// Simulamos el tiempo que tiene que pasar para que haga la llamada automatica
		// await waitFor(() => {
		// 	expect(onQuery).toHaveBeenCalled();
		// 	expect(onQuery).toHaveBeenCalledWith('test');
		// });

		await new Promise((resolve) => setTimeout(resolve, 1001));

		expect(onQuery).toHaveBeenCalled();
		expect(onQuery).toHaveBeenCalledWith('test');
	});

	test('should call only once with the last value (debounce)', async () => {
		const onQuery = vi.fn();
		render(<SearchBar onQuery={onQuery} />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 't' } });
		fireEvent.change(input, { target: { value: 'te' } });
		fireEvent.change(input, { target: { value: 'tes' } });
		fireEvent.change(input, { target: { value: 'test' } });

		// await waitFor(() => {
		// 	expect(onQuery).toHaveBeenCalledTimes(1);
		// 	expect(onQuery).toHaveBeenCalledWith('test');
		// });
		await new Promise((resolve) => setTimeout(resolve, 1001));

		expect(onQuery).toHaveBeenCalledTimes(1);
		expect(onQuery).toHaveBeenCalledWith('test');
	});
});
