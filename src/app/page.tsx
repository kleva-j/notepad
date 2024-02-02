"use client";

import { EmptyEditor, EditorMenu } from "@/components/editor";
import { UseCategoryContext } from "@/lib/context";
import { checkContextType } from "@/utils/helpers";
import { CategoryActions } from "@/lib/constants";
import { ContextTypeEnum } from "@/utils/enums";
import {
	ResizablePanelGroup,
	ResizableHandle,
	ResizablePanel,
} from "@/components/ui/resizable";
import {
	PointerSensor,
	closestCenter,
	DragEndEvent,
	useSensors,
	DndContext,
	useSensor,
} from "@dnd-kit/core";

import AppSidebar from "@/container/AppSidebar";
import NoteList from "@/container/AppNoteList";

export default function RootPage() {
	const { dispatch } = UseCategoryContext();

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
	);

	const onDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (active.id === over?.id) return;
		const { type: typeActive } = checkContextType(active.id as string);
		const { type: typeOver } = checkContextType(over?.id as string);
		if (
			typeActive === ContextTypeEnum.category &&
			typeOver === ContextTypeEnum.category
		) {
			return dispatch({
				type: CategoryActions.SWAP_CATEGORY,
				payload: {
					sourceId: active.data.current?.index,
					destinationId: over?.data.current?.index,
				},
			});
		}
		if (
			typeActive === ContextTypeEnum.category &&
			typeOver === ContextTypeEnum.note
		) {
		}
		if (
			typeActive === ContextTypeEnum.note &&
			typeOver === ContextTypeEnum.note
		) {
		}
	};

	return (
		<DndContext
			sensors={sensors}
			onDragEnd={onDragEnd}
			collisionDetection={closestCenter}
		>
			<section className="flex h-screen w-screen">
				<AppSidebar />
				<ResizablePanelGroup direction="horizontal">
					<ResizablePanel
						defaultSize={25}
						className="bg-neutral-100 dark:bg-neutral-900"
					>
						<NoteList />
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel
						defaultSize={75}
						className="bg-neutral-200 dark:bg-neutral-800"
					>
						<div className="relative flex h-full flex-col items-center justify-center p-6">
							<EmptyEditor />
							<EditorMenu activeNote />
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</section>
		</DndContext>
	);
}
