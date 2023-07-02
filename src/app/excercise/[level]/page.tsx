"use client";
import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { RadicalExcercise } from "../../../../model/commonTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
	const router = useRouter();
	const size = slides.length;
	const [answers, setAnswers] = useState<RadicalExcercise[]>([]);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [inputValue, setInputValue] = useState<string>("");

	const goToNextSlide = () => {
		// while (!isValidString(slides[currentSlide].data.answer)) {
		setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
		// }
	};

	const goToPreviousSlide = () => {
		// while (!isValidString(slides[currentSlide].data.answer)) {
		setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
		// }
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setInputValue(newValue);
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			slides[currentSlide].data.answer = inputValue;
			setInputValue("");
			goToNextSlide();
			setAnswers([...answers, slides[currentSlide]]);
		}
	};

	function isValidString(str: string) {
		return str !== null && str !== undefined && str.trim() !== "";
	}

	function hehe() {
		router.push("http://localhost:3000/level/1");
	}

	useEffect(() => {
		isValidString(slides[currentSlide].data.answer)
			? setInputValue(slides[currentSlide].data.answer)
			: setInputValue("");
		if (answers.length === 3) {
			hehe();
		}
	}, [currentSlide]);

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
						{answers.length}
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
