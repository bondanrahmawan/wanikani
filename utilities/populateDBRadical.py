import json
from pymongo import MongoClient
from documentMapperService import (
    createRadicalDocument,
)

# Set up the MongoDB connection
client = MongoClient(
    "mongodb+srv://admin:<password:Administrator>@cluster0.1dj9w0e.mongodb.net/"
)

# Access a specific database
db = client["wanikani"]

# Access a specific collection within the database
collectionRadical = db["radical"]

# Specify the path to the JSON file
file_path = "resourceRadical.json"

# Open the file in read mode
with open(file_path, "r") as file:
    data = json.load(file)

for obj in data:
    # Access specific properties of each object
    result = collectionRadical.insert_one(createRadicalDocument(obj))


# Close the connection
client.close()
