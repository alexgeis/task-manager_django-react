// import Component from the react module
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import TaskItems from "./components/TaskItems";
import TabList from "./components/TabList";

const styles: any = {
	container: {
		width: "80%",
		margin: "2px auto",
	},
	title: {
		textTransform: "uppercase",
		textAlign: "center",
		margin: "10px auto",
	},
	taskContainer: {
		display: "flex",
		flexDirection: "column",
		gap: "40px",
	},
	btnAdd: {
		padding: "2px",
		backgroundColor: "aqua",
		color: "white",
	},
	taskList: {
		display: "grid",
		gridTemplateColumns: "1fr",
		gridTemplateRows: "repeat(auto-fill, minmax(fit-content, 100px))",
		padding: "3px",
	},
};
const activeItemInit: TaskItem = {
	title: "",
	description: "",
	completed: false,
};

export default function TaskApp(): JSX.Element {
	const [viewCompleted, setViewCompleted] = useState(false);
	const [activeItem, setActiveItem] = useState(activeItemInit);
	const [taskList, setTaskList] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		try {
			(async function fetchLatestTasks() {
				const result = await axios("http://localhost:8000/api/tasks/");

				console.log("CONFIRM", result.data);
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
		alert("save" + JSON.stringify(item));
		// setActiveItem(item);
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
		alert("delete" + JSON.stringify(item));
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
		<main style={styles.container}>
			<h1 style={styles.title}>React/Django Task Manager</h1>
			<div style={styles.taskContainer}>
				<button
					onClick={createItem}
					style={styles.btnAdd}
				>
					Add task
				</button>
				<TabList
					viewCompleted={viewCompleted}
					displayCompleted={displayCompleted}
				/>
				<ul style={styles.taskList}>
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
