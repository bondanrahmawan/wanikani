"use client";

import { useState } from "react";
import LevelCardComponent from "./card";
import styles from "./homepage.module.css";

export default function Homepage() {
	const [levelClicked, setLevelClicked] = useState<boolean>(false);
	const [radicalClicked, setRadicalClicked] = useState<boolean>(false);
	const [kanjiClicked, setKanjiClicked] = useState<boolean>(false);

	return (
		<div>
			<div>
				<h1>Homepage</h1>
				<div className={styles.sitemap}>
					<div className={styles.sitemap_option}>
						<button
							className={styles.button}
							onClick={() => {
								setLevelClicked(!levelClicked);
							}}>
							Level
						</button>
						<div
							className={
								levelClicked
									? styles.sitemap_levels + " " + styles.level + " " + styles.clicked
									: styles.sitemap_levels
							}>
							<LevelCardComponent type="level" start={1} end={10} />
							<LevelCardComponent type="level" start={11} end={20} />
							<LevelCardComponent type="level" start={21} end={30} />
							<LevelCardComponent type="level" start={31} end={40} />
							<LevelCardComponent type="level" start={41} end={50} />
							<LevelCardComponent type="level" start={51} end={60} />
						</div>
					</div>
					<div className={styles.sitemap_option}>
						<button
							className={styles.button}
							onClick={() => {
								setRadicalClicked(!radicalClicked);
							}}>
							Radical
						</button>
						<div
							className={
								radicalClicked
									? styles.sitemap_levels + " " + styles.radical + " " + styles.clicked
									: styles.sitemap_levels
							}>
							<LevelCardComponent type="radical" grade={1} title={"Level 1-10"} />
							<LevelCardComponent type="radical" grade={2} title={"Level 11-20"} />
							<LevelCardComponent type="radical" grade={3} title={"Level 21-30"} />
							<LevelCardComponent type="radical" grade={4} title={"Level 31-40"} />
							<LevelCardComponent type="radical" grade={5} title={"Level 41-50"} />
							<LevelCardComponent type="radical" grade={6} title={"Level 51-60"} />
						</div>
					</div>
					<div className={styles.sitemap_option}>
						<button
							className={styles.button}
							onClick={() => {
								setKanjiClicked(!kanjiClicked);
							}}>
							Kanji
						</button>
						<div
							className={
								kanjiClicked ? styles.sitemap_levels + " " + styles.clicked : styles.sitemap_levels
							}>
							<LevelCardComponent type="kanji" grade={1} title={"Level 1-10"} />
							<LevelCardComponent type="kanji" grade={2} title={"Level 11-20"} />
							<LevelCardComponent type="kanji" grade={3} title={"Level 21-30"} />
							<LevelCardComponent type="kanji" grade={4} title={"Level 31-40"} />
							<LevelCardComponent type="kanji" grade={5} title={"Level 41-50"} />
							<LevelCardComponent type="kanji" grade={6} title={"Level 51-60"} />
						</div>
					</div>
					<div className={styles.sitemap_option}>
						<button className={styles.button}>Kana</button>
					</div>
				</div>
			</div>
		</div>
	);
}
