import styles from "./Modal.module.css";

type ModalProps = {
	activeItem: TaskItem;
	setActiveItem: (newActiveTask: TaskItem) => void;
	toggle: () => void;
	onSave: (newTask: TaskItem) => void;
};

export default function Modal({
	activeItem,
	setActiveItem,
	toggle,
	onSave,
}: ModalProps) {
	const handleChange = (e: any) => {
		let { name, value } = e.target;
		if (e.target.type === "checkbox") {
			value = e.target.checked;
		}
		const newActiveItem = { ...activeItem, [name]: value };
		setActiveItem(newActiveItem);
	};

	return (
		<div
			className={styles.modalOverlay}
			onClick={toggle}
		>
			<div className={styles.modalContent}>
				<h2 className={styles.header}>Task Item</h2>
				<section className={styles.body}>
					<form
						action=""
						method="post"
					>
						<fieldset>
							{/* TITLE */}
							<label
								htmlFor="title"
								className={styles.formLabel}
							>
								Title
								<input
									type="text"
									name="title"
									value={activeItem.title}
									onChange={handleChange}
								/>
							</label>
							{/* DESCRIPTION */}
							<label
								htmlFor="description"
								className={styles.formLabel}
							>
								Description
								<input
									type="text"
									name="description"
									value={activeItem.description}
									onChange={handleChange}
									placeholder="Enter Task Description"
								/>
							</label>
							{/* COMPLETED */}
							<label
								htmlFor="completed"
								className={styles.formLabel}
							>
								Completed
								<input
									type="checkbox"
									name="completed"
									checked={activeItem.completed}
									onChange={handleChange}
								/>
							</label>
						</fieldset>
					</form>
				</section>
				<div className={styles.footer}>
					<button
						className={styles.btnSubmit}
						onClick={() => onSave(activeItem)}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

// build a class base component
// TODO: replace w/ functional component
// class OLDModal extends Component {
// 	// TODO:  receives props activeItem, toggle, and onSave
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			activeItem: this.props.activeItem,
// 		};
// 	}
// 	// changes handler to check if a checkbox is checked or not
// 	// TODO: update w/ useState hook

// 	handleChange = (e) => {
// 		let { name, value } = e.target;
// 		if (e.target.type === "checkbox") {
// 			value = e.target.checked;
// 		}
// 		const activeItem = { ...this.state.activeItem, [name]: value };
// 		this.setState({ activeItem });
// 	};

// 	// rendering modal in the custommodal class received toggle and on save as props,
// 	// TODO: add state object for modalOpen status: boolean, could use modal status on
// 	// TODO:  replace styling
// 	/*
// 		modal: full screen overlay
// 		modalContent: container for header, body/form, footer - maybe grid
// 			header:
// 			body/form:
// 			footer:

// 	*/
// 	render() {
// 		const { toggle, onSave } = this.props;
// 		return (
// 			<Modal
// 				isOpen={true}
// 				toggle={toggle}
// 			>
// 				<ModalHeader toggle={toggle}> Task Item </ModalHeader>
// 				<ModalBody>
// 					<Form>
// 						{/* 3 formgroups
// 			1 title label */}
// 						<FormGroup>
// 							<Label for="title">Title</Label>
// 							<Input
// 								type="text"
// 								name="title"
// 								value={this.state.activeItem.title}
// 								onChange={this.handleChange}
// 								placeholder="Enter Task Title"
// 							/>
// 						</FormGroup>

// 						{/* 2 description label */}
// 						<FormGroup>
// 							<Label for="description">Description</Label>
// 							<Input
// 								type="text"
// 								name="description"
// 								value={this.state.activeItem.description}
// 								onChange={this.handleChange}
// 								placeholder="Enter Task Description"
// 							/>
// 						</FormGroup>

// 						{/* 3 completed label */}
// 						<FormGroup check>
// 							<Label for="completed">
// 								<Input
// 									type="checkbox"
// 									name="completed"
// 									checked={this.state.activeItem.completed}
// 									onChange={this.handleChange}
// 								/>
// 								Completed
// 							</Label>
// 						</FormGroup>
// 					</Form>
// 				</ModalBody>
// 				{/* create a modal footer */}
// 				<ModalFooter>
// 					<Button
// 						color="success"
// 						onClick={() => onSave(this.state.activeItem)}
// 					>
// 						Save
// 					</Button>
// 				</ModalFooter>
// 			</Modal>
// 		);
// 	}
// }
