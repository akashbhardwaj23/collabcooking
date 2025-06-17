import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Heart } from "lucide-react";

export function MyRecipeCard({
    src,
    alt,
    likes,
    cuisine,
    title,
  }: {
    src: string;
    alt?: string
    likes: string | number;
    cuisine: string;
    title: string;
  }) {
    return (
      <div className="relative">
        <Card className="bg-transparent max-w-xl mx-auto h-72 md:h-[40rem] p-0 rounded-xl shadow-none transition-shadow">
          <Link href="/recipe/1" className="flex flex-col justify-between h-full">
            <div className="flex justify-between gap-2 p-4">
              <div className="">
                <span className="text-black text-sm font-medium">{cuisine}</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <Heart className="h-4 w-4 text-gray-400" />
                <span>{likes}</span>
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
            </CardContent>
          </Link>
        </Card>
        <img
          src={src}
          alt={alt ?? "Mac & Cheese Fusion Bowls"}
          className="md:w-[40rem] md:h-[40rem] h-60 absolute top-[54%] left-1/2 transform -translate-1/2"
        />
      </div>
    );
  }
  