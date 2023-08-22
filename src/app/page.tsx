import Link from "next/link";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5">
      <Link
        href="/login"
        className="font-medium border p-2 min-w-[6rem] rounded flex justify-center shadow-md"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="font-medium border p-2 min-w-[6rem] rounded flex justify-center shadow-md"
      >
        Sign Up
      </Link>
    </div>
  );
}
