import { DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { ActiveNoteIdAtom, NotesAtom } from "@/store/note";
import { menuSubject$, menuSubjectAtom } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { CategoriesAtom } from "@/store/category";
import { useAtomValue, useSetAtom } from "jotai";
import { generateNote } from "@/utils/helpers";
import { useForm } from "react-hook-form";
import { MenuEnum } from "@/utils/enums";
import { Textarea } from "@/ui/textarea";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { z } from "zod";

import {
	CommandGroup,
	CommandInput,
	CommandEmpty,
	CommandItem,
	CommandList,
	Command,
} from "@/ui/command";
import {
	FormControl,
	FormMessage,
	FormField,
	FormLabel,
	FormItem,
	Form,
} from "@/ui/form";

const FormSchema = z.object({
	title: z.string().min(4, "Title is too short.").max(50, "Title is too long."),
	content: z.string().optional(),
	categoryId: z.string().optional(),
});

type AddNoteModalProps = {
	handleClose: () => void;
	defaultValues?: Schema;
};

type Schema = z.infer<typeof FormSchema>;
const resolver = zodResolver(FormSchema);

export const AddNoteModal = (props: AddNoteModalProps) => {
	const { handleClose, defaultValues = { title: "" } } = props;
	const form = useForm<Schema>({ resolver, defaultValues });

	const setNotes = useSetAtom(NotesAtom);
	const categories = useAtomValue(CategoriesAtom);
	const activeMenu = useAtomValue(menuSubjectAtom);
	const setActiveNoteId = useSetAtom(ActiveNoteIdAtom);

	const handleSubmit = ({ title, content, categoryId }: Schema) => {
		const note = generateNote({ title, content, categoryId });
		setNotes((notes) => [...notes, note]);
		if (activeMenu !== MenuEnum.notes) menuSubject$.next(MenuEnum.notes);
		setActiveNoteId(note.id);
		toast.success("Note Created!");
		handleClose();
	};

	return (
		<DialogContent className="max-w-[360px] p-0 pt-4 dark:bg-neutral-900">
			<DialogHeader className="px-4">
				<DialogTitle className="text-base leading-5">New Note</DialogTitle>
			</DialogHeader>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="flex flex-col gap-y-5 px-4 pb-4"
				>
					<FormField
						name="title"
						control={form.control}
						render={({ field }) => (
							<FormItem className="space-y-1">
								<FormControl>
									<Input
										className="border-b focus:border-b-neutral-700"
										placeholder="Add title here..."
										autoFocus
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="content"
						control={form.control}
						render={({ field }) => (
							<FormItem className="mt-3 flex flex-col gap-y-0.5">
								<FormLabel>Content</FormLabel>
								<FormControl>
									<Textarea
										className="focus:ring-neutral-700"
										placeholder="Note content here..."
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						name="categoryId"
						control={form.control}
						render={({ field }) => (
							<FormItem className="flex w-[200px] flex-col">
								<FormLabel>Category</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													"w-[200px] justify-between dark:bg-neutral-900",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value
													? categories.find(
															(category) => category.id === field.value,
														)?.text
													: "Select Category"}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-[200px] p-0">
										<Command className="dark:bg-neutral-900">
											<CommandInput placeholder="Search category..." />
											<CommandList>
												<CommandEmpty>No category found.</CommandEmpty>
												<CommandGroup>
													{categories.map(({ id, text }) => (
														<CommandItem
															key={id}
															value={text}
															onSelect={() => form.setValue("categoryId", id)}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	id === field.value
																		? "opacity-100"
																		: "opacity-0",
																)}
															/>
															{text}
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</FormItem>
						)}
					/>

					<Button type="submit" variant="default">
						Add
					</Button>
				</form>
			</Form>
		</DialogContent>
	);
};
