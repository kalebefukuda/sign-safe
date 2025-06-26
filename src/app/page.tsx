import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome to Sign Safe</CardTitle>
          <CardDescription>Choose an option to get started</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/login">
            <Button className="w-full">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
