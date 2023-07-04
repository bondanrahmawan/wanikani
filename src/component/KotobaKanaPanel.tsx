"use client";
import { useEffect, useState } from "react";
import { Kana } from "../../model/commonTypes";
import Button from "./button";
import styles from "./panel.module.css";

type PanelProps = {
	level: string;
};

const KotobaKanaPanel: React.FC<PanelProps> = ({ level }) => {
	const [kotobaKana, setKotobaKana] = useState<Kana[]>([]);

	const components: Array<JSX.Element> = [];

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch("/api/level/" + level + "/kotobakana");
				const data = await response.json();
				setKotobaKana(data);
			} catch (err) {
				console.error("Error fetching users:", err);
			}
		};

		fetchUsers();
	}, []);

	kotobaKana.forEach((k) =>
		components.push(
			<Card
				key={k.id}
				characters={k.data.characters}
				meaning={k.data.meanings[0].meaning}
				docUrl={k.data.document_url}
			/>
		)
	);

	const finalComponent = (
		<div>
			<div className={styles.headerSection}>
				<div className={styles.panelTitle}>
					<h2>Kotoba Kana</h2>
				</div>
				<h2>{kotobaKana.length}</h2>
				<div className={styles.panelButton}>
					<Button
						text="Practice"
						url={"/exercise/" + level + "?kotobakana=true"}
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
	meaning: string;
	docUrl: string;
};

const Card: React.FC<CardProps> = ({ characters, meaning, docUrl }) => {
	return (
		<a href={docUrl} target="_blank" className={styles.cardKotoba}>
			<span className={styles.charactersLong}>{characters}</span>
			<span className={styles.titleBoxLong}>
				<span className={styles.titleLong}>{meaning}</span>
			</span>
		</a>
	);
};

export default KotobaKanaPanel;
