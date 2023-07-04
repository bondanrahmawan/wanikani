import React from "react";
import styles from "./homepage.module.css";

interface LevelProps {
	start: number;
	end: number;
}

const DynamicComponent: React.FC<LevelProps> = ({ start, end }) => {
	const components = [];

	for (let i = start; i <= end; i++) {
		const name = `${i}`;
		components.push(<RectangularCard key={i} title={name} />);
	}

	return <div className={styles.level}>{components}</div>;
};

interface CardProps {
	title: string;
}

const RectangularCard: React.FC<CardProps> = ({ title }) => {
	return (
		<div className={styles.card}>
			<a href={"/level/" + title} className={styles.title}>
				{title}
			</a>
		</div>
	);
};

export default DynamicComponent;
