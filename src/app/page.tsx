import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="w-full h-screen flex-col flex justify-center bg-white">
      <div className="border h-40 w-full text-black grow-[9] flex justify-center items-center">
        Test App
        
      </div>

      <Navbar></Navbar>
    </main>
  );
}
