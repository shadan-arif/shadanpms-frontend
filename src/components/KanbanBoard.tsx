import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Plus, MoreHorizontal } from "lucide-react";
import PostCard from "./PostCard";
import ContentModal from "./ContentModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Post } from "@/types/post";

interface Column {
  id: string;
  title: string;
  count: number;
  posts: Post[];
}

interface KanbanBoardProps {
  initialColumns?: Column[];
  onColumnsChange?: (columns: Column[]) => void;
  onPostUpdate?: (updatedPost: Post) => void;
}

const KanbanBoard = ({
  initialColumns,
  onColumnsChange,
  onPostUpdate,
}: KanbanBoardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [triggerColumnId, setTriggerColumnId] = useState<string>("");
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "idea",
      title: "Idea",
      count: 8,
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
          title: "Social Media Campaign",
          description: "Create engaging social media content",
          date: "October 26, 2023",
          time: "8:00 AM - 26 July",
          platforms: ["tiktok", "instagram"],
          image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
          author: "Jane Smith",
          likes: 5,
          notes: "Focus on trending hashtags",
        },
        {
          id: "post-3",
          title: "Product Launch Video",
          description: "Create promotional video for new product",
          date: "October 27, 2023",
          time: "9:00 AM - 27 July",
          platforms: ["facebook", "instagram"],
          image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
          author: "Mike Johnson",
          likes: 12,
          notes: "Include product features",
        },
        {
          id: "post-5",
          title: "Holiday Special Post",
          description: "Create festive content for holidays",
          date: "October 28, 2023",
          time: "10:00 AM - 28 July",
          platforms: ["tiktok", "facebook"],
          image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
          author: "Sarah Wilson",
          likes: 8,
          notes: "Use holiday themes",
        },
        {
          id: "post-6",
          title: "Behind the Scenes",
          description: "Show company culture and team",
          date: "October 29, 2023",
          time: "11:00 AM - 29 July",
          platforms: ["instagram", "facebook"],
          image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
          author: "Tom Brown",
          likes: 15,
          notes: "Authentic content",
        },
        {
          id: "post-7",
          title: "Customer Testimonial",
          description: "Feature satisfied customer reviews",
          date: "October 30, 2023",
          time: "12:00 PM - 30 July",
          platforms: ["tiktok", "instagram", "facebook"],
          image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
          author: "Lisa Davis",
          likes: 20,
          notes: "Include customer quotes",
        },
        {
          id: "post-8",
          title: "Tutorial Content",
          description: "Educational content about product usage",
          date: "October 31, 2023",
          time: "1:00 PM - 31 July",
          platforms: ["tiktok", "instagram"],
          image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
          author: "Alex Chen",
          likes: 18,
          notes: "Step-by-step guide",
        },
        {
          id: "post-9",
          title: "Weekly Roundup",
          description: "Summary of week's highlights",
          date: "November 1, 2023",
          time: "2:00 PM - 1 Nov",
          platforms: ["facebook", "instagram"],
          image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
          author: "Emma Taylor",
          likes: 10,
          notes: "Include key metrics",
        },
      ],
    },
    {
      id: "progress",
      title: "In Progress",
      count: 4,
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
        {
          id: "post-10",
          title: "Video Editing",
          description: "Edit promotional video content",
          date: "November 2, 2023",
          time: "3:00 PM - 2 Nov",
          platforms: ["tiktok", "instagram"],
          image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
          author: "David Lee",
          likes: 7,
          notes: "Add transitions and effects",
        },
        {
          id: "post-11",
          title: "Content Review",
          description: "Review and approve content drafts",
          date: "November 3, 2023",
          time: "4:00 PM - 3 Nov",
          platforms: ["facebook", "instagram"],
          image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
          author: "Rachel Green",
          likes: 3,
          notes: "Check brand guidelines",
        },
        {
          id: "post-12",
          title: "Graphics Design",
          description: "Create visual assets for posts",
          date: "November 4, 2023",
          time: "5:00 PM - 4 Nov",
          platforms: ["tiktok", "facebook"],
          image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
          author: "Kevin Park",
          likes: 11,
          notes: "Use brand colors",
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
  ]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const sourceColumnIndex = columns.findIndex(
      (col) => col.id === source.droppableId
    );
    const destColumnIndex = columns.findIndex(
      (col) => col.id === destination.droppableId
    );

    const sourceColumn = columns[sourceColumnIndex];
    const destColumn = columns[destColumnIndex];

    const sourcePosts = [...sourceColumn.posts];
    const destPosts =
      sourceColumn === destColumn ? sourcePosts : [...destColumn.posts];

    const [movedPost] = sourcePosts.splice(source.index, 1);
    destPosts.splice(destination.index, 0, movedPost);

    const newColumns = [...columns];
    newColumns[sourceColumnIndex] = {
      ...sourceColumn,
      posts: sourcePosts,
      count: sourcePosts.length,
    };

    if (sourceColumn !== destColumn) {
      newColumns[destColumnIndex] = {
        ...destColumn,
        posts: destPosts,
        count: destPosts.length,
      };
    }

    setColumns(newColumns);
  };

  const handleAddContent = (columnId?: string) => {
    setEditingPost(null);
    setTriggerColumnId(columnId || "idea");
    setIsModalOpen(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: Partial<Post>) => {
    if (editingPost) {
      // Update existing post
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          posts: column.posts.map((post) =>
            post.id === editingPost.id ? { ...post, ...formData } : post
          ),
        }))
      );
    } else {
      // Create new post
      const newPost: Post = {
        id: formData.id || `post-${Date.now()}`,
        title: formData.title || "Post a Banner",
        description:
          formData.description || "Create a marketing banner for the campaign",
        date: formData.date || "October 25, 2023",
        time: formData.time || "7:00 AM - 25 July",
        platforms: formData.platforms || ["tiktok", "instagram", "facebook"],
        image:
          formData.image ||
          "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: formData.author || "John Doe",
        likes: formData.likes || 0,
        notes: formData.notes || "",
      };

      const targetColumnId = triggerColumnId || "idea";
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === targetColumnId
            ? {
                ...column,
                posts: [...column.posts, newPost],
                count: column.posts.length + 1,
              }
            : column
        )
      );
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPost(null);
    setTriggerColumnId("");
  };

  // Get all posts from all columns
  const allPosts = columns.flatMap((column) => column.posts);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {columns.map((column) => (
              <div
                key={column.id}
                className="bg-gray-50 rounded-lg w-[320px] flex flex-col h-[calc(100vh-200px)]"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">
                      {column.title}
                    </h3>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {column.count}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAddContent(column.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`p-4 min-h-full ${
                            snapshot.isDraggingOver ? "bg-gray-50" : ""
                          }`}
                        >
                          {column.posts.length === 0 ? (
                            <div className="text-center py-20">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                              </div>
                              <p className="text-gray-500 text-sm mb-4">
                                No content currently. Board is empty
                              </p>
                              <button
                                onClick={() => handleAddContent(column.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                              >
                                Add Content
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {column.posts.map((post, index) => (
                                <Draggable
                                  key={post.id}
                                  draggableId={post.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={
                                        snapshot.isDragging
                                          ? "rotate-3 shadow-lg"
                                          : ""
                                      }
                                      onClick={() => handleEditPost(post)}
                                    >
                                      <PostCard post={post} />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </div>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </ScrollArea>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DragDropContext>

      <ContentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        editingPost={editingPost}
        triggerColumnId={triggerColumnId}
        allPosts={allPosts}
      />
    </>
  );
};

export default KanbanBoard;
