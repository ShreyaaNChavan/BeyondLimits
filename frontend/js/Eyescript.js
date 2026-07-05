const videoElement = document.getElementById("videoFeed");
const startButton = document.getElementById("startAssistant");
const stopButton = document.getElementById("stopAssistant");
const statusText = document.getElementById("status");


let stream = null;
let listening = false;
let recognition = null;
const GEMINI_API_KEY = "";

// Start the camera
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
    } catch (error) {
        statusText.innerText = "Camera access denied. Please enable camera.";
        console.error("Camera error:", error);
    }
}

// Capture Image from Video
function captureFrame() {
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Debug: Show the image being sent
    document.body.appendChild(canvas);

    return canvas.toDataURL("image/jpeg");
}


// Speech Recognition Setup
function startSpeechRecognition() {
    if (!("webkitSpeechRecognition" in window)) {
        statusText.innerText = "Speech Recognition not supported in your browser.";
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = function () {
        listening = true;
        statusText.innerText = "Listening... Say your question.";
    };

    recognition.onresult = async function (event) {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log("User said:", transcript);

        if (transcript.includes("stop")) {
            stopAssistant();
            return;
        }

        processUserQuery(transcript);
    };

    recognition.onerror = function (event) {
        console.error("Speech Recognition Error:", event.error);
        statusText.innerText = "Error in speech recognition.";
    };

    recognition.start();
}

// Process User Query with Gemini API
async function processUserQuery(query) {
    statusText.innerText = "Analyzing...";

    // Capture Image
    const imageBase64 = captureFrame();

    const requestBody = {
        contents: [
            {
                role: "user",
                parts: [
                    { text: query },
                    { inlineData: { mimeType: "image/jpeg", data: imageBase64.split(",")[1] } }
                ]
            }
        ]
    };

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log("Gemini Response:", data);

        if (data.candidates && data.candidates.length > 0) {
            const reply = data.candidates[0].content.parts[0].text;
            statusText.innerText = reply;
            speak(reply);
        } else {
            statusText.innerText = "Couldn't understand the image.";
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        statusText.innerText = "Error processing request.";
    }
}

// Text-to-Speech (TTS)
function speak(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = "en-US";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

// Start the assistant
function startAssistant() {
    startCamera();
    startSpeechRecognition();
    statusText.innerText = "Assistant Started. Ask a question.";
}

// Stop the assistant
function stopAssistant() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    if (recognition) {
        recognition.stop();
    }
    statusText.innerText = "Assistant Stopped.";
}

// Event Listeners
startButton.addEventListener("click", startAssistant);
stopButton.addEventListener("click", stopAssistant);
