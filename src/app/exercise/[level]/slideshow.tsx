import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { ExerciseModel } from "../../../../model/commonTypes";
import { toKana, toRomaji } from "wanakana";
import ResultPanel from "./resultpanel";
import { zenkakuGothicAntique } from "@/asset/fonts";
import styles from "./page.module.css";
import home from "../../../asset/home-dark.png";
import left from "../../../asset/left.png";
import right from "../../../asset/right.png";
import up from "../../../asset/up.png";

type SlideshowProps = {
	slides: Array<ExerciseModel>;
	level: string;
};

const Slideshow: React.FC<SlideshowProps> = ({ slides, level }) => {
	const size = slides.length;
	const [currentSlide, setCurrentSlide] = useState(0);
	const [answered, setAnswered] = useState(0);
	const [inputValue, setInputValue] = useState<string>("");
	const [isInvalid, setIsInvalid] = useState(false);
	const [isFinished, setIsFinished] = useState(false);

	const goToNextSlide = () => {
		setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
	};

	const goToPreviousSlide = () => {
		setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsInvalid(false);
		if (slides[currentSlide].questionType === "reading") {
			const tempLatinText = toRomaji(event.target.value, {
				upcaseKatakana: true,
			});
			setInputValue(toKana(tempLatinText));
		} else {
			setInputValue(event.target.value);
		}
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			if (isValidString(inputValue)) {
				slides[currentSlide].data.answer = inputValue;
				setInputValue("");
				goToNextSlide();
				setAnswered(answered + 1);
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
		if (answered >= size) {
			setIsFinished(true);
		}
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
			{isFinished ? (
				<ResultPanel answers={slides} />
			) : (
				<div className={styles.page}>
					<div
						className={
							slides[currentSlide].materialType === "radical"
								? styles.slide + " " + styles.radical
								: slides[currentSlide].materialType === "kanji"
								? styles.slide + " " + styles.kanji
								: styles.slide + " " + styles.kotoba
						}>
						<div className={styles.left}>
							<button onClick={goToPreviousSlide}>
								<Image src={left} alt=""></Image>
							</button>
						</div>
						<div className={styles.card}>
							<div className={styles.slideInformation}>
								<div>Page: {currentSlide + 1 + "/" + size}</div>
								<div>Answered: {answered + "/" + size}</div>
							</div>
							<div
								className={
									styles.characters + " " + zenkakuGothicAntique.className
								}>
								{slides[currentSlide].data.characters}
							</div>
						</div>
						<div className={styles.right}>
							<button onClick={goToNextSlide}>
								<Image src={right} alt=""></Image>
							</button>
						</div>
					</div>
					<div
						className={
							slides[currentSlide].questionType === "meaning"
								? styles.questionType + " " + styles.meaning
								: styles.questionType + " " + styles.reading
						}>
						{slides[currentSlide].questionType}
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
					<div className={styles.finishBar}>
						<button
							className={styles.finishButton}
							onClick={() => {
								setIsFinished(true);
							}}>
							Finish
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Slideshow;
