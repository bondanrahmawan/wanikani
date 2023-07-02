"use client";
import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { RadicalExercise } from "../../../../model/commonTypes";
import Image from "next/image";
import styles from "./page.module.css";
import home from "../../../asset/home-dark.png";
import left from "../../../asset/left.png";
import right from "../../../asset/right.png";
import up from "../../../asset/up.png";

export default function Page({ params }: { params: { level: string } }) {
	const [radicals, setRadicals] = useState<RadicalExercise[]>([]);

	useEffect(() => {
		const fetchRadical = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/api/level/" + params.level + "/radical"
				);
				const data: RadicalExercise[] = await response.json();
				setRadicals(
					data.filter(
						(radical) =>
							radical.data.characters != null &&
							radical.data.characters != undefined &&
							radical.data.characters.trim() != ""
					)
				);
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
		console.log(answers);
		console.log(answers.length);
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

type PanelProps = {
	answersRadical: Array<RadicalExercise>;
};

const ResultPanel: React.FC<PanelProps> = ({ answersRadical }) => {
	const components: Array<JSX.Element> = [];

	answersRadical.sort((a, b) => a.id - b.id);

	answersRadical.forEach((k) =>
		components.push(
			<RadicalCard
				key={k.id}
				character={k.data.characters}
				slug={k.data.slug}
				answer={k.data.answer}
			/>
		)
	);

	const finalComponent = (
		<div className={styles.result}>
			<h2 className={styles.headerSection}>Exercise Result</h2>
			<div className={styles.cardKotoba + " " + styles.header}>
				<span className={styles.charactersLong}>Character</span>
				<span className={styles.titleBoxLong}>
					<span className={styles.meaning}>Meaning</span>
					<span className={styles.answer}>Answer</span>
				</span>
			</div>
			<div className={styles.panelLong}>{components}</div>
		</div>
	);

	return finalComponent;
};

type CardProps = {
	character: string;
	slug: string;
	answer: string;
};

const RadicalCard: React.FC<CardProps> = ({ character, slug, answer }) => {
	const answerStyle = slug === answer ? styles.correct : styles.incorrect;

	return (
		<div className={styles.cardKotoba}>
			<span className={styles.charactersLong}>{character}</span>
			<span className={styles.titleBoxLong}>
				<span className={styles.meaning + " " + styles.correct}>{slug}</span>
				<span className={styles.answer + " " + answerStyle}>{answer}</span>
			</span>
		</div>
	);
};
