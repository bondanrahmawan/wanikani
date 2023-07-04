import styles from "./panel.module.css";

type ButtonProps = {
	text: string;
	url: string;
};

const Button: React.FC<ButtonProps> = ({ text, url }) => {
	return (
		<a href={url} className={styles.rectangularButton}>
			{text}
		</a>
	);
};

export default Button;
