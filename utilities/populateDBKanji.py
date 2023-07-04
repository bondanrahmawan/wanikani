import json
from pymongo import MongoClient
from documentMapperService import (
    createRadicalDocument,
    createKanjiDocument,
    createKotobaKanjiDocument,
    createKotobaKanaDocument,
)

# Set up the MongoDB connection
client = MongoClient(
    "mongodb+srv://admin:<password:Administrator>@cluster0.1dj9w0e.mongodb.net/"
)

# Access a specific database
db = client["wanikani"]

# Access a specific collection within the database
collectionKanji = db["kanji"]

# Specify the path to the JSON file
file_path = "resourceKanji.json"

# Open the file in read mode
with open(file_path, "r") as file:
    data = json.load(file)

for obj in data:
    result = collectionKanji.insert_one(createKanjiDocument(obj))

# Close the connection
client.close()
