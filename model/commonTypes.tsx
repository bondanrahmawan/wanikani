export type Meaning = {
	meaning: string;
	primary: boolean;
	accepted_answer: boolean;
};

export type Reading = {
	type: string;
	primary: boolean;
	reading: string;
	accepted_answer: boolean;
};

export type ContextSentence = {
	en: string;
	ja: string;
};

export type CharacterImage = {
	url: string;
	metadata: {
		color: string;
		dimensions: string;
		style_name: string;
	};
	content_type: string;
};

export type KanjiMeaning = {
	meaning: string;
	primary: boolean;
	accepted_answer: boolean;
};

export type KanjiReading = {
	reading: string;
	primary: boolean;
	accepted_answer: boolean;
};

export type Radical = {
	id: number;
	data: {
		level: number;
		slug: string;
		document_url: string;
		characters: string;
		character_images: Array<CharacterImage>;
	};
};

export type Kanji = {
	id: number;
	data: {
		level: number;
		slug: string;
		document_url: string;
		characters: string;
		readings: Array<KanjiReading>;
		meanings: Array<KanjiMeaning>;
	};
};

export type Kana = {
	id: number;
	data: {
		level: number;
		slug: string;
		document_url: string;
		characters: string;
		meanings: Array<KanjiMeaning>;
	};
};
