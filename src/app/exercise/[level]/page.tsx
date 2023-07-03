"use client";
import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ExerciseModel, Radical, Kanji } from "../../../../model/commonTypes";
import ResultPanel from "./result";
import Image from "next/image";
import { zenkakuGothicAntique } from "@/asset/fonts";
import styles from "./page.module.css";
import home from "../../../asset/home-dark.png";
import left from "../../../asset/left.png";
import right from "../../../asset/right.png";
import up from "../../../asset/up.png";

export default function Page({ params }: { params: { level: string } }) {
	const searchParams = useSearchParams();

	const [materials, setMaterials] = useState<ExerciseModel[]>([]);

	function convertRadical(radicals: Array<Radical>): Array<ExerciseModel> {
		return radicals.map((radical) => {
			return {
				id: radical.id,
				materialType: "radical",
				questionType: "meaning",
				data: {
					characters: radical.data.characters,
					question: [radical.data.slug],
					answer: "",
				},
			};
		});
	}

	function convertKanji(kanjis: Array<Kanji>): Array<Array<ExerciseModel>> {
		return kanjis.map((kanji) => {
			const meaning: ExerciseModel = {
				id: kanji.id,
				materialType: "kanji",
				questionType: "meaning",
				data: {
					characters: kanji.data.characters,
					question: kanji.data.meanings
						.filter((meaning) => meaning.accepted_answer)
						.map((meaning) => {
							return meaning.meaning;
						}),
					answer: "",
				},
			};

			const reading: ExerciseModel = {
				id: kanji.id,
				materialType: "kanji",
				questionType: "reading",
				data: {
					characters: kanji.data.characters,
					question: kanji.data.readings
						.filter((reading) => reading.accepted_answer)
						.map((reading) => {
							return reading.reading;
						}),
					answer: "",
				},
			};

			return [reading, meaning];
		});
	}

	async function fetchAndMapRadicalData(): Promise<Array<ExerciseModel>> {
		const response = await fetch(
			"http://localhost:3000/api/level/" + params.level + "/radical"
		);
		const data: Radical[] = await response.json();
		const tempRadical = data.filter(
			(radical) =>
				radical.data.characters != null &&
				radical.data.characters != undefined &&
				radical.data.characters.trim() != ""
		);

		return convertRadical(tempRadical);
	}

	async function fetchAndMapKanjiData(): Promise<Array<ExerciseModel>> {
		const response = await fetch(
			"http://localhost:3000/api/level/" + params.level + "/kanji"
		);
		const data: Kanji[] = await response.json();

		return convertKanji(data).flat();
	}

	useEffect(() => {
		const fetchRadical = async () => {
			try {
				var tempMaterials: Array<ExerciseModel> = [];
				if (searchParams.get("radical")) {
					tempMaterials = tempMaterials.concat(await fetchAndMapRadicalData());
				}

				if (searchParams.get("kanji")) {
					tempMaterials = tempMaterials.concat(await fetchAndMapKanjiData());
				}

				setMaterials(tempMaterials);
			} catch (err) {
				console.error("Error fetching users:", err);
			}
		};

		fetchRadical();
	}, []);

	return (
		<div className="app">
			{materials.length > 0 ? (
				<Slideshow slides={materials} level={params.level} />
			) : (
				<div />
			)}
		</div>
	);
}

type SlideProps = {
	slides: Array<ExerciseModel>;
	level: string;
};

const Slideshow: React.FC<SlideProps> = ({ slides, level }) => {
	const size = slides.length;
	const [answers, setAnswers] = useState<ExerciseModel[]>([]);
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
				<ResultPanel answers={answers} />
			) : (
				<div className={styles.page}>
					<div
						className={
							slides[currentSlide].materialType === "radical"
								? styles.slide + " " + styles.radical
								: styles.slide + " " + styles.kanji
						}>
						<div className={styles.left}>
							<button onClick={goToPreviousSlide}>
								<Image src={left} alt=""></Image>
							</button>
						</div>
						<div className={styles.card}>
							<div className={styles.score}>{answers.length + "/" + size}</div>
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
				</div>
			)}
		</div>
	);
};
