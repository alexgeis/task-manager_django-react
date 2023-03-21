import styles from "./Modal.module.css";

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
			<div
				className={styles.modalContentContainer}
				onClick={(e: any) => {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
					return false;
				}}
			>
				<h2 className={styles.header}>Add Task Item</h2>
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
								Title:
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
								Description:
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
								Completed:
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
