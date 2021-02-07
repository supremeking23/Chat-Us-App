import React from "react";

import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

export default function ChatFeed(props) {
	const { chats, activeChat, userName, messages } = props;

	const chat = chats && chats[activeChat];

	// const renderReadReceipts = (message, isMyMessage) => {
	// 	chat.people.map(
	// 		(person, index) =>
	// 			person.last_read === message.id && (
	// 				<div
	// 					key={`read_${index}`}
	// 					className="read-receipt"
	// 					style={{
	// 						float: isMyMessage ? "right" : "left",
	// 						backgroundImage:
	// 							person.person.avatar && `url(${person.person.avatar})`,
	// 					}}
	// 				/>
	// 			)
	// 	);
	// };

	const logoutFunction = () => {
		window.location.reload();
		localStorage.removeItem("username");
		localStorage.removeItem("password");
	};

	const renderReadReceipts = (message, isMyMessage) =>
		chat.people.map(
			(person, index) =>
				person.last_read === message.id && (
					<div
						key={`read_${index}`}
						className="read-receipt"
						style={{
							float: isMyMessage ? "right" : "left",
							backgroundImage:
								person.person.avatar && `url(${person.person.avatar})`,
						}}
					/>
				)
		);

	console.log(chat, userName, messages);

	const renderMessages = () => {
		const keys = Object.keys(messages);
		console.log(keys);

		return keys.map((key, index) => {
			const message = messages[key];
			const lastMessagekey = index === 0 ? null : keys[index - 1];
			const isMyMessage = userName === message.sender.username;

			return (
				<div key={`msg_${index}`} style={{ width: "100%" }}>
					<div className="message-block">
						{isMyMessage ? (
							<MyMessage message={message} />
						) : (
							<TheirMessage
								message={message}
								lastMessage={messages[lastMessagekey]}
							/>
						)}
					</div>
					<div
						className="read-receipts"
						style={{
							marginRight: isMyMessage ? "18px" : "0px",
							marginLeft: isMyMessage ? "0px" : "68px",
						}}>
						{/* read-receipts */}
						{renderReadReceipts(message, isMyMessage)}
					</div>
				</div>
			);
		});
	};

	if (!chat) return "Loading...";
	return (
		<>
			<div className="chat-feed">
				<div className="chat-title-container">
					<div className="chat-title">{chat?.title}</div>
					<div className="chat-subtitle">
						{/* {chat.people.map((person) => {{
							`${person.person.username}`;
						})} */}

						{chat.people.map((person, index) => {
							return (
								<>
									{person.person.username}
									{/* get last one */}
									{chat.people.length === index + 1 ? "" : ","}
								</>
							);
						})}
						<div className="logout-div">
							<button type="button" className="logout" onClick={logoutFunction}>
								Logout
							</button>
						</div>
					</div>

					{renderMessages()}

					<div style={{ height: "100px" }} />

					<div className="message-form-container">
						<MessageForm {...props} chatID={activeChat} />
					</div>
				</div>
			</div>
		</>
	);
}
