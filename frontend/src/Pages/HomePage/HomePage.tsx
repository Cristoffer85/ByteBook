import MainSidebar from "../../Components/MainSidebar/MainSidebar"

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="w-full relative flex h-screen overflow-hidden">
      <MainSidebar />
      <div className="flex-1 p-4 ml-64 overflow-y-auto">
        <h1 className="text-2xl">ByteBook HomePage</h1>
      </div>
    </div>
  )
}

export default HomePage;
