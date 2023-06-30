"use client";
import { useEffect, useState } from "react";
import styles from "./radical.module.css";

type CharacterImage = {
	url: string;
	metadata: {
		color: string;
		dimensions: string;
		style_name: string;
	};
	content_type: string;
};

interface RadicalData {
	level: number;
	slug: string;
	characters: string;
	character_images: Array<CharacterImage>;
}

type Radical = {
	id: number;
	data: RadicalData;
};

interface PanelProps {
	level: string;
}

const MyComponent: React.FC<PanelProps> = ({ level }) => {
	const [users, setUsers] = useState<Radical[]>([]);

	const components: Array<JSX.Element> = [];

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/api/level/" + level + "/radical"
				);
				const data = await response.json();
				console.log(data);
				setUsers(data);
				console.log(users);
			} catch (err) {
				console.error("Error fetching users:", err);
			}
		};

		fetchUsers();
	}, []);

	users.forEach((el) =>
		components.push(
			<RectangularCard
				id={el.id}
				key={el.id}
				slug={el.data.slug}
				character_images={el.data.character_images}
			/>
		)
	);

	return <div className={styles.panel}>{components}</div>;
};

interface CardProps {
	id: number;
	slug: string;
	character_images: Array<CharacterImage>;
}

const RectangularCard: React.FC<CardProps> = ({
	id,
	slug,
	character_images,
}) => {
	return (
		<div className={styles.card}>
			<img
				src={character_images.length > 0 ? character_images[0].url : ""}
				alt="Description of the image"
				style={{
					width: "100px",
					height: "100px",
					padding: "10px",
					backgroundColor: "#FF00FF",
				}}
			/>
			<a href={"" + id} className={styles.title}>
				{slug}
			</a>
		</div>
	);
};

export default MyComponent;
