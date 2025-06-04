import {
    ArrowBigDownDash,
  Cookie,
  Heart,
  House,
  PanelRightClose,
  PanelRightOpen,
  Settings,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const sidebarElements = [
  {
    icon: House,
    path: "/home",
  },
  {
    icon: Cookie,
    path: "/generator",
  },
  {
    icon: Heart,
    path: "/favourites",
  },
  {
    icon: ArrowBigDownDash,
    path: "/my-recipes",
  },
  {
    icon: Settings,
    path: "/profile",
  },
];

export default function Sidebar({ pathname }: { pathname: string }) {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  console.log("pathname ", pathname);
  return (
    <div className="fixed top-28 md:top-1/2 z-50 transform md:-translate-y-1/2 bg-white rounded-r-full p-2 shadow-lg">
      <div className="flex flex-col items-center space-y-30 py-4">
        <div
          style={{
            display: isSidebarClosed ? "none" : "flex",
          }}
          className="flex flex-col items-center space-y-6 py-2"
        >
          <AnimatePresence>
          {sidebarElements.map((element, index) => (
            <motion.div key={index}>
              <Link href={element.path}>
                <div
                  className={`w-10 h-10 relative flex items-center justify-center rounded-full hover:bg-neutral-100`}
                >
                  {
                    <element.icon
                      className={`h-5 w-5 z-20 relative ${
                        pathname === element.path
                          ? "text-white"
                          : "text-neutral-500"
                      }`}
                    />
                  }
                  {pathname === element.path && (
                    <motion.div
                      layoutId="sidebar-effect-background"
                      className="absolute z-10 bg-gradient-to-r from-orange-400 to-orange-600 h-10 w-10 rounded-full"
                    ></motion.div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>

        <motion.div className="flex items-center justify-center">
          {isSidebarClosed ? (
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
              onClick={() => setIsSidebarClosed(false)}
            >
              <PanelRightOpen className="h-5 w-5 text-gray-500 cursor-pointer" />
            </div>
          ) : (
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
              onClick={() => setIsSidebarClosed(true)}
            >
              <PanelRightClose className="h-5 w-5 text-gray-500 cursor-pointer" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
