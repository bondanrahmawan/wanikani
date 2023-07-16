"use client";
import { useEffect, useState } from "react";
import { Kana, Kanji } from "../../model/commonTypes";
import { hiraginoKaku } from "@/asset/fonts";
import Button from "./button";
import styles from "./panel.module.css";

type PanelProps = {
	level: string;
	title?: string;
	showKana?: boolean;
};

const KotobaKanjiPanel: React.FC<PanelProps> = ({ level, title, showKana }) => {
	const [kotobaKanji, setKotobaKanji] = useState<Kanji[]>([]);
	const [kotobaKana, setKotobaKana] = useState<Kana[]>([]);
	title = title || "Kotoba Kanji";
	showKana = showKana || false;

	const components: Array<JSX.Element> = [];

	useEffect(() => {
		const fetchKotoba = async () => {
			try {
				const response = await fetch("/api/level/" + level + "/kotobakanji");
				const data = await response.json();
				setKotobaKanji(data);
				if (showKana) {
					const kanaResponse = await fetch("/api/level/" + level + "/kotobakana");
					const kanaData = await kanaResponse.json();
					setKotobaKana(kanaData);
				}
			} catch (err) {
				console.error("Error fetching kotoba:", err);
			}
		};

		fetchKotoba();
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

	if (showKana) {
		kotobaKana.forEach((k) =>
			components.push(
				<Card
					key={k.id}
					characters={k.data.characters}
					reading={""}
					meaning={k.data.meanings[0].meaning}
					docUrl={k.data.document_url}
				/>
			)
		);
	}

	const finalComponent = (
		<div>
			<div className={styles.headerSection}>
				<h1 className={styles.panelTitle}>{title}</h1>
				<h1>{showKana ? kotobaKanji.length + kotobaKana.length : kotobaKanji.length}</h1>
				<div className={styles.panelButton}>
					<Button text="Practice" url={"/exercise/" + level + "?kotobakanji=true"} />
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

const Card: React.FC<CardProps> = ({ characters, reading, meaning, docUrl }) => {
	return (
		<a href={docUrl} target="_blank" className={styles.cardKotoba}>
			<span className={styles.charactersLong + " " + hiraginoKaku.className}>{characters}</span>
			<span className={styles.titleBoxLong}>
				<span className={styles.titleLong}>{reading}</span>
				<span className={styles.titleLong}>{meaning}</span>
			</span>
		</a>
	);
};

export default KotobaKanjiPanel;
