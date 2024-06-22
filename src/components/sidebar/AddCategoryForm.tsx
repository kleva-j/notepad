import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/utils";
import { z } from "zod";

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

	return <div></div>;
};
