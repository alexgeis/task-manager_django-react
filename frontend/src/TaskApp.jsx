// import Component from the react module
import React, { Component } from "react";
// TODO: replace with own modal
import Modal from "./components/Modal";
import axios from "axios";

// TODO: REPLACE WITH FUNCTION COMPONENT
// create a class that extends the component
class App extends Component {
	// add a constructor to take props
	// TODO: replace this.state with useState hooks
	//TODO: add model state
	constructor(props) {
		super(props);

		// add the props here
		this.state = {
			// the viewCompleted prop represents the status
			// of the task. Set it to false by default
			viewCompleted: false,
			activeItem: {
				title: "",
				description: "",
				completed: false,
			},

			// this list stores all the completed tasks
			taskList: [],
		};
	}

	//TODO: replace API call w/ useEffect
	// Add componentDidMount()
	componentDidMount() {
		this.refreshList();
	}
	//TODO: replace with async await
	refreshList = () => {
		axios //Axios to send and receive HTTP requests
			.get("http://localhost:8000/api/tasks/")
			.then((res) => this.setState({ taskList: res.data }))
			.catch((err) => console.log(err));
	};

	//TODO: replace w/ useState hooks
	// this arrow function takes status as a parameter
	// and changes the status of viewCompleted to true
	// if the status is true, else changes it to false
	displayCompleted = (status) => {
		if (status) {
			return this.setState({ viewCompleted: true });
		}
		return this.setState({ viewCompleted: false });
	};

	//TODO: replace class component render function w/ functional component return
	//TODO: update styling
	//TODO: update event handlers
	//TODO: extract into separate component
	// this array function renders two spans that help control
	// the set of items to be displayed(ie, completed or incomplete)
	renderTabList = () => {
		return (
			<div className="my-5 tab-list">
				<span
					onClick={() => this.displayCompleted(true)}
					className={this.state.viewCompleted ? "active" : ""}
				>
					completed
				</span>
				<span
					onClick={() => this.displayCompleted(false)}
					className={this.state.viewCompleted ? "" : "active"}
				>
					Incompleted
				</span>
			</div>
		);
	};
	//TODO: extract into separate component
	//TODO: pass down completed tasks prop, and click handlers edit/delete
	//TODO: replace styling
	//TODO: replace w/ useState hooks
	// Main variable to render items on the screen
	renderItems = () => {
		const { viewCompleted } = this.state;
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

	//TODO: replace w/ hook
	toggle = () => {
		//add this after modal creation
		this.setState({ modal: !this.state.modal });
	};
	//TODO: replace refreshList() call
	// Submit an item
	handleSubmit = (item) => {
		this.toggle();
		alert("save" + JSON.stringify(item));
		if (item.id) {
			// if old post to edit and submit
			axios
				.put(`http://localhost:8000/api/tasks/${item.id}/`, item)
				.then((res) => this.refreshList());
			return;
		}
		// if new post to submit
		axios
			.post("http://localhost:8000/api/tasks/", item)
			.then((res) => this.refreshList());
	};
	//TODO: replace refreshList() call
	// Delete item
	handleDelete = (item) => {
		alert("delete" + JSON.stringify(item));
		axios
			.delete(`http://localhost:8000/api/tasks/${item.id}/`)
			.then((res) => this.refreshList());
	};
	//TODO: replace w/ useState hook
	// Create item
	createItem = () => {
		const item = { title: "", description: "", completed: false };
		this.setState({ activeItem: item, modal: !this.state.modal });
	};
	//TODO: replace w/ useState hook
	//Edit item
	editItem = (item) => {
		this.setState({ activeItem: item, modal: !this.state.modal });
	};

	//TODO: replace this render() w/ functional component
	//TODO: update styling
	//TODO: update this. class references
	//TODO: update functions (use component imports)
	//TODO: replace Modal component
	//TODO: update click handlers
	// Start by visual effects to viewer
	render() {
		return (
			<main className="content">
				<h1 className="text-success text-uppercase text-center my-4">
					React/Django Task Manager
				</h1>
				<div className="row ">
					<div className="col-md-6 col-sm-10 mx-auto p-0">
						<div className="card p-3">
							<div className="">
								<button
									onClick={this.createItem}
									className="btn btn-info"
								>
									Add task
								</button>
							</div>
							{this.renderTabList()}
							<ul className="list-group list-group-flush">
								{this.renderItems()}
							</ul>
						</div>
					</div>
				</div>
				{this.state.modal ? (
					<Modal
						activeItem={this.state.activeItem}
						toggle={this.toggle}
						onSave={this.handleSubmit}
					/>
				) : null}
			</main>
		);
	}
}
export default App;
