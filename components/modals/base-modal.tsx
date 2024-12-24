import { HTMLAttributes, useEffect, useRef } from "react";
import { ReactNode } from "react";
import BasicButton from "../button/basic-button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm: () => void;
}

const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      className="fixed top-0 left-0 z-[999999] flex justify-center items-center w-full h-full overflow-hidden bg-black bg-opacity-50"
    >
      <div ref={modalRef} className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">{children}</div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <BasicButton
              styles={
                {
                  width: "150px",
                  marginRight: "10px",
                } as HTMLAttributes<HTMLButtonElement>
              }
              text="Xác nhận"
              onClick={onConfirm}
            />
            <BasicButton
              styles={{ width: "150px" } as HTMLAttributes<HTMLButtonElement>}
              text="Đóng"
              variant="basic"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
