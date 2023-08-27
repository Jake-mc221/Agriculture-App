import { Button } from "@/components/common/Button";
import NavigationBar from "@/components/core/NavigationBar";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Button
          component={Link}
          href="/profile" //{link到search page，并且改一下按钮的位置，Amber和Jermey}
          type="submit"
          className="mt-16"
        >
          Search
        </Button>
      <div>
        <footer>
          <NavigationBar></NavigationBar>
        </footer>
      </div>
    </div>
  );
}