"use client";
import { useEffect, useState } from "react";
import { Kanji } from "../../model/commonTypes";
import styles from "./panel.module.css";

type PanelProps = {
	level: string;
};

const KanjiPanel: React.FC<PanelProps> = ({ level }) => {
	const [kanji, setKanji] = useState<Kanji[]>([]);

	const components: Array<JSX.Element> = [];

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/api/level/" + level + "/kanji"
				);
				const data = await response.json();
				setKanji(data);
			} catch (err) {
				console.error("Error fetching users:", err);
			}
		};

		fetchUsers();
	}, []);

	kanji.forEach((k) =>
		components.push(
			<Card
				id={k.id}
				key={k.id}
				characters={k.data.characters}
				meaning={k.data.meanings[0].meaning}
			/>
		)
	);

	const finalComponent = (
		<div>
			<h2 className={styles.headerSection}>Kanji</h2>
			<div className={styles.panel}>{components}</div>
		</div>
	);

	return finalComponent;
};

type CardProps = {
	id: number;
	characters: string;
	meaning: string;
};

const Card: React.FC<CardProps> = ({ id, characters, meaning }) => {
	return (
		<a href={"" + id} className={styles.cardKanji}>
			<span className={styles.characters}>{characters}</span>
			<span className={styles.title}>{meaning}</span>
		</a>
	);
};

export default KanjiPanel;
