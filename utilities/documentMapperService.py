def createRadicalDocument(rawDoc):
    characterImages = [
        item
        for item in rawDoc["data"]["character_images"]
        if item["metadata"].get("style_name") == "original"
    ]

    newDoc = {
        "id": rawDoc["id"],
        "data": {
            "level": rawDoc["data"]["level"],
            "slug": rawDoc["data"]["slug"],
            "document_url": rawDoc["data"]["document_url"],
            "characters": rawDoc["data"]["characters"],
            "character_images": characterImages,
        },
    }

    return newDoc


def createKanjiDocument(rawDoc):
    newDoc = {
        "id": rawDoc.get("id"),
        "data": {
            "level": rawDoc["data"]["level"],
            "slug": rawDoc["data"].get("slug"),
            "document_url": rawDoc["data"].get("document_url"),
            "characters": rawDoc["data"].get("characters"),
            "meanings": rawDoc["data"].get("meanings"),
            "readings": rawDoc["data"].get("readings"),
        },
    }

    return newDoc


def createKotobaKanjiDocument(rawDoc):
    newDoc = {
        "id": rawDoc.get("id"),
        "data": {
            "level": rawDoc["data"].get("level"),
            "slug": rawDoc["data"].get("slug"),
            "document_url": rawDoc["data"].get("document_url"),
            "characters": rawDoc["data"].get("characters"),
            "meanings": rawDoc["data"].get("meanings"),
            "readings": rawDoc["data"].get("readings"),
            "context_sentences": rawDoc["data"].get("context_sentences"),
        },
    }

    return newDoc


def createKotobaKanaDocument(rawDoc):
    newDoc = {
        "id": rawDoc.get("id"),
        "data": {
            "level": rawDoc["data"].get("level"),
            "slug": rawDoc["data"].get("slug"),
            "document_url": rawDoc["data"].get("document_url"),
            "characters": rawDoc["data"].get("characters"),
            "meanings": rawDoc["data"].get("meanings"),
            "context_sentences": rawDoc["data"].get("context_sentences"),
        },
    }

    return newDoc
