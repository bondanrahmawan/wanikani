"use client";
import { useEffect, useState } from "react";
import { Radical } from "../../model/commonTypes";
import { hiraginoKaku } from "@/asset/fonts";
import Button from "./button";
import styles from "./panel.module.css";

type PanelProps = {
	level: string;
	title?: string;
};

const RadicalPanel: React.FC<PanelProps> = ({ level, title }) => {
	const [radicals, setRadicals] = useState<Radical[]>([]);
	title = title || "Radical";

	const components: Array<JSX.Element> = [];

	useEffect(() => {
		const fetchRadical = async () => {
			try {
				const response = await fetch("/api/level/" + level + "/radical");
				const data = await response.json();
				setRadicals(data);
			} catch (err) {
				console.error("Error fetching radicals:", err);
			}
		};

		fetchRadical();
	}, []);

	radicals.forEach((radical) => {
		if (radical.data.characters != null) {
			components.push(
				<Card
					key={radical.id}
					slug={radical.data.slug}
					characters={radical.data.characters}
					docUrl={radical.data.document_url}
				/>
			);
		}
	});

	const finalComponent = (
		<div>
			<div className={styles.headerSection}>
				<h1 className={styles.panelTitle}>{title}</h1>
				<h1>{radicals.length}</h1>
				<div className={styles.panelButton}>
					<Button text="Practice" url={"/exercise/" + level + "?radical=true"} />
				</div>
			</div>
			<div className={styles.panel}>{components}</div>
		</div>
	);

	return finalComponent;
};

type CardProps = {
	slug: string;
	characters: string;
	docUrl: string;
};

const Card: React.FC<CardProps> = ({ slug, characters, docUrl }) => {
	return (
		<a href={docUrl} target="_blank" className={styles.card + " " + styles.radical}>
			<div className={styles.characters + " " + hiraginoKaku.className}>{characters}</div>
			<div className={styles.meaningKanji}>
				<div className={styles.meaningKanjiInner}>{slug}</div>
			</div>
		</a>
	);
};

export default RadicalPanel;
