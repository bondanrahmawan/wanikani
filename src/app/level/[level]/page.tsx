import MyComponent from "../../users"

export default function Page({ params }: { params: { level: string } }) {
    return <div>
      My Post: {params.level}
      <MyComponent />
    </div>
  }