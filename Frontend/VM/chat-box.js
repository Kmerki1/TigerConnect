"use strict";

function ChatBox() {
    const fake_messages = [
        {
            'user': 'Kyle',
            'content': 'We think profile page might be more than the other pages so emma is gonna help you with that one'
        },
        {
            'user': 'Kevin',
            'content': 'sounds good'
        },
        {
            'user': 'Victor',
            'content': 'how do you center a div again?'
        }
    ]
    const [messages, setMessages] = React.useState(fake_messages);
    const [inputMessage, setInputMessage] = React.useState('');

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            const newMessage = {
                'user': 'Victor',
                'content': inputMessage
            };
            setMessages([...messages, newMessage]);
            setInputMessage('');
        }
    };


    return (
        <div id="chat-box">
            <div className="chat-header">
                <img src="https://via.placeholder.com/50" alt="Group Avatar"/>
                <h2>Web Programming 400</h2>
            </div>
            <div className="chat-messages">
                {messages.map((comment, ind) => (
                    <div className="message" key={ind}>
                        <img src="https://via.placeholder.com/40" alt="User Avatar"/>
                        <div className="message-content">
                            <h4>{comment.user}</h4>
                            <p className="message__text">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={handleInputChange}
                />
                <button className="btn" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    )
}

const domNode = document.getElementById("chat-box");
const root = ReactDOM.createRoot(domNode);
root.render(<ChatBox/>);