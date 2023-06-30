"use client";
import { useEffect, useState } from "react";
import { Kana } from "../../model/commonTypes";
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
				const response = await fetch(
					"http://localhost:3000/api/level/" + level + "/kotobakana"
				);
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
				id={k.id}
				key={k.id}
				characters={k.data.characters}
				meaning={k.data.meanings[0].meaning}
			/>
		)
	);

	const finalComponent = (
		<div>
			<h2 className={styles.headerSection}>Kotoba Kana</h2>
			<div className={styles.panelLong}>{components}</div>
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
		<a href={"" + id} className={styles.cardKotoba}>
			<span className={styles.charactersLong}>{characters}</span>
			<span className={styles.titleBoxLong}>
				<span className={styles.titleLong}>{meaning}</span>
			</span>
		</a>
	);
};

export default KotobaKanaPanel;
