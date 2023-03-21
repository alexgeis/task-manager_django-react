import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TaskApp from "./TaskApp.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		{/* <App /> */}
		<TaskApp />
	</React.StrictMode>
);
