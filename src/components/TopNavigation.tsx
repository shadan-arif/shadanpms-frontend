import {
  Calendar,
  LayoutGrid,
  Table,
  Monitor,
  Rss,
  Settings,
  Share,
  Plus,
  Filter,
  ChartNoAxesColumn,
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
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { name: "Calendar", icon: Calendar },
    { name: "Board", icon: LayoutGrid },
    { name: "Table", icon: Table },
    { name: "Preview", icon: Monitor },
    { name: "Feed", icon: Rss },
    { name: "Analytics", icon: ChartNoAxesColumn },
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

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <header className="border-b border-gray-200 bg-white w-full flex-shrink-0">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center">
            <div className="p-1 bg-gray-100 rounded mr-3">
              <div className="grid grid-cols-3 gap-0.5">
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Beyond UI</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-10 px-4 py-2 text-gray-700 hover:text-gray-900">
              Share
            </button>
            <button
              onClick={handleAddContent}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
            >
              Add Content
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`flex items-center px-6 py-3 text-sm font-medium ${
                activeTab === tab.name
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </div>
      </header>

      <div className="px-6 py-3 bg-white border-b border-gray-200">
        <button
          onClick={toggleFilters}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All statuses</option>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All priorities</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned to
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Anyone</option>
                <option>Unassigned</option>
                <option>Me</option>
              </select>
            </div>
          </div>
        )}
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
