import json
from pymongo import MongoClient
from documentMapperService import (
    createRadicalDocument,
    createKanjiDocument,
    createKotobaKanjiDocument,
    createKotobaKanaDocument,
)

# Set up the MongoDB connection
client = MongoClient("mongodb://localhost:27017")

# Access a specific database
db = client["admin"]

# Access a specific collection within the database
collectionRadical = db["radical"]
collectionKanji = db["kanji"]
collectionKotobaKanji = db["kotoba_kanji"]
collectionKotobaKana = db["kotoba_kana"]

# Specify the path to the JSON file
file_path = "resourceAll.json"

# Open the file in read mode
with open(file_path, "r") as file:
    # Load the JSON data as a list of objects
    data = json.load(file)

# Access and iterate over each JSON object
for obj in data:
    # Access specific properties of each object
    if obj["object"] == "radical":
        result = collectionRadical.insert_one(createRadicalDocument(obj))
    # elif obj["object"] == "kanji":
    #     result = collectionKanji.insert_one(createKanjiDocument(obj))
    # elif obj["object"] == "vocabulary":
    #     result = collectionKotobaKanji.insert_one(createKotobaKanjiDocument(obj))
    # else:
    #     result = collectionKotobaKana.insert_one(createKotobaKanaDocument(obj))

# Close the connection
client.close()
