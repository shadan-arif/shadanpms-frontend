import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";
import KanbanBoard from "@/components/KanbanBoard";
import CalendarView from "@/components/CalendarView";
import TableView from "@/components/TableView";
import Inbox from "./Inbox";
import { Post } from "@/types/post";

// Initial data structure for columns
const initialColumns = [
  {
    id: "idea",
    title: "Idea",
    count: 3,
    posts: [
      {
        id: "post-1",
        title: "Post a Banner",
        description: "Create a marketing banner for the campaign",
        date: "October 25, 2023",
        time: "7:00 AM - 25 July",
        platforms: ["tiktok", "instagram", "facebook"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "John Doe",
        likes: 0,
        notes: "This is a sample note",
      },
      {
        id: "post-2",
        title: "Post a Banner",
        description: "Create a marketing banner for the campaign",
        date: "October 25, 2023",
        time: "7:00 AM - 25 July",
        platforms: ["tiktok", "instagram", "facebook"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "John Doe",
        likes: 0,
        notes: "This is a sample note",
      },
      {
        id: "post-3",
        title: "Post a Banner",
        description: "Create a marketing banner for the campaign",
        date: "October 25, 2023",
        time: "7:00 AM - 25 July",
        platforms: ["tiktok", "instagram", "facebook"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "John Doe",
        likes: 0,
        notes: "This is a sample note",
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    count: 1,
    posts: [
      {
        id: "post-4",
        title: "Post a Banner",
        description: "Create a marketing banner for the campaign",
        date: "October 25, 2023",
        time: "7:00 AM - 25 July",
        platforms: ["tiktok", "instagram", "facebook"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "John Doe",
        likes: 0,
        notes: "This is a sample note",
      },
    ],
  },
  {
    id: "pending",
    title: "Pending",
    count: 0,
    posts: [],
  },
  {
    id: "approved",
    title: "Approved",
    count: 0,
    posts: [],
  },
  {
    id: "closed",
    title: "Closed",
    count: 0,
    posts: [],
  },
];

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Board");
  const [currentPage, setCurrentPage] = useState("board");
  const [columns, setColumns] = useState(initialColumns);

  // Flatten all posts from all columns for table view
  const allPosts = columns.flatMap((column) => column.posts);

  // Handle post updates from any view
  const handlePostUpdate = (updatedPost: Post) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        posts: column.posts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        ),
      }))
    );
  };

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
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNavigate={handleSidebarNavigation}
      />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-hidden p-6">
          {activeTab === "Board" && (
            <KanbanBoard
              initialColumns={columns}
              onColumnsChange={setColumns}
              onPostUpdate={handlePostUpdate}
            />
          )}
          {activeTab === "Calendar" && (
            <CalendarView posts={allPosts} onPostUpdate={handlePostUpdate} />
          )}
          {activeTab === "Table" && (
            <TableView posts={allPosts} onPostUpdate={handlePostUpdate} />
          )}
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
