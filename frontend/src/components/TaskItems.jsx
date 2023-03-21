import React from "react";

export default TaskItems = ({ viewCompleted, taskList }) => {
	const newItems = this.state.taskList.filter(
		(item) => item.completed === viewCompleted
	);
	return newItems.map((item) => (
		<li
			key={item.id}
			className="list-group-item d-flex justify-content-between align-items-center"
		>
			<span
				className={`todo-title mr-2 ${
					this.state.viewCompleted ? "completed-todo" : ""
				}`}
				title={item.description}
			>
				{item.title}
			</span>
			<span>
				<button
					onClick={() => this.editItem(item)}
					className="btn btn-secondary mr-2"
				>
					Edit
				</button>
				<button
					onClick={() => this.handleDelete(item)}
					className="btn btn-danger"
				>
					Delete
				</button>
			</span>
		</li>
	));
};
