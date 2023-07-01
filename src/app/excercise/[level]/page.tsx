"use client";
import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { RadicalExcercise } from "../../../../model/commonTypes";
import Image from "next/image";
import styles from "./page.module.css";
import left from "../../../asset/left.png";
import right from "../../../asset/right.png";

export default function Page({ params }: { params: { level: string } }) {
	const [radicals, setRadicals] = useState<RadicalExcercise[]>([]);

	useEffect(() => {
		const fetchRadical = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/api/level/" + params.level + "/radical"
				);
				const data = await response.json();
				setRadicals(data);
			} catch (err) {
				console.error("Error fetching users:", err);
			}
		};

		fetchRadical();
	}, []);

	return (
		<div className="app">
			{radicals.length > 0 ? <Slideshow slides={radicals} /> : <div />}
		</div>
	);
}

type SlideProps = {
	slides: Array<RadicalExcercise>;
};

const Slideshow: React.FC<SlideProps> = ({ slides }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [inputValue, setInputValue] = useState("");

	const goToNextSlide = () => {
		setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
	};

	const goToPreviousSlide = () => {
		setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
	};

	const checkMeaning = (answer: string) => {
		if (answer === slides[currentSlide].data.slug) {
			const id = slides[currentSlide].id;
			slides = slides.filter((radical) => radical.id !== id);
			console.log("correct");
		} else {
			console.log("incorrect");
		}
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setInputValue(newValue);
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			console.log(slides);
			checkMeaning(inputValue);
			setInputValue("");
			goToNextSlide();
			console.log(slides);
		}
	};

	return (
		<div className={styles.page}>
			<div className={styles.left}>
				<button onClick={goToPreviousSlide} className={styles.button}>
					<Image src={left} alt=""></Image>
				</button>
			</div>
			<div className={styles.slide}>
				<div className={styles.card}>
					<div className={styles.characters}>
						{slides[currentSlide].data.characters}
					</div>
				</div>
				<input
					className={styles.input}
					type="text"
					value={inputValue}
					onInput={handleInputChange}
					onKeyDown={handleKeyPress}
				/>
			</div>
			<div className={styles.right}>
				<button onClick={goToNextSlide} className={styles.button}>
					<Image src={right} alt=""></Image>
				</button>
			</div>
		</div>
	);
};
