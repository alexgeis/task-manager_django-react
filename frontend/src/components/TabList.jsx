const styles = {
	container: {
		margin: "5px 0px",
	},
	tabItem: {
		padding: "5px 8px",
		border: "1px solid rgb(7, 167, 68)",
		borderRadius: "10px",
		marginRight: "5px",
		cursor: "pointer",
	},
	active: {
		backgroundColor: "rgb(6, 139, 12)",
		color: "#fff",
	},
};
export default TabList = ({ viewCompleted, displayCompleted }) => {
	return (
		<div style={styles.container}>
			<span
				onClick={() => displayCompleted(true)}
				style={
					viewCompleted ? `${styles.tabItem} ${styles.active}` : styles.tabItem
				}
			>
				completed
			</span>
			<span
				onClick={() => displayCompleted(false)}
				style={
					viewCompleted ? styles.tabItem : `${styles.tabItem} ${styles.active}`
				}
			>
				Incompleted
			</span>
		</div>
	);
};
