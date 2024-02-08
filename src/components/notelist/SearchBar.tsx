import type { ChangeEvent, FC } from "react";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchBarProps = { searchRef: React.MutableRefObject<HTMLInputElement> };

export const SearchBar: FC<SearchBarProps> = ({ searchRef }) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		console.log(event);
	};

	return (
		<div className="relative flex w-full items-center h-[60px]">
			<Search className="absolute bottom-0 left-3 top-0 my-auto h-4 w-4 text-gray-500" />
			<Input
				ref={searchRef}
				name="note-search"
				onChange={handleChange}
				type="search"
				className="m-0 h-[36px] w-full min-w-0 appearance-none rounded-[0.4rem] border bg-white p-2 pl-9 text-[0.8rem] text-base font-normal leading-[0.1] tracking-wide text-gray-500 focus:border-blue-200 focus-visible:ring-border dark:bg-neutral-800 dark:text-gray-400 dark:focus:border-blue-900"
				placeholder="Search for notes"
			/>
		</div>
	);
};
