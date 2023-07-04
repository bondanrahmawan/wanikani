"use client";
import { useEffect, useState } from "react";
import { Radical } from "../../model/commonTypes";
import Button from "./button";
import styles from "./panel.module.css";

type PanelProps = {
	level: string;
};

const RadicalPanel: React.FC<PanelProps> = ({ level }) => {
	const [radicals, setRadicals] = useState<Radical[]>([]);

	const components: Array<JSX.Element> = [];

	useEffect(() => {
		const fetchRadical = async () => {
			try {
				const response = await fetch("/api/level/" + level + "/radical");
				const data = await response.json();
				setRadicals(data);
			} catch (err) {
				console.error("Error fetching users:", err);
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
				<div className={styles.panelTitle}>
					<h2>Radical</h2>
				</div>
				<h2>{radicals.length}</h2>
				<div className={styles.panelButton}>
					<Button
						text="Practice"
						url={"/exercise/" + level + "?radical=true"}
					/>
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
		<a
			href={docUrl}
			target="_blank"
			className={styles.card + " " + styles.radical}>
			<div className={styles.characters}>{characters}</div>
			<div className={styles.meaningKanji}>
				<div className={styles.meaningKanjiInner}>{slug}</div>
			</div>
		</a>
	);
};

export default RadicalPanel;
