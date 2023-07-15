import RadicalPanel from "../../../component/RadicalPanel";
import Header from "@/component/Header";

export default function Page({ params }: { params: { grade: string } }) {
	const gradeInt = parseInt(params.grade, 10);
	const gradeLowerLimit = gradeInt * 5 - 4;
	const gradeUpperLimit = gradeInt * 5;

	const components = [];

	for (let i = gradeLowerLimit; i <= gradeUpperLimit; i++) {
		components.push(<RadicalPanel level={i.toString()} title={"Level " + i} />);
	}

	return (
		<div>
			<Header grade={params.grade} type={"radical"} />
			{components}
		</div>
	);
}
