import json
from documentMapperService import (
    createRadicalDocument,
    createKanjiDocument,
    createKotobaKanjiDocument,
    createKotobaKanaDocument,
)

# Specify the path to the JSON file
file_path = "resourceAll.json"

radicalData = []
kanjiData = []
kotobaKanjiData = []
kotobaKanaData = []

# Open the file in read mode
with open(file_path, "r") as file:
    # Load the JSON data as a list of objects
    data = json.load(file)

# Access and iterate over each JSON object
for obj in data:
    # Access specific properties of each object
    if obj["object"] == "radical":
        radicalData.append(createRadicalDocument(obj))
    elif obj["object"] == "kanji":
        kanjiData.append(createKanjiDocument(obj))
    elif obj["object"] == "vocabulary":
        kotobaKanjiData.append(createKotobaKanjiDocument(obj))
    else:
        kotobaKanaData.append(createKotobaKanaDocument(obj))

with open("resourceRadical.json", "w") as file:
    json.dump(radicalData, file)
with open("resourceKanji.json", "w") as file:
    json.dump(kanjiData, file)
with open("resourceKotobaKanji.json", "w") as file:
    json.dump(kotobaKanjiData, file)
with open("resourceKotobaKana.json", "w") as file:
    json.dump(kotobaKanaData, file)
