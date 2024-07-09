import { useProcessor, ReactMarkdown } from ".";

export const PreviewEditor = (props: { textValue: string }) => {
	return (
		<div className="prose-headings:font-cal prose prose-sm prose-neutral h-[80vh] max-w-full overflow-auto rounded-md border p-2 dark:prose-invert">
			{/* {useProcessor(props.textValue)} */}
			<ReactMarkdown textValue={props.textValue} />
		</div>
	);
};
