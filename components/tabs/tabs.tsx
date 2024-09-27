import React, { Dispatch, SetStateAction, useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  onTabClick?: (id: string) => void;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>
}

const Tabs: React.FC<TabsProps> = ({ tabs, onTabClick, activeTab, setActiveTab }) => {

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    if (onTabClick) {
      onTabClick(id);
    }
  };

  return (
    <div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          {tabs.map((tab) => (
            <li className="me-2" role="presentation" key={tab.id}>
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === tab.id
                  ? "text-purple-600 border-purple-600 dark:text-purple-500 dark:border-purple-500"
                  : "text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:border-transparent dark:hover:text-gray-300"
                  }`}
                id={`${tab.id}-tab`}
                onClick={() => handleTabClick(tab.id)}
                type="button"
                role="tab"
                aria-controls={tab.id}
                aria-selected={activeTab === tab.id}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={tab.id}
            role="tabpanel"
            aria-labelledby={`${tab.id}-tab`}
            className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === tab.id ? "block" : "hidden"
              }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
