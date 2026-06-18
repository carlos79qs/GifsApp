import { giphySearchResponseMock } from './../../../test/mocks/giphy.response.data';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { getGifsByQuery } from './get-gifs-by-query.actions';
import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from '../api/giphy.api';

describe('getGifsByQuery', () => {
	let mock = new AxiosMockAdapter(giphyApi);

	// Sobrescribimos el mock, ya que el reset no ha funcionado para evitar arrastrar data entre pruebas
	beforeEach(() => {
		//mock.reset();
		mock = new AxiosMockAdapter(giphyApi);
	});

	// test('should return a list of gifs', async () => {
	// 	const gifs = await getGifsByQuery('goku');
	// 	const [gif1] = gifs;

	// 	expect(gifs.length).toBe(10);

	// 	expect(gif1).toStrictEqual({
	// 		id: expect.any(String),
	// 		title: expect.any(String),
	// 		url: expect.any(String),
	// 		width: expect.any(Number),
	// 		height: expect.any(Number),
	// 	});
	// });

	test('should return a list of gifs', async () => {
		// Con AxiosAdapter simolamos la llamada para tener un entorno controlado
		mock.onGet('/search').reply(200, giphySearchResponseMock);

		const gifs = await getGifsByQuery('goku');

		expect(gifs.length).toBe(10);

		gifs.forEach((gif) => {
			expect(typeof gif.id).toBe('string');
			expect(typeof gif.title).toBe('string');
			expect(typeof gif.url).toBe('string');
			expect(typeof gif.width).toBe('number');
			expect(typeof gif.height).toBe('number');
		});
	});

	test('should return an empty list of gifs if query is empty', async () => {
		// mock.onGet('/search').reply(200, giphySearchResponseMock);

		// Eliminamos el mock para usar la llamada original
		mock.restore();

		const gifs = await getGifsByQuery('');

		expect(gifs.length).toBe(0);
	});

	test('should handle error when the API returns an error', async () => {
		// Creamos un espía que esta pendiente del error y aparte los sobrescribimos con obejeto vacio para que haya ruido en la consola
		const consoleErrorSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		mock.onGet('/search').reply(400, {
			data: {
				message: 'Bad Resquest',
			},
		});

		const gifs = await getGifsByQuery('goku');

		expect(gifs.length).toBe(0);
		expect(consoleErrorSpy).toHaveBeenCalled();
		expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
		// Nos asguramos el error sea llamado con algún argumento (console.log(error)) "error" es el argumento
		expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
	});
});
