"use client";
import { Bell } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface HeaderProps {
  title: string;
  avatarUrl: string;
  notificationCount?: number;
  onToggleSidebar?: () => void;
}

const Header: FC<HeaderProps> = ({ title, avatarUrl, notificationCount = 0, onToggleSidebar }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm p-4 flex items-center justify-between sticky top-0 z-10 rounded-4xl mt-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <Bell className="h-6 w-6" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
        <Image src={avatarUrl} alt="Avatar" width={32} height={32} className="rounded-full" />
      </div>
    </header>
  );
};

export default Header;
