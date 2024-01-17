import { FourByFourGridDisplay, Navbar } from "../components";

const Home = () => {
  return (
    <div className="max-w-[1140px] w-full mx-auto py-14 p-4">
      <Navbar />
      <div className="mt-10">
        <div className="flex flex-col items-center justify-center">
          <FourByFourGridDisplay />
        </div>
      </div>
    </div>
  );
};

export default Home;
