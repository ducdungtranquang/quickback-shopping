import { HTMLAttributes, MouseEventHandler } from "react";

interface IBasicButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  text?: string;
  variant?: "basic" | "success" | "warning" | "error" | "plain" | "disabled";
  type?: "button" | "reset" | "submit" | undefined;
  name?: string;
  id?: string;
  styles?: HTMLAttributes<HTMLButtonElement>;
  disabled?: boolean;
}

const BasicButton = (props: IBasicButtonProps) => {
  const getButtonClassNames = (variant: IBasicButtonProps["variant"]) => {
    switch (variant) {
      case "success":
        return "text-white bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
      case "warning":
        return "text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800";
      case "error":
        return "text-white bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";
      case "plain":
        return "text-black-600 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-black-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700";
      case "disabled":
        return "text-white bg-gray-300 border border-gray-300";
      case "basic":
        return "text-white bg-gray-800 border border-gray-300 hover:bg-black focus:ring-gray-300 dark:bg-gray-600 dark:text-black-400 dark:border-gray-800 dark:hover:bg-gray-800 dark:focus:ring-gray-700";
      default:
        return "text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800";
    }
  };

  return (
    <button
      disabled={props.disabled}
      style={props.styles}
      id={props.id}
      onClick={props.onClick}
      type={props.type}
      className={`w-full flex items-center justify-center font-medium rounded-lg text-sm px-5 py-2.5 text-center ${getButtonClassNames(
        props.variant
      )}`}
    >
      {props.text}
    </button>
  );
};

export default BasicButton;
