from flask import Flask, render_template, jsonify, request, abort
import requests
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv(
    dotenv_path="../.env"
);



app = Flask(__name__)
api_key = os.getenv('API_KEY');
weather_api_url = os.getenv('WEATHER_API_URL');
port = os.getenv('PORT');


# ALLOWED_IPS = ['192.168.0.140', '203.0.113.5'] 

# @app.before_request
# def limit_remote_addr():
#     """Check if the client's IP is in the allowed list"""
#     if request.remote_addr not in ALLOWED_IPS:
#         abort(403)  # Forbidden, IP is not allowed

def get_weather_data(city):
    """
    Fetch weather forecast data for the given city.
    """
    WEATHER_API_URL = f"{weather_api_url}?q={city}&appid={api_key}&units=metric"
    try:
        response = requests.get(WEATHER_API_URL)
        response.raise_for_status()  # Raises an exception for HTTP errors (4xx, 5xx)
        data = response.json()

        forecast = [
            {
                "date": datetime.utcfromtimestamp(day["dt"]).strftime('%Y-%m-%d'),
                "temp": day["main"]["temp"],
                "humidity": day["main"]["humidity"],
                "wind_speed": day["wind"]["speed"],
                "description": day["weather"][0]["description"],
            }
            for i, day in enumerate(data["list"]) if i % 8 == 0  # Extracting daily data
        ]
        return forecast
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return None


def predict_irrigation(crop, soil, last_irrigation, weather_data):
    """
    Predict whether irrigation is needed based on soil type, last irrigation date, and weather forecast.
    """
    if not weather_data:
        return "Weather data not available."

    upcoming_rain = any("rain" in day["description"].lower() for day in weather_data)
    if upcoming_rain:
        return "Rain is expected. No need to irrigate now."

    # Soil moisture estimation based on type
    soil_moisture_days = {"sandy": 2, "loamy": 4, "clayey": 6}
    try:
        last_irrigation_date = datetime.strptime(last_irrigation, '%Y-%m-%d')
        days_since_irrigation = (datetime.now() - last_irrigation_date).days
    except ValueError:
        return "Invalid date format. Please enter the last irrigation date in YYYY-MM-DD format."

    if days_since_irrigation > soil_moisture_days.get(soil.lower(), 3):
        return "It's been a while since irrigation. Consider watering the crops."
    
    return "Soil moisture might still be sufficient. Check soil conditions manually."


@app.route("/predict/weather", methods=["POST"])
def home():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid input, expected JSON"}), 400
    
    city = data.get("city", "").strip()
    crop = data.get("crop", "").strip()
    soil = data.get("soil", "").strip()
    last_irrigation = data.get("last_irrigation", "").strip()

    if not city or not crop or not soil or not last_irrigation:
        return jsonify({"error": "Missing required fields. Please provide city, crop, soil, and last_irrigation."}), 400

    weather_data = get_weather_data(city)
    if not weather_data:
        return jsonify({"error": "Failed to fetch weather data for the given city."}), 500

    irrigation_advice = predict_irrigation(crop, soil, last_irrigation, weather_data)

    return jsonify({
        "irrigation_advice": irrigation_advice,
        "weather_data": weather_data
    }), 200
    
    
@app.route('/weather', methods=['POST'])
def getWeather():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "Invalid input, expected date"}), 400

    city = data.get("city", "").strip()
    
    if not city:
        return jsonify({"error": "Missing required fields. Please provide city"}), 400
    
    weather_data = get_weather_data(city);   
    
    if not weather_data:
        return jsonify({"error": "Failed to fetch weather data for the given city."}), 500
    
    return jsonify({
        "weather_data": weather_data
    }), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=port, use_reloader=False)
