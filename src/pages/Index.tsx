import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";
import KanbanBoard from "@/components/KanbanBoard";
import CalendarView from "@/components/CalendarView";
import TableView from "@/components/TableView";
import Inbox from "./Inbox";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Board");
  const [currentPage, setCurrentPage] = useState("board");

  // Handle navigation from sidebar
  const handleSidebarNavigation = (page: string) => {
    console.log("Index: Navigation to page:", page);
    setCurrentPage(page);
    if (page === "board") {
      setActiveTab("Board");
    }
  };

  if (currentPage === "inbox") {
    console.log("Rendering Inbox component");
    return <Inbox onNavigate={handleSidebarNavigation} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNavigate={handleSidebarNavigation}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="p-6">
          {activeTab === "Board" && <KanbanBoard />}
          {activeTab === "Calendar" && <CalendarView />}
          {activeTab === "Table" && <TableView />}
          {activeTab === "Preview" && (
            <div className="text-center py-20 text-gray-500">
              Preview coming soon
            </div>
          )}
          {activeTab === "Feed" && (
            <div className="text-center py-20 text-gray-500">
              Feed coming soon
            </div>
          )}
          {activeTab === "Analytics" && (
            <div className="text-center py-20 text-gray-500">
              Analytics coming soon
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
