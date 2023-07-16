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

export type KanjiDetail = {
	primary: boolean;
	accepted_answer: boolean;
	meaning: string;
	reading: string;
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

export type RadicalExercise = {
	id: number;
	data: {
		slug: string;
		characters: string;
		answer: string;
	};
};

export type Kanji = {
	id: number;
	data: {
		level: number;
		slug: string;
		document_url: string;
		characters: string;
		readings: Array<KanjiDetail>;
		meanings: Array<KanjiDetail>;
	};
};

export type KanjiExercise = {
	id: number;
	data: {
		characters: string;
		readings: Array<KanjiDetail>;
		readingAnswer: string;
		meanings: Array<KanjiDetail>;
		meaningAnswer: string;
	};
};

export type ExerciseModel = {
	id: number;
	materialType: string;
	questionType: string;
	data: {
		characters: string;
		question: Array<string>;
		answer: string;
	};
};

export type Kana = {
	id: number;
	data: {
		level: number;
		slug: string;
		document_url: string;
		characters: string;
		meanings: Array<KanjiDetail>;
	};
};

export type BaseKana = {
	kana: string;
	romaji: string;
	type: string;
};
