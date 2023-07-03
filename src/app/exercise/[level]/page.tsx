"use client";
import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
	RadicalExercise,
	KanjiExercise,
	ExerciseModel,
	Radical,
} from "../../../../model/commonTypes";
import ResultPanel from "./result";
import Image from "next/image";
import styles from "./page.module.css";
import home from "../../../asset/home-dark.png";
import left from "../../../asset/left.png";
import right from "../../../asset/right.png";
import up from "../../../asset/up.png";

export default function Page({ params }: { params: { level: string } }) {
	const searchParams = useSearchParams();

	const [radicals, setRadicals] = useState<RadicalExercise[]>([]);
	const [kanjis, setKanjis] = useState<KanjiExercise[]>([]);
	const [materials, setMaterials] = useState<ExerciseModel[]>([]);

	useEffect(() => {
		const fetchRadical = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/api/level/" + params.level + "/radical"
				);
				const data: RadicalExercise[] = await response.json();
				const tempRadical = data.filter(
					(radical) =>
						radical.data.characters != null &&
						radical.data.characters != undefined &&
						radical.data.characters.trim() != ""
				);

				setRadicals(tempRadical);
			} catch (err) {
				console.error("Error fetching users:", err);
			}
		};

		fetchRadical();
	}, []);

	return (
		<div className="app">
			{radicals.length > 0 ? (
				<Slideshow slides={radicals} level={params.level} />
			) : (
				<div />
			)}
		</div>
	);
}

type SlideProps = {
	slides: Array<RadicalExercise>;
	level: string;
};

const Slideshow: React.FC<SlideProps> = ({ slides, level }) => {
	const size = slides.length;
	const [answers, setAnswers] = useState<RadicalExercise[]>([]);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [inputValue, setInputValue] = useState<string>("");
	const [isInvalid, setIsInvalid] = useState(false);

	const goToNextSlide = () => {
		setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
	};

	const goToPreviousSlide = () => {
		setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setIsInvalid(false);
		setInputValue(newValue);
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			if (isValidString(inputValue)) {
				slides[currentSlide].data.answer = inputValue;
				setInputValue("");
				goToNextSlide();
				setAnswers([...answers, slides[currentSlide]]);
			} else {
				setIsInvalid(true);
			}
		}
	};

	function isValidString(str: string) {
		return str !== null && str !== undefined && str.trim() !== "";
	}

	useEffect(() => {
		isValidString(slides[currentSlide].data.answer)
			? setInputValue(slides[currentSlide].data.answer)
			: setInputValue("");
	}, [currentSlide]);

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.buttonGroup}>
					<a href="/">
						<Image className={styles.button} src={home} alt=""></Image>
					</a>
					<a href={"/level/" + level}>
						<Image className={styles.button} src={up} alt=""></Image>
					</a>
				</div>
				<h1>Level: {level}</h1>
			</div>
			{answers.length >= size ? (
				<ResultPanel answersRadical={answers} />
			) : (
				<div className={styles.page}>
					<div className={styles.slide}>
						<div className={styles.left}>
							<button onClick={goToPreviousSlide}>
								<Image src={left} alt=""></Image>
							</button>
						</div>
						<div className={styles.card}>
							<div className={styles.score}>{answers.length + "/" + size}</div>
							<div className={styles.characters}>
								{slides[currentSlide].data.characters}
							</div>
						</div>
						<div className={styles.right}>
							<button onClick={goToNextSlide}>
								<Image src={right} alt=""></Image>
							</button>
						</div>
					</div>
					<input
						className={
							isInvalid ? styles.input + " " + styles.invalid : styles.input
						}
						type="text"
						value={inputValue}
						onInput={handleInputChange}
						onKeyDown={handleKeyPress}
						onAnimationEnd={() => setIsInvalid(false)}
					/>
				</div>
			)}
		</div>
	);
};
