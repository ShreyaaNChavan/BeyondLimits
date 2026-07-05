# BeyondLimits – AI-Powered Accessibility Platform

## Overview

BeyondLimits is an AI-powered accessibility platform that aims to make digital systems more accessible for individuals with disabilities. The platform combines computer vision, speech technologies, and intelligent interaction methods to provide a hands-free and user-friendly experience.

The project currently includes voice commands, Text-to-Speech (TTS), Speech-to-Text (STT), gesture recognition, facial landmark tracking, and an eye-controlled virtual mouse. Sign language recognition is planned as a future enhancement.

---

## Objectives

- Build an inclusive accessibility platform.
- Enable hands-free computer interaction.
- Improve accessibility using AI and computer vision.
- Reduce dependency on traditional input devices.

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, Firebase |
| Machine Learning | Scikit-Learn, PyTorch |
| Computer Vision | OpenCV, MediaPipe |
| Speech Processing | Speech-to-Text (STT), Text-to-Speech (TTS) APIs |
| APIs | Speech Recognition APIs, TTS APIs |

---

## Features

### Voice Commands

- Execute application functions using voice input.
- Hands-free navigation.
- Speech converted into text using STT APIs.

---

### Text-to-Speech (TTS)

- Converts text responses into speech.
- Improves accessibility for visually impaired users.

---

### Speech-to-Text (STT)

- Converts spoken language into text.
- Used for voice-based interactions.

---

### Eye-Controlled Virtual Mouse

- Tracks eye movement using MediaPipe Face Mesh.
- Controls cursor movement.
- Blink detection is used for mouse click operations.

---

### Gesture Recognition

- Detects hand gestures using OpenCV and MediaPipe.
- Supports gesture-based interaction with the application.
- Can be extended for navigation and shortcut controls.

---

### Facial Landmark Tracking

- Detects facial landmarks in real time.
- Improves eye-tracking accuracy.
- Forms the foundation for future accessibility features.

---

## Project Structure

```text
BeyondLimits
│
├── Frontend (HTML, CSS, JavaScript)
├── Python Backend
├── Voice Command Module
├── Speech-to-Text Module
├── Text-to-Speech Module
├── Eye-Controlled Mouse
├── Gesture Recognition
├── Facial Landmark Tracking
├── AI Processing
└── APIs
```

---

## Workflow
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/34e09cd9-f8bb-4c5d-a162-1abf65b27d97" />

1. User opens the application.
2. Frontend provides the user interface.
3. Camera and microphone capture user input.
4. AI modules process voice, gestures, and facial landmarks.
5. Appropriate action is executed.
6. The system provides visual or audio feedback.

---

## Advantages

- Hands-free interaction.
- User-friendly interface.
- Modular architecture.
- Real-time computer vision.
- Supports multiple accessibility methods.

---

## Challenges

- Maintaining real-time performance.
- Handling different lighting conditions.
- Improving gesture recognition accuracy.
- Reducing speech recognition errors in noisy environments.

---
