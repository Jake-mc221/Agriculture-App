import { ClickerButton } from "@/components/ClickerButton";
import { MdRefresh } from "react-icons/md";

export default function Home() {
  return (
    <main className="w-full h-screen flex items-center justify-center bg-white">
      <div className="border h-40 w-40 text-black flex justify-center items-center">
        Test App
      </div>
      <a href="capture">Capture Page</a>
    </main>
  );
}
