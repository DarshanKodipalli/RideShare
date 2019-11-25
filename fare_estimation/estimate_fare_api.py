"""
Author: Maneesh Divana <maneeshd77@gmail.com>

REST API: Fare Estimation for RideShare
"""
from os import urandom
from os.path import realpath, dirname, join
from sys import exit, argv

from flask import Flask, request, jsonify
from flask_cors import CORS

from joblib import load


CUR_DIR = realpath(dirname(__file__))
MODEL_NAME = "fare_model.lzma"

app = Flask(__name__)
CORS(app)
app.config["MODEL"] = None


with app.app_context():
    """Loads the ml model from file into a python object in memory"""
    try:
        print("[AppSetup] Loading regression model...")
        app.config["MODEL"] = load(join(CUR_DIR, MODEL_NAME))
        print("[AppSetup] Regression model loaded.")
    except Exception as exp:
        print(exp)
        exit(1)


@app.route("/estimate_fare/are_you_alive")
def is_alive():
    """Returns true if the server is up and running"""
    return jsonify({"STATUS": True}).headers.add("Access-Control-Allow-Origin", "*")


@app.route("/estimate_fare/api/v1/get_fare_estimate", methods=["POST"])
def get_fare_estimate():
    """
    Returns the estimated ride fare

    Method: POST
    Parameters: {
        "duration": <float>,    # in seconds
        "distance": <float>,    # in miles
        "is_pooled": <bool>,
        "trips_pooled": <int>
    }
    Response: {"fare": <float>}
    """
    resp = None
    try:
        data = request.get_json(force=True)
        duration = data["duration"]
        distance = data["distance"]
        is_pooled = data["is_pooled"]
        trips_pooled = data["trips_pooled"]

        pred = app.config.get("MODEL").predict(
            [[duration, distance, is_pooled, trips_pooled]]
        )

        resp = jsonify({"fare": pred[0]})
    except KeyError:
        resp = jsonify("Invalid Request Parameters")
        resp.status = 400
    except Exception as exp:
        print(exp)
        resp = jsonify("API Error")
        resp.status = 500
    finally:
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp


if __name__ == "__main__":
    app.config["SECRET_KEY"] = urandom(32).hex()
    try:
        port = argv[1]
    except IndexError:
        port = 5555
    app.run(host="localhost", port=port, debug=False, threaded=True)
