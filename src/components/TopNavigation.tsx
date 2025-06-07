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
    { name: "Board", icon: BarChart3 },
    { name: "Table", icon: Table },
    { name: "Preview", icon: Eye },
    { name: "Feed", icon: Rss },
    { name: "Analytics", icon: TrendingUp },
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
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 grid grid-cols-2 gap-0.5">
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Beyond UI
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button
                onClick={handleAddContent}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Content</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                className={`flex items-center space-x-2 px-3 py-3 border-b-2 transition-colors ${
                  activeTab === tab.name
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="px-6 py-3 border-t border-gray-100">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
            <div className="w-4 h-4 border border-gray-300 rounded"></div>
            <span className="text-sm">Filters</span>
          </button>
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
