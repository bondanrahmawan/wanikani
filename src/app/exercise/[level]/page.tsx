"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
	ExerciseModel,
	Radical,
	Kanji,
	Kana,
} from "../../../../model/commonTypes";
import Slideshow from "./slideshow";

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

	function convertKanji(
		kanjis: Array<Kanji>,
		isKotoba: boolean
	): Array<Array<ExerciseModel>> {
		return kanjis.map((kanji) => {
			const materialType = isKotoba ? "kotoba" : "kanji";

			const meaning: ExerciseModel = {
				id: kanji.id,
				materialType: materialType,
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
				materialType: materialType,
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
				materialType: "kotoba",
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
		const response = await fetch("/api/level/" + params.level + "/radical");
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
		const response = await fetch("/api/level/" + params.level + "/kanji");
		const data: Kanji[] = await response.json();

		return convertKanji(data, false).flat();
	}

	async function fetchAndMapKotobaKanjiData(): Promise<Array<ExerciseModel>> {
		const response = await fetch("/api/level/" + params.level + "/kotobakanji");
		const data: Kanji[] = await response.json();

		return convertKanji(data, true).flat();
	}

	async function fetchAndMapKotobaKanaData(): Promise<Array<ExerciseModel>> {
		const response = await fetch("/api/level/" + params.level + "/kotobakana");
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
