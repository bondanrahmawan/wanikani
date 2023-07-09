import KanjiPanel from "../../../component/KanjiPanel";
import Button from "@/component/button";
import styles from "./page.module.css";
import Image from "next/image";
import home from "../../../asset/home-dark.png";

export default function Page({ params }: { params: { grade: string } }) {
	const gradeInt = parseInt(params.grade, 10);
	const gradeLowerLimit = gradeInt * 5 - 4;
	const gradeUpperLimit = gradeInt * 5;

	const components = [];

	for (let i = gradeLowerLimit; i <= gradeUpperLimit; i++) {
		components.push(<KanjiPanel level={i.toString()} title={"Level " + i} />);
	}

	return (
		<div>
			<div className={styles.header}>
				<a href="/">
					<Image className={styles.button} src={home} alt=""></Image>
				</a>
				<span>Grade: {params.grade}</span>
				<Button
					text="Practice All"
					url={"/exercise/" + params.grade + "?radical=true&kanji=true&kotoba=true"}
				/>
			</div>
			{components}
		</div>
	);
}
