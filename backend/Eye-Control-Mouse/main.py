import cv2
import mediapipe as mp
import pyautogui
import streamlit as st
import numpy as np

# Streamlit UI Setup
st.set_page_config(page_title="Eye Controlled Mouse", layout="wide")
st.title("👀 Eye Controlled Mouse")
st.write("Control your mouse cursor using eye movement and blinking.")

# Initialize session state for camera control
if "camera_active" not in st.session_state:
    st.session_state.camera_active = True

# Create Stop Camera button (outside the loop)
if st.button("Stop Camera", key="stop_btn"):
    st.session_state.camera_active = False

# Video display placeholder
frame_placeholder = st.empty()

# Capture video
cam = cv2.VideoCapture(0)
face_mesh = mp.solutions.face_mesh.FaceMesh(refine_landmarks=True)
screen_w, screen_h = pyautogui.size()

while cam.isOpened() and st.session_state.camera_active:
    ret, frame = cam.read()
    if not ret:
        st.error("Failed to capture video.")
        break

    frame = cv2.flip(frame, 1)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    output = face_mesh.process(rgb_frame)
    landmark_points = output.multi_face_landmarks
    frame_h, frame_w, _ = frame.shape

    if landmark_points:
        landmarks = landmark_points[0].landmark

        # Eye for cursor movement
        for id, landmark in enumerate(landmarks[474:478]):
            x = int(landmark.x * frame_w)
            y = int(landmark.y * frame_h)
            cv2.circle(frame, (x, y), 3, (0, 255, 0), -1)
            if id == 1:  # Tracking main point for cursor
                frame_x = x
                frame_y = y

                # Mapping to screen
                screen_x = screen_w / frame_w * frame_x
                screen_y = screen_h / frame_h * frame_y
                pyautogui.moveTo(screen_x, screen_y)

        # Left eye for blink detection
        left = [landmarks[145], landmarks[159]]
        for landmark in left:
            x = int(landmark.x * frame_w)
            y = int(landmark.y * frame_h)
            cv2.circle(frame, (x, y), 3, (0, 255, 255), -1)

        # Blink detection with better threshold
        if (left[0].y - left[1].y) < 0.015:  # Adjust threshold as needed
            pyautogui.click()
            cv2.waitKey(300)  # Small delay to prevent double click

    # Convert frame to RGB and display in Streamlit
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    frame_placeholder.image(frame, channels="RGB")

cam.release()
st.success("Camera Stopped.")
