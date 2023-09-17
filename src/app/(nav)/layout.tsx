import NavigationBar from "@/components/core/NavigationBar";
import { CapacitorPwaLoader } from "@/components/utility/CapacitorPwaLoader";

export default function NavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="h-full">
          {children}
          <CapacitorPwaLoader />
      </main>
      <footer>
          <NavigationBar />
      </footer>
    </>
  );
}
