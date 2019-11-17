from pandas import read_csv
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import RobustScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor
from joblib import dump


if __name__ == "__main__":
    print("Loading dataset...")
    df = read_csv("trips_clean.csv")
    print("Dataset Loaded.")

    best_hyperparameters = {'max_depth': 10, 'n_estimators': 100, 'random_state': 7, 'n_jobs': 4}
    print("Creating model pipeline...")
    pipeline = Pipeline([
        ("scaler", RobustScaler()),
        ("regressor", RandomForestRegressor(**best_hyperparameters))
    ])
    print("Model pipeline created.")

    print("Splitting dataset into training and testing set...")
    target = df.FARE
    features = df.drop("FARE", axis=1)
    x_train, x_test, y_train, y_test = train_test_split(features, target, test_size=0.1, random_state=0)
    print("Dataset split into training and testing set.")

    print("Training model pipeline...")
    pipeline.fit(x_train, y_train)
    print("Model pipeline trained.")

    print("Testing model pipeline...")
    score = pipeline.score(x_test, y_test)
    print(f"Accuracy Score: {score * 100:.2f}%\n")

    y_pred = pipeline.predict(x_test)

    print("Running Performance Metrics...")
    r2 = r2_score(y_true=y_test, y_pred=y_pred)
    rmse = mean_squared_error(y_true=y_test, y_pred=y_pred)
    mae = mean_absolute_error(y_true=y_test, y_pred=y_pred)
    print(f"Mean Absolute Error     : {mae:.2f}")
    print(f"Root Mean Squared Error : {rmse:.2f}")
    print(f"R^2 Score               : {r2:.2f}\n")
    print("Model pipeline testing done.")

    print("Exporting model pipeline to file...")
    dump(pipeline, "fare_model.lzma", compress=("lzma", 9))
    print("Model pipeline exported to file: fare_model.lzma.")
