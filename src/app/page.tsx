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
								setRadicalClicked(false);
								setKanjiClicked(false);
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
								setLevelClicked(false);
								setKanjiClicked(false);
							}}>
							Radical
						</button>
						<div
							className={
								radicalClicked
									? styles.sitemap_levels + " " + styles.clicked
									: styles.sitemap_levels
							}>
							<LevelCardComponent type="radical" gradeRange={[1, 2]} />
							<LevelCardComponent type="radical" gradeRange={[3, 4]} />
							<LevelCardComponent type="radical" gradeRange={[5, 6]} />
							<LevelCardComponent type="radical" gradeRange={[7, 8]} />
							<LevelCardComponent type="radical" gradeRange={[9, 10]} />
							<LevelCardComponent type="radical" gradeRange={[11, 12]} />
						</div>
					</div>
					<div className={styles.sitemap_option}>
						<button
							className={styles.button}
							onClick={() => {
								setKanjiClicked(!kanjiClicked);
								setLevelClicked(false);
								setRadicalClicked(false);
							}}>
							Kanji
						</button>
						<div
							className={
								kanjiClicked ? styles.sitemap_levels + " " + styles.clicked : styles.sitemap_levels
							}>
							<LevelCardComponent type="kanji" gradeRange={[1, 2]} />
							<LevelCardComponent type="kanji" gradeRange={[3, 4]} />
							<LevelCardComponent type="kanji" gradeRange={[5, 6]} />
							<LevelCardComponent type="kanji" gradeRange={[7, 8]} />
							<LevelCardComponent type="kanji" gradeRange={[9, 10]} />
							<LevelCardComponent type="kanji" gradeRange={[11, 12]} />
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
