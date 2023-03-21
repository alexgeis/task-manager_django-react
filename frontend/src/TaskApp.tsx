// import Component from the react module
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import TaskItems from "./components/TaskItems";
import TabList from "./components/TabList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import styles from "./TaskApp.module.css";

const activeItemInit: TaskItem = {
	title: "",
	description: "",
	completed: false,
};

export default function TaskApp(): JSX.Element {
	const [viewCompleted, setViewCompleted] = useLocalStorage(
		"viewCompleted",
		false
	);

	// const [viewCompleted, setViewCompleted] = useState(false);
	const [activeItem, setActiveItem] = useState(activeItemInit);
	const [taskList, setTaskList] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		try {
			(async function fetchLatestTasks() {
				const result = await axios("http://localhost:8000/api/tasks/");
				setTaskList(result.data);
			})();
		} catch (error) {
			console.error(error);
		}
	}, [activeItem]);

	// TODO: maybe replace w/ toggle?
	const displayCompleted = (status: boolean) => {
		return status ? setViewCompleted(true) : setViewCompleted(false);
	};

	const modalToggle = () => {
		setModalOpen((modalOpen) => !modalOpen);
	};
	// TODO: may have to handle event
	const handleSubmit = async (item: TaskItem) => {
		modalToggle();
		setActiveItem(item);
		if (item.id) {
			// if old post to edit and submit
			await axios.put(`http://localhost:8000/api/tasks/${item.id}/`, item);
			setActiveItem(activeItemInit);
			return;
		}
		// if new post to submit
		await axios.post("http://localhost:8000/api/tasks/", item);
		setActiveItem(activeItemInit);
	};
	// Delete item
	const handleDelete = async (item: TaskItem) => {
		setActiveItem(item);
		await axios.delete(`http://localhost:8000/api/tasks/${item.id}/`);
		setActiveItem(activeItemInit);
	};
	// Create item
	const createItem = async () => {
		const item = { title: "", description: "", completed: false };
		setActiveItem(item);
		modalToggle();
	};

	//Edit item
	const editItem = (item: TaskItem) => {
		setActiveItem(item);
		modalToggle();
	};

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Task Manager</h1>
			<h3 className={styles.title}>Built w/ React / Django</h3>
			<div className={styles.taskContainer}>
				<button
					onClick={createItem}
					className={styles.btnAdd}
				>
					Add task
				</button>
				<TabList
					viewCompleted={viewCompleted}
					displayCompleted={displayCompleted}
				/>
				<ul className={styles.taskList}>
					<TaskItems
						viewCompleted={viewCompleted}
						taskList={taskList}
						editItem={editItem}
						handleDelete={handleDelete}
					/>
				</ul>
			</div>
			{modalOpen && (
				<Modal
					activeItem={activeItem}
					setActiveItem={setActiveItem}
					toggle={modalToggle}
					onSave={handleSubmit}
				/>
			)}
		</main>
	);
}
