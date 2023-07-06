import { ExerciseModel } from "../../../../model/commonTypes";
import styles from "./page.module.css";

type ResultPanelProps = {
	answers: Array<ExerciseModel>;
};

const ResultPanel: React.FC<ResultPanelProps> = ({ answers }) => {
	const components: Array<JSX.Element> = [];

	answers.sort((a, b) => a.id - b.id);

	answers.forEach((k) =>
		components.push(
			<RadicalCard
				key={k.id}
				character={k.data.characters}
				slug={k.data.question}
				answer={k.data.answer}
				materialType={k.materialType}
			/>
		)
	);

	const finalComponent = (
		<div className={styles.result}>
			<h2 className={styles.headerSection}>Exercise Result</h2>
			<div className={styles.cardKotoba + " " + styles.header}>
				<span className={styles.charactersLong}>Character</span>
				<span className={styles.titleBoxLong}>
					<span className={styles.meaning}>Meaning</span>
					<span className={styles.answer}>Answer</span>
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
};

const RadicalCard: React.FC<CardProps> = ({
	character,
	slug,
	answer,
	materialType,
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
			<span className={styles.titleBoxLong}>
				<span className={styles.meaning + " " + styles.correct}>
					{newSlug.join(", ")}
				</span>
				<span className={styles.answer + " " + answerStyle}>{answer}</span>
			</span>
		</div>
	);
};

export default ResultPanel;
