"use client";
import { useEffect, useState } from "react";
import { Kanji } from "../../model/commonTypes";
import styles from "./panel.module.css";

type PanelProps = {
	level: string;
};

const KotobaKanjiPanel: React.FC<PanelProps> = ({ level }) => {
	const [kotobaKanji, setKotobaKanji] = useState<Kanji[]>([]);

	const components: Array<JSX.Element> = [];

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/api/level/" + level + "/kotobaKanji"
				);
				const data = await response.json();
				setKotobaKanji(data);
			} catch (err) {
				console.error("Error fetching users:", err);
			}
		};

		fetchUsers();
	}, []);

	kotobaKanji.forEach((k) =>
		components.push(
			<Card
				id={k.id}
				key={k.id}
				characters={k.data.characters}
				reading={k.data.readings[0].reading}
				meaning={k.data.meanings[0].meaning}
			/>
		)
	);

	const finalComponent = (
		<div>
			<h2 className={styles.headerSection}>Kotoba Kanji</h2>
			<div className={styles.panelLong}>{components}</div>
		</div>
	);

	return finalComponent;
};

type CardProps = {
	id: number;
	characters: string;
	reading: string;
	meaning: string;
};

const Card: React.FC<CardProps> = ({ id, characters, reading, meaning }) => {
	return (
		<a href={"" + id} className={styles.cardKotoba}>
			<span className={styles.charactersLong}>{characters}</span>
			<span className={styles.titleBoxLong}>
				<span className={styles.titleLong}>{reading}</span>
				<span className={styles.titleLong}>{meaning}</span>
			</span>
		</a>
	);
};

export default KotobaKanjiPanel;
