import Link from "next/link";
import React from "react";

interface InfoCardProps {
  message: string;
  icon?: React.ReactNode;
  className?: string;
  link: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  message,
  icon,
  className,
  link,
  onClick,
}) => {
  return (
    <Link
      onClick={(e) => onClick && onClick(e)}
      href={link}
      className={`w-full lg:max-w-[calc(50%-10px)] flex items-center p-4 text-sm text-gray-800 rounded-lg bg-white w-full border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 mt-4 ${className}`}
      role="InfoCard"
    >
      {icon ? (
        icon
      ) : (
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
      )}
      <span className="sr-only">Info</span>
      <div>{message}</div>
    </Link>
  );
};

export default InfoCard;
