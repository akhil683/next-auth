"use client"
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";

export default function Home() {
  const { setLightTheme, setDarkTheme } = useTheme()

  return (
    <div className="text-7xl text-black bg-white dark:bg-black dark:text-white min-h-screen flex-col min-w-screen flex justify-center items-center ">
      <h1 className="text-7xl dark:text-red-500">Hello World</h1>
      <div className="flex gap-8">

        <Link href={"/login"}>
          <Button>
            Login
          </Button>
        </Link>
        <Link href={"/login"}>
          <Button>
            Login
          </Button>
        </Link>
        <Button onClick={setLightTheme}>
          Light Mode
        </Button>
        <Button onClick={setDarkTheme}>
          Dark Mode
        </Button>
      </div>
    </div>
  );
}
