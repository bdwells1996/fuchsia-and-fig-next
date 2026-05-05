"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

interface SelectProps {
	value: string;
	onValueChange: (value: string) => void;
	options: SelectOption[];
	placeholder?: string;
	disabled?: boolean;
	size?: "sm" | "md";
	"aria-label"?: string;
}

export function Select({
	value,
	onValueChange,
	options,
	placeholder = "Select…",
	disabled,
	size = "md",
	"aria-label": ariaLabel,
}: SelectProps) {
	return (
		<RadixSelect.Root
			value={value}
			onValueChange={onValueChange}
			disabled={disabled}
		>
			<RadixSelect.Trigger
				className={`select-trigger ${size === "sm" ? "select-trigger-sm" : ""}`}
				aria-label={ariaLabel}
			>
				<RadixSelect.Value placeholder={placeholder} />
				<RadixSelect.Icon className="select-trigger-icon">
					<ChevronDownIcon size={16} />
				</RadixSelect.Icon>
			</RadixSelect.Trigger>

			<RadixSelect.Portal>
				<RadixSelect.Content className="select-content" position="popper" sideOffset={6}>
					<RadixSelect.ScrollUpButton className="select-scroll-btn">
						<ChevronUpIcon size={14} />
					</RadixSelect.ScrollUpButton>

					<RadixSelect.Viewport className="select-viewport">
						{options.map((opt) => (
							<SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
								{opt.label}
							</SelectItem>
						))}
					</RadixSelect.Viewport>

					<RadixSelect.ScrollDownButton className="select-scroll-btn">
						<ChevronDownIcon size={14} />
					</RadixSelect.ScrollDownButton>
				</RadixSelect.Content>
			</RadixSelect.Portal>
		</RadixSelect.Root>
	);
}

function SelectItem({
	value,
	children,
	disabled,
}: {
	value: string;
	children: ReactNode;
	disabled?: boolean;
}) {
	return (
		<RadixSelect.Item value={value} disabled={disabled} className="select-item">
			<RadixSelect.ItemText>{children}</RadixSelect.ItemText>
			<RadixSelect.ItemIndicator className="select-item-indicator">
				<CheckIcon size={14} />
			</RadixSelect.ItemIndicator>
		</RadixSelect.Item>
	);
}
