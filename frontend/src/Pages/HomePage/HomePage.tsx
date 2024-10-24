import MainSidebar from "../../Components/MainSidebar/MainSidebar"

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="w-full relative flex h-screen overflow-hidden">
      <MainSidebar />
      <div className="flex-1 p-4 ml-64 overflow-y-auto">  {/* Added ml-64 to create space */}
        <h1 className="text-2xl">Welcome to the HomePage</h1>
        {/* Add more content here */}
      </div>
    </div>
  )
}

export default HomePage;
