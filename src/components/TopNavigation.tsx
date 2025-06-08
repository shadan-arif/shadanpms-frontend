import {
  Calendar,
  BarChart3,
  Table,
  Eye,
  Rss,
  TrendingUp,
  Settings,
  Share,
  Plus,
  Clipboard,
  Newspaper,
  ChartColumn,
} from "lucide-react";
import { useState } from "react";
import ContentModal from "./ContentModal";
import { Post } from "@/types/post";

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TopNavigation = ({ activeTab, onTabChange }: TopNavigationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { name: "Calendar", icon: Calendar },
    { name: "Board", icon: Clipboard },
    { name: "Table", icon: Table },
    { name: "Preview", icon: Eye },
    { name: "Feed", icon: Newspaper },
    { name: "Analytics", icon: ChartColumn },
  ];

  const handleAddContent = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: Partial<Post>) => {
    console.log("Form submitted from top nav:", formData);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTabClick = (tab) => {
    console.log("Tab clicked:", tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 w-full flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="grid grid-cols-2 gap-0.5 w-6 h-6 flex-shrink-0">
                <div className="bg-gray-400 rounded-sm"></div>
                <div className="bg-gray-400 rounded-sm"></div>
                <div className="bg-gray-400 rounded-sm"></div>
                <div className="bg-gray-400 rounded-sm"></div>
              </div>
              <h1 className="text-xl font-bold text-gray-900 truncate">
                Beyond UI
              </h1>
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">
                <Share className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={handleAddContent}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Content</span>
              </button>
            </div>
          </div>

          <div className="flex space-x-6 mt-4 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                className={`flex items-center space-x-2 px-3 py-2 border-b-2 transition-colors whitespace-nowrap hover:scale-105 ${
                  activeTab === tab.name
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ContentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

export default TopNavigation;
