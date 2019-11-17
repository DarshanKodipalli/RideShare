"""
Author: Maneesh Divana <maneeshd77@gmail.com>

REST API: Fare Estimation for RideShare
"""
from flask import Flask, request, jsonify
from os import urandom
from os.path import realpath, dirname, join
from joblib import load
from sys import exit


CUR_DIR = realpath(dirname(__file__))
MODEL_NAME = "fare_model.lzma"

app = Flask(__name__)
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


@app.route("/get_fare_estimate", methods=["GET"])
def get_fare_estimate():
    """
    Returns the estimated ride fare

    Method: GET
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

        pred = app.config.get("MODEL").predict([[duration, distance, is_pooled, trips_pooled]])

        resp = jsonify({"fare": pred[0]})
    except KeyError:
        resp = jsonify("Invalid Request Parameters")
        resp.status = 400
    except Exception as exp:
        print(exp)
        resp = jsonify("API Error")
        resp.status = 500
    finally:
        resp.headers.add_header("Access-Control-Allow-Origin", "*")
        return resp


if __name__ == "__main__":
    app.config["SECRET_KEY"] = urandom(32).hex()
    app.run(
        host="localhost",
        port=5000,
        debug=False,
        threaded=True
    )