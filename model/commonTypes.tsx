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
