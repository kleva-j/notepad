import type { ChangeEvent, FC } from "react";

export interface SearchBarProps {
	searchRef: React.MutableRefObject<HTMLInputElement>;
	searchNotes: (searchValue: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ searchRef, searchNotes }) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		searchNotes(event.target.value);
	};

	return (
		<input
			type="search"
			ref={searchRef}
			className="m-0 h-[36px] w-full min-w-0 appearance-none rounded-[0.3rem] border bg-white dark:bg-neutral-800 p-2 text-[0.9rem] text-base font-normal leading-[0.1] text-black"
			placeholder="Search for notes"
		/>
	);
};
