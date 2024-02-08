import { PopoverContent } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/utils";
import { z } from "zod";
import {
	FormDescription,
	FormMessage,
	FormControl,
	FormField,
	FormItem,
	Form,
} from "@/components/ui/form";

type Props = { onSubmit: (title: string) => void };
type FormValues = z.infer<typeof formSchema>;

export const AddCategoryForm = (props: Props) => {
	const { onSubmit } = props;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: { title: "" },
	});

	function handleSubmit(values: FormValues) {
		onSubmit(values.title);
		form.reset();
	}

	return (
		<PopoverContent>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input className="col-span-2 h-8" {...field} />
								</FormControl>
								<FormDescription>
									Category title should be unique!
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</PopoverContent>
	);
};
