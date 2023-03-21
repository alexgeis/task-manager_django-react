/// <reference types="vite/client" />

type TabListProps = {
	viewCompleted: boolean;
	displayCompleted: (isDisplayed: boolean) => void;
};

type TaskItem = {
	id?: number | undefined;
	title: string;
	description: string;
	completed: boolean;
};

type ModalProps = {
	activeItem: TaskItem;
	setActiveItem: (newActiveTask: TaskItem) => void;
	toggle: () => void;
	onSave: (newTask: TaskItem) => void;
};
