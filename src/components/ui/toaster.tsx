"use client";

import { useToast } from "@/components/ui/use-toast";
import { Each } from "@/components/Each";
import {
	ToastDescription,
	ToastViewport,
	ToastProvider,
	ToastTitle,
	ToastClose,
	Toast,
} from "@/components/ui/toast";

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			<Each
				of={toasts}
				render={function ({ id, title, description, action, ...props }) {
					return (
						<Toast key={id} {...props}>
							<div className="grid gap-1">
								{title && <ToastTitle>{title}</ToastTitle>}
								{description && (
									<ToastDescription>{description}</ToastDescription>
								)}
							</div>
							{action}
							<ToastClose />
						</Toast>
					);
				}}
			/>
			<ToastViewport />
		</ToastProvider>
	);
}
