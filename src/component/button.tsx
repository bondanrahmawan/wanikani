import React, { ButtonHTMLAttributes } from "react";
import styles from "./panel.module.css";

type ButtonProps = {
	url: string;
};

const Button: React.FC<ButtonProps> = ({ url }) => {
	return (
		<a href={url} className={styles.rectangularButton}>
			Exercise
		</a>
	);
};

export default Button;
