"use client";
import { useEffect, useState } from "react";
import { Radical, CharacterImage } from "../../model/commonTypes";
import styles from "./panel.module.css";

type PanelProps = {
	level: string;
};

const RadicalPanel: React.FC<PanelProps> = ({ level }) => {
	const [radicals, setRadicals] = useState<Radical[]>([]);

	const components: Array<JSX.Element> = [];

	useEffect(() => {
		const fetchUsers = async () => {
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

		fetchUsers();
	}, []);

	radicals.forEach((radical) => {
		if (radical.data.characters != null) {
			components.push(
				<Card
					id={radical.id}
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
			<h2 className={styles.headerSection}>Radical</h2>
			<div className={styles.panel}>{components}</div>
		</div>
	);

	return finalComponent;
};

type CardProps = {
	id: number;
	slug: string;
	characters: string;
	docUrl: string;
};

const Card: React.FC<CardProps> = ({ id, slug, characters, docUrl }) => {
	return (
		<a href={docUrl} target="_blank" className={styles.card}>
			<div className={styles.characters}>{characters}</div>
			<div className={styles.title}>
				<div className={styles.titleInner}>{slug}</div>
			</div>
		</a>
	);
};

export default RadicalPanel;
