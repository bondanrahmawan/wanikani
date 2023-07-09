"use client";
import { useEffect, useState } from "react";
import { Kanji } from "../../model/commonTypes";
import { hiraginoKaku } from "@/asset/fonts";
import Button from "./button";
import styles from "./panel.module.css";

type PanelProps = {
	level: string;
	title?: string;
};

const KanjiPanel: React.FC<PanelProps> = ({ level, title }) => {
	const [kanji, setKanji] = useState<Kanji[]>([]);
	title = title || "Kanji";

	const components: Array<JSX.Element> = [];

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch("/api/level/" + level + "/kanji");
				const data = await response.json();
				setKanji(data);
			} catch (err) {
				console.error("Error fetching kanjis:", err);
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
				<h1 className={styles.panelTitle}>{title}</h1>
				<h1>{kanji.length}</h1>
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

const Card: React.FC<CardProps> = ({ characters, reading, meaning, docUrl }) => {
	return (
		<a href={docUrl} target="_blank" className={styles.card + " " + styles.kanji}>
			<div className={styles.characters + " " + hiraginoKaku.className}>{characters}</div>
			<div className={styles.title}>{reading}</div>
			<div className={styles.title}>
				<div className={styles.titleInner}>{meaning}</div>
			</div>
		</a>
	);
};

export default KanjiPanel;
