import { forwardRef, FormEvent } from "react";

type AddCategoryFormProps = {
	setIsAddingCategory: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const AddCategoryForm = forwardRef<
	HTMLInputElement,
	AddCategoryFormProps
>((props, ref) => {
	const { setIsAddingCategory, onSubmit } = props;
	return (
		<form onSubmit={onSubmit}>
			<input
				type="text"
				autoFocus
				ref={ref}
				maxLength={20}
				aria-label="Category name"
				placeholder="New category..."
				onBlur={() => setIsAddingCategory(false)}
				className="m-2 ml-4 w-[150px] border-0 bg-[#2d2d2d]/5 p-2 text-[0.9rem] text-[#eeeeee]"
			/>
		</form>
	);
});
