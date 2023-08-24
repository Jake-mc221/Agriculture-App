import { Button } from "@/components/common/Button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5">
      <Button component={Link} href="/login">
        Login
      </Button>
      <Button component={Link} href="/signup">
        Sign Up
      </Button>
    </div>
  );
}
