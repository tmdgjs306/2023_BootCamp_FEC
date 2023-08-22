from flask import Flask, request, jsonify
from flask_cors import CORS
from roboflow import Roboflow
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

rf = Roboflow(api_key="oxklL1EcEBgoWd2Au4Zv")
project = rf.workspace("fec").project("fec")
model = project.version(1).model

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' in request.files:
        image = request.files['image']
        if image.filename == '':
            return jsonify({"error": "No selected file"})

        filename = secure_filename(image.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(filepath)

        prediction_result = model.predict(filepath, confidence=60, overlap=30).json()
        filtered_predictions = [item for item in prediction_result['predictions'] if item['confidence'] >= 60]
        if filtered_predictions:
            predicted_class = filtered_predictions[0]['class']
            return jsonify({"class": predicted_class})
        else:
            return jsonify({"class": "Unknown"})  # No prediction above the threshold



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
