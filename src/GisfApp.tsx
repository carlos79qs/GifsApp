import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { useGifs } from './gifs/hooks/useGifs';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';

export const GisfApp = () => {
	const { previousTerms, gifs, handleTermClicked, handleSearch } = useGifs();

	return (
		<>
			{/* {Header} */}
			<CustomHeader
				title="Buscador de gifs"
				description="Descubre y compaarte el gif perfecto"
			/>

			{/* Search */}
			<SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />

			{/* Búsquedas previas */}
			<PreviousSearches
				searches={previousTerms}
				onLabelClicked={handleTermClicked}
			/>

			{/* Gifs */}
			{/* Este "gifs" si es el prarametro del useState*/}
			<GifList gifs={gifs} />
		</>
	);
};
