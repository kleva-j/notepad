import { showErrorToast } from "@/utils/handleError";
import { CategorySchema } from "@/utils/constants";
import { CategoriesAtom } from "@/store/category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateId } from "@/utils/helpers";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { toast } from "sonner";

export type ToolbarItemProps = { replayAction: () => void };

export const AddCategory = ({ replayAction }: ToolbarItemProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const setCategories = useSetAtom(CategoriesAtom);

	const addNewCategory = () => {
		if (inputRef.current && inputRef.current.value) {
			const isValid = CategorySchema.safeParse(inputRef.current.value);

			if (!isValid.success) {
				showErrorToast(isValid.error);
				return;
			}

			setCategories((prev) => [
				...prev,
				{ id: generateId("c"), text: isValid.data, checked: false },
			]);
			toast.success("Category Created");
		}
		replayAction();
	};

	return (
		<form
			className="flex flex-col space-y-4"
			onSubmit={(e) => {
				e.preventDefault();
				addNewCategory();
			}}
		>
			<div className="flex flex-col text-zinc-700">
				<Input
					placeholder="Text here..."
					type="text"
					className="text-zinc-400"
					ref={inputRef}
				/>
			</div>
			<Button type="submit" variant="secondary">
				Add Category
			</Button>
		</form>
	);
};
