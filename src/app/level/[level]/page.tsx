import RadicalPanel from "../../../component/RadicalPanel";

export default function Page({ params }: { params: { level: string } }) {
	return (
		<div>
			Level: {params.level}
			<RadicalPanel level={params.level} />
		</div>
	);
}
