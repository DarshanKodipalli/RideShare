# A Machine Learning Model to Predict RideShare Trip Fare

## Pre-requisites

1. **[Miniconda (Python 3)](https://docs.conda.io/en/latest/miniconda.html)**
2. **[Java > 1.8](https://aws.amazon.com/corretto/)**

### Create Virtual Environmnet and Install Required Python Packages

**Environment File: [fare_model.yml](fare_model.yml)**

Assuming that Miniconda(python-3) and Java are installed and working as expected:

```bash
# Load conda base environment first
$ source <miniconda-installation-path>/bin/activate

# Create a virtual environment
(base) $ conda env create -f fare_model.yml
```

### Activating the Virtual Environmnet
```
(base) $ conda activate fare_model

(fare_model) $
```

-----

## Opening Notebooks

Navigate to the folder and open terminal there:

```bash
(fare_model) $ jupyter notebook
```

This will open the jupyter file navigator in the default browser. For there open any notebook/html/py file.

To open a specific notebook:

```bash
(fare_model) $ jupyter notebook fare_modeling.ipynb

(fare_model) $ jupyter notebook test.ipynb
```

-----

## Using the exported persistent model in other applications

### Install the python package requirements

**Minimum Requirements File: [min_requirements.txt](min_requirements.txt)**

```bash
$ pip install -U -r min_requirements.txt
```

### Load the model from file and predict

**Model File: [fare_model.lzma](fare_model.lzma)**

```python
from joblib import load

model = load("fare_model.lzma")

user_data = [
    [801.0, 3.2, 0, 1],
    [801.0, 3.2, 1, 2],
    [250.25, 1.2, 0, 1],
    [347.41, 1.5, 1, 4],
    [1800.12, 7.28, 0, 1]
]

for data in user_data:
    is_pooled = "YES" if data[2] == 1 else "NO"
    print(
        f"DURATION={data[0]:.2f} mins, "
        f"DISTANCE={data[1]:.2f} miles, "
        f"IS_POOLED={is_pooled}, "
        f"TRIPS_IN_POOL={data[3]}"
    )
    pred = model.predict([data])
    print(f"Predicted Fare=${pred[0]:.2f}\n")

```

-----

## Author

**👨‍💻 Maneesh Divana**

**📧 [mdivana@hawk.iit.edu](mailto:mdivana@hawk.iit.edu) ◆ [maneeshd77@gmail.com](mailto:maneeshd77@gmail.com)**

-----
