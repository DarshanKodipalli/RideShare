#!/usr/bin/env python3
# coding: utf-8

# In[4]:


from joblib import load


# In[5]:


model = load("fare_model.lzma")


# In[9]:


user_data = [
    [801.0, 3.2, 0, 1],
    [801.0, 3.2, 1, 2],
    [250.25, 1.2, 0, 1],
    [347.41, 1.5, 1, 4],
    [1800.12, 7.28, 0, 1]
]


# In[10]:


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
