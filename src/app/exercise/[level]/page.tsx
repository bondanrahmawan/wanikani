"use client";
import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
	ExerciseModel,
	Radical,
	Kanji,
	Kana,
} from "../../../../model/commonTypes";
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

	function convertKana(kanas: Array<Kana>): Array<ExerciseModel> {
		return kanas.map((kana) => {
			return {
				id: kana.id,
				materialType: "kana",
				questionType: "meaning",
				data: {
					characters: kana.data.characters,
					question: kana.data.meanings
						.filter((meaning) => meaning.accepted_answer)
						.map((meaning) => {
							return meaning.meaning;
						}),
					answer: "",
				},
			};
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

	async function fetchAndMapKotobaKanjiData(): Promise<Array<ExerciseModel>> {
		const response = await fetch(
			"http://localhost:3000/api/level/" + params.level + "/kotobakanji"
		);
		const data: Kanji[] = await response.json();

		return convertKanji(data).flat();
	}

	async function fetchAndMapKotobaKanaData(): Promise<Array<ExerciseModel>> {
		const response = await fetch(
			"http://localhost:3000/api/level/" + params.level + "/kotobakana"
		);
		const data: Kana[] = await response.json();

		return convertKana(data);
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

				if (searchParams.get("kotoba")) {
					tempMaterials = tempMaterials.concat(
						await fetchAndMapKotobaKanjiData()
					);
					tempMaterials = tempMaterials.concat(
						await fetchAndMapKotobaKanaData()
					);
				}

				if (searchParams.get("kotobakanji")) {
					tempMaterials = tempMaterials.concat(
						await fetchAndMapKotobaKanjiData()
					);
				}

				if (searchParams.get("kotobakana")) {
					tempMaterials = tempMaterials.concat(
						await fetchAndMapKotobaKanaData()
					);
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
