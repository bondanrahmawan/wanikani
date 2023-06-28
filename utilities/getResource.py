import requests
import json

next_url = "https://api.wanikani.com/v2/subjects"

i = 0

resourceData = []

while next_url is not None and i < 20:
    print(next_url)
    payload = ""
    headers = {"Authorization": "Bearer "}

    response = requests.request("GET", next_url, headers=headers, data=payload)

    data = response.json()
    next_url = data["pages"]["next_url"]
    batchData = data["data"]
    print(next_url)
    resourceData.extend(batchData)
    i = i + 1
    print("========================")

with open("resourceAll.json", "w") as file:
    json.dump(resourceData, file)
