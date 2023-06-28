def createRadicalDocument(rawDoc):
    newDoc = {
        "id": rawDoc.get("id"),
        "data": {
            "level": rawDoc["data"].get("level"),
            "slug": rawDoc["data"].get("slug"),
            "document_url": rawDoc["data"].get("document_url"),
            "characters": rawDoc["data"].get("characters"),
        },
    }

    return newDoc


def createKanjiDocument(rawDoc):
    newDoc = {
        "id": rawDoc.get("id"),
        "data": {
            "level": rawDoc["data"].get("level"),
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
