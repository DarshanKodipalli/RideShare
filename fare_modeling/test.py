#!/usr/bin/env python
# coding: utf-8

# In[1]:


from joblib import load


# In[2]:


model = load("fare_model.lzma")


# In[3]:


user_data = [
    [801.0, 3.2, False, 1],
    [801.0, 3.2, True, 2],
    [250.25, 1.2, False, 1],
    [347.41, 1.5, True, 4],
    [1800.12, 7.28, False, 1]
]


# In[4]:


for data in user_data:
    is_pooled = "YES" if data[2] == 1 else "NO"
    print(
        f"DURATION={data[0]:.2f} secs, "
        f"DISTANCE={data[1]:.2f} miles, "
        f"IS_POOLED={is_pooled}, "
        f"TRIPS_IN_POOL={data[3]}"
    )
    pred = model.predict([data])
    print(f"Predicted Fare=${pred[0]:.2f}\n")


# In[ ]:




