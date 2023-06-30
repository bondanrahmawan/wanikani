import RadicalPanel from "../../../component/RadicalPanel";
import KanjiPanel from "../../../component/KanjiPanel";
import KotobaKanjiPanel from "../../../component/KotobaKanjiPanel";
import KotobaKanaPanel from "../../../component/KotobaKanaPanel";
import styles from "./page.module.css";

export default function Page({ params }: { params: { level: string } }) {
	return (
		<div>
			<h1 className={styles.header}>Level: {params.level}</h1>
			<RadicalPanel level={params.level} />
			<KanjiPanel level={params.level} />
			<KotobaKanjiPanel level={params.level} />
			<KotobaKanaPanel level={params.level} />
		</div>
	);
}
