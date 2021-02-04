import React, { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import { sendOutlined, PictureOutlined, SendOutlined } from "@ant-design/icons";

export default function MessageForm(props) {
	const { chatID, creds } = props;
	const handleSubmit = (event) => {
		event.preventDefault();

		const text = value.trim();

		if (text.length > 0) sendMessage(creds, chatID, { text });
		SetValue("");
	};

	const [value, SetValue] = useState("");

	const handleChange = (event) => {
		SetValue(event.target.value);
		isTyping(props, chatID);
	};

	const handleUpload = (event) => {
		sendMessage(creds, chatID, { files: event.target.files, text: "" });
	};
	return (
		<>
			<form className="message-form" onSubmit={handleSubmit}>
				<input
					type=""
					className="message-input"
					placeholder="Send Message..."
					onChange={handleChange}
					value={value}
					onSubmit={handleSubmit}
				/>
				<label htmlFor="upload-button">
					<span className="image-button">
						<PictureOutlined className="picture-icon" />
					</span>
				</label>

				<input
					type="file"
					multiple={false}
					id="upload-button"
					style={{ display: "none" }}
					onChange={handleUpload}
				/>

				<button type="submit" className="send-button">
					<SendOutlined className="send-icon" />
				</button>
			</form>
		</>
	);
}
