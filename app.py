from flask import Flask, Response, render_template
import cv2
from roboflow import Roboflow
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Roboflow 객체 생성 (API 키 필요)
rf = Roboflow(api_key="oxklL1EcEBgoWd2Au4Zv")
project = rf.workspace("fec").project("fec")
model = project.version(1).model
color_list = [(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)) for _ in range(100)]


def generate_frames():
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        prediction_result = model.predict(frame, confidence=70, overlap=30).json()
        predictions = prediction_result['predictions']

        for prediction in predictions:
            class_name = prediction['class']
            x, y, width, height = prediction['x'], prediction['y'], prediction['width'], prediction['height']
            color = color_list[hash(class_name) % len(color_list)]
            x_min, y_min, x_max, y_max = int(x), int(y), int(x + width), int(y + height)
            cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), color, 2)
            cv2.putText(frame, class_name, (x_min, y_min - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)