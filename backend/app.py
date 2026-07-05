from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import time

app = Flask(__name__)
CORS(app)

streamlit_process = None

@app.route('/start-eye-control', methods=['GET'])
def start_eye_control():
    global streamlit_process

    if streamlit_process is None or streamlit_process.poll() is not None:
        # Start Streamlit in background
        streamlit_process = subprocess.Popen(
            "streamlit run Eye-Control-Mouse/main.py",
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=True
        )
        time.sleep(3)  # wait for Streamlit to start
        return jsonify({"message": "Streamlit app started!", "url": "http://localhost:8501/"}), 200
    else:
        return jsonify({"message": "Streamlit is already running!", "url": "http://localhost:8501/"}), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
