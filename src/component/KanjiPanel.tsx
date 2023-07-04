"use client";
import { useEffect, useState } from "react";
import { Kanji } from "../../model/commonTypes";
import Button from "./button";
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
					<h2>Kanji</h2>
				</div>
				<h2>{kanji.length}</h2>
				<div className={styles.panelButton}>
					<Button text="Practice" url={"/exercise/" + level + "?kanji=true"} />
				</div>
			</div>
			<div className={styles.panel}>{components}</div>
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
		<a
			href={docUrl}
			target="_blank"
			className={styles.card + " " + styles.kanji}>
			<div className={styles.characters}>{characters}</div>
			<div className={styles.title}>{reading}</div>
			<div className={styles.title}>
				<div className={styles.titleInner}>{meaning}</div>
			</div>
		</a>
	);
};

export default KanjiPanel;
