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

	radicals.forEach((radical) =>
		components.push(
			<Card
				id={radical.id}
				key={radical.id}
				slug={radical.data.slug}
				character_images={radical.data.character_images}
			/>
		)
	);

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
	character_images: Array<CharacterImage>;
};

const Card: React.FC<CardProps> = ({ id, slug, character_images }) => {
	return (
		<div className={styles.card}>
			<img
				src={character_images.length > 0 ? character_images[0].url : ""}
				alt="Description of the image"
				style={{
					width: "100px",
					height: "100px",
					padding: "10px",
					backgroundColor: "#00CCFF",
				}}
			/>
			<a href={"" + id} className={styles.title}>
				{slug}
			</a>
		</div>
	);
};

export default RadicalPanel;
