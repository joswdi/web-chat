const sendButton = document.querySelector('#send');
const userInput1 = document.querySelector('#user-input1');
const userInput2 = document.querySelector('#user-input2');
const messagesList = document.querySelector('#messages-list');
const listElement = (nickname, message) => {
    return `<li>
                <div class="message">
                    <span class="message-nickname">${nickname}</span>
                    <span>:</span>
                    <span class="message-text">${message}</span>
                </div>
            </li>`
}
fetch('http://localhost:3004/chatSession/')
    .then(res => res.json())
    .then(res => {
        const chatList = res.map(el => {
            return listElement(el.userName, el.userMessage)
        })
        console.log('chatList', chatList);
        
        messagesList.insertAdjacentHTML('beforeend', chatList.join(' '));
    })
    .catch(err => console.error(err));
const newMessage = {
    userName: "",
    userMessage: ""    
}
const sendNewMessage = () => {
    newMessage.userName = userInput1.value;
    newMessage.userMessage = userInput2.value;

    fetch('http://localhost:3004/chatSession/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage)
    })
    .then(res => res.json())
        .then(() => {
            userInput1.value = ''
            userInput2.value = ''
    })
    .catch(err => console.error(err));
}

sendButton.addEventListener('click', sendNewMessage)