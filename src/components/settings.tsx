"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { TabsGroup } from "@/lib/constants";
import { Settings2 } from "lucide-react";
import { Button } from "@/ui/button";
import { useState } from "react";
import { Icon } from "@/ui/icon";

import {
	DialogTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Dialog,
} from "@/ui/dialog";

const tabs = Object.values(TabsGroup);

export const Settings = () => {
	const [open, setOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("preferences");

	const handleClick = () => setOpen(true);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="size-10 p-0 shadow dark:border-zinc-700 dark:bg-neutral-900/95"
					onClick={handleClick}
				>
					<Settings2 className="h-5 w-5" />
				</Button>
			</DialogTrigger>
			<DialogContent className="dark:bg-neutral-900 sm:max-w-[675px]">
				<DialogHeader className="">
					<DialogTitle>Manage Settings</DialogTitle>
				</DialogHeader>
				<Tabs
					defaultValue={activeTab}
					onValueChange={setActiveTab}
					className="flex py-1"
				>
					<TabsList className="flex h-max flex-col gap-y-1 rounded-none border-r bg-transparent pr-4">
						{tabs.map(({ tab, label, icon }) => (
							<TabsTrigger
								key={tab}
								className="w-full justify-start rounded-sm py-2 capitalize data-[state=active]:bg-neutral-100 data-[state=active]:shadow-none dark:data-[state=active]:bg-neutral-800"
								value={tab}
							>
								<Icon name={icon} className="mr-3 h-4 w-4 stroke-[1px]" />
								{label}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value="preferences" className="mt-0">
						<div className="ml-4 flex flex-col gap-y-2">
							<h3 className="text-lg font-semibold">Preferences</h3>
						</div>
					</TabsContent>

					<TabsContent value="keyboard-shortcuts" className="mt-0">
						<div className="ml-4 flex flex-col gap-y-2">
							<h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
						</div>
					</TabsContent>
				</Tabs>

				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
