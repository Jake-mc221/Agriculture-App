import { CapacitorPwaLoader } from "@/components/utility/CapacitorPwaLoader";

export default function NavlessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="h-full">
          {children}
          <CapacitorPwaLoader />
      </main>
  );
}
