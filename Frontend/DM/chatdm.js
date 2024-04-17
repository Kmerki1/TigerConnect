document.addEventListener('DOMContentLoaded', function() {
    var sendButton = document.getElementById('sendButton');
    var messageInput = document.getElementById('messageInput');
    var messageContainer = document.getElementById('newmessages');
  
    sendButton.addEventListener('click', function() {
      var messageText = messageInput.value.trim();
  
      if(messageText) {
        var messageElement = document.createElement('div');
        messageElement.classList.add('message', 'sent');
  
        var messageContent = document.createElement('p');
        messageContent.classList.add('message-content');
        messageContent.textContent = messageText;
  
        messageElement.appendChild(messageContent);
        messageContainer.appendChild(messageElement);
  
        messageInput.value = '';
      }
    });
  });
