import DynamicComponent from "./card";
import styles from "./homepage.module.css";

export default function Pages12() {
	return (
		<div>
			<div className={styles.header}>
				<h1>Select Level</h1>
			</div>
			<DynamicComponent start={1} end={10} />
			<DynamicComponent start={11} end={20} />
			<DynamicComponent start={21} end={30} />
			<DynamicComponent start={31} end={40} />
			<DynamicComponent start={41} end={50} />
			<DynamicComponent start={51} end={60} />
		</div>
	);
}
