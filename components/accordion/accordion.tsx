import React, { useState } from "react";

type AccordionItem = {
  title: string;
  content: React.ReactNode;
  id: string;
};

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="accordion-open" data-accordion="open">
      {items.map((item, index) => (
        <div key={item.id}>
          <h2 id={`accordion-open-heading-${item.id}`}>
            <button
              type="button"
              className="flex items-center justify-between w-full p-4 my-2 font-medium bg-white text-gray-500 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
              aria-expanded={openIndex === index}
              aria-controls={`accordion-open-body-${item.id}`}
              onClick={() => handleToggle(index)}
            >
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 me-2 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {item.title}
              </span>
              <svg
                data-accordion-icon
                className={`w-[12px] h-[12px] rotate-180 transform shrink-0 ${
                  openIndex === index ? "rotate-0" : ""
                }`}
                fill="none"
                viewBox="0 0 10 6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id={`accordion-open-body-${item.id}`}
            className={`${openIndex === index ? "block" : "hidden"}`}
            aria-labelledby={`accordion-open-heading-${item.id}`}
          >
            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
