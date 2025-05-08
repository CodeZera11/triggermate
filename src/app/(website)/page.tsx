import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <Button asChild>
        <Link href="/dashboard">
          Dashboard
        </Link>
      </Button>
    </div>
  );
}
