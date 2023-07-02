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
				const response = await fetch(
					"http://localhost:3000/api/level/" + level + "/radical"
				);
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
				<h2>Radical</h2>
				<Button url={"/exercise/" + level} />
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
		<a href={docUrl} target="_blank" className={styles.card}>
			<div className={styles.characters}>{characters}</div>
			<div className={styles.meaningKanji}>
				<div className={styles.meaningKanjiInner}>{slug}</div>
			</div>
		</a>
	);
};

export default RadicalPanel;
