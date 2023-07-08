import { useState } from "react";
import { ExerciseModel } from "../../../../model/commonTypes";
import styles from "./page.module.css";

type ResultPanelProps = {
	answers: Array<ExerciseModel>;
};

const ResultPanel: React.FC<ResultPanelProps> = ({ answers }) => {
	const components: Array<JSX.Element> = [];
	var correctAnswer = 0;

	function checkAnswer(correctAnswers: Array<string>, answer: string) {
		const lowerCaseCorrectAnswers = correctAnswers.map((answerKey) => {
			return answerKey.toLowerCase();
		});
		return lowerCaseCorrectAnswers.includes(answer);
	}

	answers.sort((a, b) => a.id - b.id);

	answers.forEach((k) => {
		const isCorrect: boolean = checkAnswer(k.data.question, k.data.answer);
		if (isCorrect) {
			correctAnswer = correctAnswer + 1;
		}

		components.push(
			<ResultCard
				key={k.id}
				character={k.data.characters}
				slug={k.data.question}
				answer={k.data.answer}
				materialType={k.materialType}
				isCorrect={isCorrect}
			/>
		);
	});

	const finalComponent = (
		<div className={styles.result}>
			<div className={styles.cardResult + " " + styles.header}>
				<span className={styles.charactersLong}>Result</span>
				<span className={styles.meaning}>
					{correctAnswer}/{answers.length}
				</span>
				<span className={styles.answer}>
					{(correctAnswer * 100) / answers.length}%
				</span>
			</div>
			<div className={styles.panelLong}>{components}</div>
		</div>
	);

	return finalComponent;
};

type CardProps = {
	character: string;
	slug: Array<string>;
	answer: string;
	materialType: string;
	isCorrect: boolean;
};

const ResultCard: React.FC<CardProps> = ({
	character,
	slug,
	answer,
	materialType,
	isCorrect,
}) => {
	const newSlug = slug.map((answerKey) => {
		return answerKey.toLowerCase();
	});
	const answerStyle = newSlug.includes(answer)
		? styles.correct
		: styles.incorrect;

	const cardClassName =
		materialType === "kotoba"
			? styles.cardResult + " " + styles.kotoba
			: materialType === "kanji"
			? styles.cardResult + " " + styles.kanji
			: styles.cardResult + " " + styles.radical;

	return (
		<div className={cardClassName}>
			<span className={styles.charactersLong}>{character}</span>
			<span className={styles.meaning + " " + styles.correct}>
				{newSlug.join(", ")}
			</span>
			<span className={styles.answer + " " + answerStyle}>{answer}</span>
		</div>
	);
};

export default ResultPanel;
