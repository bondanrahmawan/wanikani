import { RadicalExercise } from "../../../../model/commonTypes";
import styles from "./page.module.css";

type ResultPanelProps = {
	answersRadical: Array<RadicalExercise>;
};

const ResultPanel: React.FC<ResultPanelProps> = ({ answersRadical }) => {
	const components: Array<JSX.Element> = [];

	answersRadical.sort((a, b) => a.id - b.id);

	answersRadical.forEach((k) =>
		components.push(
			<RadicalCard
				key={k.id}
				character={k.data.characters}
				slug={k.data.slug}
				answer={k.data.answer}
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
	slug: string;
	answer: string;
};

const RadicalCard: React.FC<CardProps> = ({ character, slug, answer }) => {
	const answerStyle = slug === answer ? styles.correct : styles.incorrect;

	return (
		<div className={styles.cardKotoba}>
			<span className={styles.charactersLong}>{character}</span>
			<span className={styles.titleBoxLong}>
				<span className={styles.meaning + " " + styles.correct}>{slug}</span>
				<span className={styles.answer + " " + answerStyle}>{answer}</span>
			</span>
		</div>
	);
};

export default ResultPanel;
