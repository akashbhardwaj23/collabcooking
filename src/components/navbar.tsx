import { Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  return (
    <nav className="bg-transparent p-4 max-w-6xl mx-auto ">
      <div
        className={`flex items-center ${
          pathname === "/home" ? "justify-between" : "justify-start gap-4"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center">
            <Image
              src={"/images/naruto-avatar.png"}
              width={400}
              height={400}
              alt="naruto"
              className="object-cover h-full w-full"
            />
          </div>
          {!(pathname === "/home") && (
            <div className="relative">
              <h2 className="text-xl font-bold text-[#FC8801]">
                {pathname === "/generator" ? "Recipe Generator" : 
                    pathname === "/favourites" ? "Favourites" : "My recipes"
                }
              </h2>
            </div>
          )}
        </div>

        {pathname === "/home" && (
          <div className="hidden md:flex-1 max-w-4xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 border-none bg-white rounded-md"
              />
            </div>
          </div>
        )}

        {pathname === "/home" && (
          <div className="flex items-center cursor-pointer">
            <Link href="/create-recipe">
              <Button className="bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-orange-600 h-9 px-1">
                <Plus className="h-4 w-4" />
                Create Recipe
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
