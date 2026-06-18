import { useRef, useState } from 'react';
import type { Gif } from '../interfaces/gif.interface';
import { getGifsByQuery } from '../actions/get-gifs-by-query.actions';

/// Sacamos fuera la cache para que no se reinicie al volver a renderizar el custo hook
//const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
	const [previousTerms, setPreviousTerms] = useState<string[]>([]);
	const [gifs, setGifs] = useState<Gif[]>([]);
	// Usamos useRef para el cache guarde el estado sin tener que sacarlo del hook
	const gifsCache = useRef<Record<string, Gif[]>>({});

	const handleTermClicked = async (term: string) => {
		// Miramos si "term" esta en cache
		if (gifsCache.current[term]) {
			setGifs(gifsCache.current[term]);
			return;
		}

		const gifs = await getGifsByQuery(term);
		setGifs(gifs);
		// Insertamos el "term" en el cache
		gifsCache.current[term] = gifs;
	};

	const handleSearch = async (query: string = '') => {
		//! Implementar la función handleSearch que debe:
		// 1. Validar que el query **no esté vacío**
		// 2. Convertir el **query a minúsculas y eliminar espacios** en blanco
		// 3. **Evitar búsquedas duplicadas** verificando si el término ya existe en previousTerms ( si existe, no hacer nada )
		// 4. Actualizar previousTerms **agregando el nuevo término al inicio y limitando a 8 elementos** máximo, es decir no puede ser un arreglo de más de 8.

		const newQuery: string = query.toLowerCase().replace(/\s+/g, '');
		if (newQuery.length === 0) return;
		if (previousTerms.includes(newQuery)) return;
		setPreviousTerms([newQuery, ...previousTerms].slice(0, 8));

		const gifs = await getGifsByQuery(newQuery);

		// Aunque tiene el mismo nombre que el parametro del useState es la respuesta de la api
		setGifs(gifs);

		// Almacenamos los gifs en la cache(creada por nosotros)
		gifsCache.current[newQuery] = gifs;
	};

	return {
		previousTerms,
		gifs,

		handleTermClicked,
		handleSearch,
	};
};
