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
collectionRadical = db["radical"]
collectionKanji = db["kanji"]
collectionKotobaKanji = db["kotoba_kanji"]
collectionKotobaKana = db["kotoba_kana"]

# Specify the path to the JSON file
file_path = "resourceAll.json"

# Open the file in read mode
with open(file_path, "r") as file:
    data = json.load(file)

for obj in data:
    # Access specific properties of each object
    if obj["object"] == "radical":
        result = collectionRadical.insert_one(createRadicalDocument(obj))
    elif obj["object"] == "kanji":
        result = collectionKanji.insert_one(createKanjiDocument(obj))
    elif obj["object"] == "vocabulary":
        result = collectionKotobaKanji.insert_one(createKotobaKanjiDocument(obj))
    else:
        result = collectionKotobaKana.insert_one(createKotobaKanaDocument(obj))

# Close the connection
client.close()
