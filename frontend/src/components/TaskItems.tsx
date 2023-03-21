import React from "react";

const styles: any = {
	taskListItem: {
		display: "flex",
		justifyContent: "space between",
		alignItems: "center",
	},
	title: {
		marginRight: "2px",
	},
	completeTask: {
		backgroundColor: "green",
		color: "white",
	},
	btn: {
		borderRadius: "10px",
	},
	btnEdit: {
		marginRight: "2px",
	},
	btnDelete: {
		backgroundColor: "red",
		color: "white",
	},
};

type TaskItemProps = {
	viewCompleted: boolean;
	taskList: TaskItem[];
	editItem: (item: TaskItem) => void;
	handleDelete: (item: TaskItem) => void;
};

export default function TaskItems({
	viewCompleted,
	taskList,
	editItem,
	handleDelete,
}: TaskItemProps): JSX.Element {
	const newItems = taskList.filter((item) => item.completed === viewCompleted);

	return (
		<>
			{newItems.map((item, i) => (
				<li
					key={item.id}
					style={styles.taskListItem}
				>
					<span
						style={
							viewCompleted
								? `${styles.completeTask} ${styles.title}`
								: styles.title
						}
						title={item.description}
					>
						{item.title}
					</span>
					<span>
						<button
							onClick={() => editItem(item)}
							// style={`${styles.btn} ${styles.btnEdit}`}
							style={{ ...styles.btn, ...styles.btnDelete }}
						>
							Edit
						</button>
						<button
							onClick={() => handleDelete(item)}
							// style={`${styles.btn} ${styles.btnDelete}`}
							style={{ ...styles.btn, ...styles.btnDelete }}
						>
							Delete
						</button>
					</span>
				</li>
			))}
		</>
	);
}
