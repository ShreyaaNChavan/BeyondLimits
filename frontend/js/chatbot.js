// Toggle chatbot visibility
function toggleChat() {
    let chatbot = document.getElementById("chatbot-container");
    chatbot.style.display = (chatbot.style.display === "block") ? "none" : "block";
}

// Predefined responses
const responses = [
    { keywords: ["hello", "hi", "hey"], response: "Hello! How can I assist you with BeyondLimits? 😊" },
    { keywords: ["good morning"], response: "Good morning! Ready to explore BeyondLimits?" },
    { keywords: ["good afternoon"], response: "Good afternoon! How can I assist you?" },
    { keywords: ["good evening"], response: "Good evening! Need any help with BeyondLimits?" },

    { keywords: ["what is beyondlimits", "tell me about beyondlimits"], response: "BeyondLimits is an AI-powered learning platform for personalized education." },
    { keywords: ["beyondlimits"], response: "BeyondLimits enhances learning with AI, skill gap analysis, and accessibility features." },
    
    { keywords: ["feature", "what can beyondlimits do", "list features"], response: "BeyondLimits offers AI-driven learning, skill gap analysis, multi-language support, and accessibility features." },

    { keywords: ["accessible", "disabled", "assistive"], response: "Yes! BeyondLimits is designed for accessibility, including voice control and screen reader support." },
    
    { keywords: ["ai", "artificial intelligence", "how does ai work"], response: "Our AI personalizes learning paths, suggests improvements, and provides skill analysis." },
    
    { keywords: ["who made this", "who developed beyondlimits", "who are the creators"], response: "BeyondLimits was created by an innovative team passionate about accessibility and AI in learning!" },
    
    { keywords: ["free", "cost", "pricing"], response: "Yes! BeyondLimits offers free access with optional premium features for enhanced learning." },
    
    { keywords: ["sign up", "register"], response: "You can sign up on our website by providing your email and creating a password." },
    
    { keywords: ["reset password", "forgot password"], response: "Click 'Forgot Password' on the login page and follow the instructions to reset it." },
    
    { keywords: ["mobile", "phone", "responsive"], response: "Yes! Our platform is fully responsive and works on all devices." },
    
    { keywords: ["who are you"], response: "I'm the BeyondLimits chatbot, here to assist you! 🤖" },
    
    { keywords: ["thank you", "thanks"], response: "You're welcome! 😊 Let me know if you need more help." },
    
    { keywords: ["bye", "goodbye"], response: "Goodbye! Have a great day! 🚀" }
];

// Function to handle user input
function getBotResponse(input) {
    input = input.toLowerCase();

    for (let i = 0; i < responses.length; i++) {
        for (let j = 0; j < responses[i].keywords.length; j++) {
            if (input.includes(responses[i].keywords[j])) {
                return responses[i].response;
            }
        }
    }
    return "I'm not sure about that. Can you try asking in a different way? 🤔";
}

// Example usage
console.log(getBotResponse("Tell me about BeyondLimits"));  // Example Test
console.log(getBotResponse("What features does it have?")); // Example Test
console.log(getBotResponse("How does AI work in BeyondLimits?")); // Example Test


// Handle user input
function sendMessage() {
    let inputField = document.getElementById("user-input");
    let message = inputField.value.trim().toLowerCase();
    if (!message) return;

    // Display user message
    let chatBody = document.getElementById("chat-body");
    let userMsgDiv = document.createElement("div");
    userMsgDiv.classList.add("user-message");
    userMsgDiv.textContent = message;
    chatBody.appendChild(userMsgDiv);

    // Get bot response
    let response = getBotResponse(message);

    
    // Display bot response
    let botMsgDiv = document.createElement("div");
    botMsgDiv.classList.add("bot-message");
    botMsgDiv.textContent = response;
    setTimeout(() => {
        chatBody.appendChild(botMsgDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll
    }, 500);

    // Clear input field
    inputField.value = "";
}
