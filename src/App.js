import './App.css';
import React, {useEffect, useState} from 'react';
import mqtt from 'mqtt/dist/mqtt';

function App() {
	const [connectionStatus, setConnectionStatus] = useState(false);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const client = mqtt.connect('http://test.mosquitto.org:8080');
		//const client = mqtt.connect('http://192.168.3.100:9001');
		client.on('connect', () => {
			setConnectionStatus(true);
			console.log("connected");
		});
		client.on('message', (topic, payload, packet) => {
			console.log("received message");
			console.log(payload.toString());
			setMessages((m) => {
				m.push(payload.toString());
				return [...m];
			});
		});

		client.subscribe('presence', (err) => {
			if (!err) {
				client.publish('presence', 'Hello mqtt');
			}
		});
	}, []);

 	const renderMessages = () => {
		console.log(messages);
		return (
			messages.map((m, index) => {
				console.log(m);
				return (
					<h2 key={index} >
						{m}
					</h2>
				)
			})
		);
	};

	return (
		<div className="App">
			<div>
				Connected: {connectionStatus ? "True" : "False"}
				{renderMessages()}
			</div>
		</div>
	);
}

export default App;
