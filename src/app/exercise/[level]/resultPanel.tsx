import { ExerciseModel } from "../../../../model/commonTypes";
import styles from "./page.module.css";

type ResultPanelProps = {
	answers: Array<ExerciseModel>;
};

const ResultPanel: React.FC<ResultPanelProps> = ({ answers }) => {
	const components: Array<JSX.Element> = [];
	var correctAnswer = 0;

	function checkAnswer(lowerCaseCorrectAnswers: Array<string>, answer: string) {
		return lowerCaseCorrectAnswers.includes(answer);
	}

	answers.sort((a, b) => a.id - b.id);

	answers.forEach((k) => {
		const lowerCaseCorrectAnswers = k.data.question.map((answerKey) => {
			return answerKey.toLowerCase();
		});

		const isCorrect: boolean = checkAnswer(lowerCaseCorrectAnswers, k.data.answer);
		if (isCorrect) {
			correctAnswer = correctAnswer + 1;
		}

		components.push(
			<ResultCard
				key={k.id}
				character={k.data.characters}
				slug={lowerCaseCorrectAnswers}
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
				<span className={styles.headerMeaning}>
					{correctAnswer}/{answers.length}
				</span>
				<span className={styles.headerMeaning}>
					{((correctAnswer * 100) / answers.length).toString().split(".")[0]}%
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

const ResultCard: React.FC<CardProps> = ({ character, slug, answer, materialType, isCorrect }) => {
	const answerStyle = isCorrect ? styles.correct : styles.incorrect;

	const cardClassName =
		materialType === "kotoba"
			? styles.cardResult + " " + styles.kotoba
			: materialType === "kanji"
			? styles.cardResult + " " + styles.kanji
			: styles.cardResult + " " + styles.radical;

	return (
		<div className={cardClassName}>
			<span className={styles.charactersLong}>{character}</span>
			<span className={styles.resultMeaning + " " + styles.correct}>{slug.join(", ")}</span>
			<span className={styles.resultAnswer + " " + answerStyle}>{answer}</span>
		</div>
	);
};

export default ResultPanel;
