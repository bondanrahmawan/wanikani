"use client";
import { useEffect, useState } from "react";
import { Kanji } from "../../model/commonTypes";
import Button from "./button";
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
					"http://localhost:3000/api/level/" + level + "/kotobakanji"
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
				key={k.id}
				characters={k.data.characters}
				reading={k.data.readings[0].reading}
				meaning={k.data.meanings[0].meaning}
				docUrl={k.data.document_url}
			/>
		)
	);

	const finalComponent = (
		<div>
			<div className={styles.headerSection}>
				<div className={styles.panelTitle}>
					<h2>Kotoba Kanji</h2>
				</div>
				<h2>{kotobaKanji.length}</h2>
				<div className={styles.panelButton}>
					<Button
						text="Practice"
						url={"/exercise/" + level + "?kotobakanji=true"}
					/>
				</div>
			</div>
			<div className={styles.panelLong}>{components}</div>
		</div>
	);

	return finalComponent;
};

type CardProps = {
	characters: string;
	reading: string;
	meaning: string;
	docUrl: string;
};

const Card: React.FC<CardProps> = ({
	characters,
	reading,
	meaning,
	docUrl,
}) => {
	return (
		<a href={docUrl} target="_blank" className={styles.cardKotoba}>
			<span className={styles.charactersLong}>{characters}</span>
			<span className={styles.titleBoxLong}>
				<span className={styles.titleLong}>{reading}</span>
				<span className={styles.titleLong}>{meaning}</span>
			</span>
		</a>
	);
};

export default KotobaKanjiPanel;
