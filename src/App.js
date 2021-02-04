import { ChatEngine } from "react-chat-engine";

import ChatFeed from "./Components/ChatFeed";

import "./App.css";
import LoginForm from "./Components/LoginForm";

function App() {
	if (!localStorage.getItem("username")) return <LoginForm />;
	return (
		<>
			<ChatEngine
				height="100vh"
				projectID="682b4770-1969-42a8-82f5-f103ff1d5e07"
				userName={localStorage.getItem("username")}
				userSecret={localStorage.getItem("password")}
				renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
			/>
		</>
	);
}

export default App;
