import RadicalPanel from "../../../component/RadicalPanel";
import KanjiPanel from "../../../component/KanjiPanel";
import KotobaKanjiPanel from "../../../component/KotobaKanjiPanel";
import KotobaKanaPanel from "../../../component/KotobaKanaPanel";
import styles from "./page.module.css";
import Image from "next/image";
import home from "../../../asset/home-dark.png";

export default function Page({ params }: { params: { level: string } }) {
	return (
		<div>
			<div className={styles.header}>
				<a href="/">
					<Image className={styles.button} src={home} alt=""></Image>
				</a>
				<h1>Level: {params.level}</h1>
			</div>
			<RadicalPanel level={params.level} />
			<KanjiPanel level={params.level} />
			<KotobaKanjiPanel level={params.level} />
			<KotobaKanaPanel level={params.level} />
		</div>
	);
}