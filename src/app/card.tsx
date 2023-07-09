import React from "react";
import Link from "next/link";
import styles from "./homepage.module.css";

interface LevelProps {
	type: string;
	start?: number;
	end?: number;
	gradeRange?: Array<number>;
	title?: string;
}

const LevelCardComponent: React.FC<LevelProps> = ({ type, start, end, gradeRange, title }) => {
	const components = [];

	if (type === "level") {
		if (start !== null && start !== undefined && end !== null && end !== undefined) {
			for (let i = start; i <= end; i++) {
				const name = `${i}`;
				components.push(<SquareCard key={i} grade={0} title={name} />);
			}
		}
	} else {
		if (gradeRange !== null && gradeRange !== undefined) {
			components.push(<RectangularCard key={gradeRange[0]} grade={gradeRange[0]} type={type} />);
			components.push(<RectangularCard key={gradeRange[1]} grade={gradeRange[1]} type={type} />);
		}
	}

	return (
		<div
			className={
				type === "level"
					? styles.level + " " + styles.square
					: styles.level + " " + styles.rectangular
			}>
			{components}
		</div>
	);
};

interface CardProps {
	grade: number;
	title?: string;
	type?: string;
}

const SquareCard: React.FC<CardProps> = ({ title }) => {
	return (
		<div className={styles.card + " " + styles.square}>
			<Link href={"/level/" + title} className={styles.title + " " + styles.square}>
				{title}
			</Link>
		</div>
	);
};

const RectangularCard: React.FC<CardProps> = ({ grade, type }) => {
	const className =
		type === "radical"
			? styles.card + " " + styles.rectangular + " " + styles.radical
			: styles.card + " " + styles.rectangular + " " + styles.kanji;

	return (
		<div className={className}>
			<Link href={"/level/" + grade} className={styles.title + " " + styles.rectangular}>
				<span>Grade {grade}</span>
			</Link>
		</div>
	);
};

export default LevelCardComponent;
