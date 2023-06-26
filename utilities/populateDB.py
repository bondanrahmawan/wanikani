from pymongo import MongoClient

# Set up the MongoDB connection
client = MongoClient("mongodb://localhost:27017")

# Access a specific database
db = client["admin"]

# Access a specific collection within the database
collection = db["kana_vocabulary"]

# Perform operations on the collection
# For example, insert a document
document = {
    "id": 9177,
    "object": "kana_vocabulary",
    "data": {
        "level": 2,
        "slug": "おはよう",
        "document_url": "https://www.wanikani.com/vocabulary/%E3%81%8A%E3%81%AF%E3%82%88%E3%81%86",
        "characters": "おはよう",
        "meanings": [
            {"meaning": "Good Morning", "primary": True, "accepted_answer": True},
            {"meaning": "Morning", "primary": False, "accepted_answer": True},
        ],
        "context_sentences": [
            {"en": "Good morning, Miho-chan!", "ja": "ミホちゃん、おはよう！"},
            {"en": 'I texted "good morning" to Mike.', "ja": "マイクに「おはよう」とメールをした。"},
            {"en": "Ugh, I'm sleepy... morning.", "ja": "うーっ、ねむいー、おはよう。"},
        ],
    },
}


result = collection.insert_one(document)
print("Inserted document ID:", result.inserted_id)

# Close the connection
client.close()
