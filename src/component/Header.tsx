"use client";
import { useState } from "react";
import LevelCardComponent from "@/app/card";
import Button from "@/component/button";
import styles from "./panel.module.css";
import Image from "next/image";
import home from "@/asset/home-dark.png";

type HeaderProps = {
	grade: string;
	type: string;
};

const Header: React.FC<HeaderProps> = ({ grade, type }) => {
	const [gradeClicked, setGradeClicked] = useState<boolean>(false);

	return (
		<div className={styles.header}>
			<a className={styles.icon} href="/">
				<Image src={home} alt=""></Image>
			</a>
			<div className={styles.buttonEnclosing}>
				<button
					className={styles.button}
					onClick={() => {
						setGradeClicked(!gradeClicked);
					}}>
					Grade: {grade}
				</button>
				<div
					className={
						gradeClicked ? styles.sitemap_levels + " " + styles.clicked : styles.sitemap_levels
					}>
					<LevelCardComponent type={type} gradeRange={[1, 2]} />
					<LevelCardComponent type={type} gradeRange={[3, 4]} />
					<LevelCardComponent type={type} gradeRange={[5, 6]} />
					<LevelCardComponent type={type} gradeRange={[7, 8]} />
					<LevelCardComponent type={type} gradeRange={[9, 10]} />
					<LevelCardComponent type={type} gradeRange={[11, 12]} />
				</div>
			</div>
			<Button
				text="Practice All"
				url={"/exercise/" + grade + "?radical=true&kanji=true&kotoba=true"}
			/>
		</div>
	);
};

export default Header;
