import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Upload,
  Smile,
  Paperclip,
  Send,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Post } from "@/types/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isUser: boolean;
}

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Post>) => void;
  editingPost?: Post | null;
  triggerColumnId?: string;
  allPosts?: Post[];
}

const sampleInternalMessages: Message[] = [
  {
    id: "1",
    text: "Please review the content before posting",
    sender: "Team Lead",
    timestamp: "10:30 AM",
    isUser: false,
  },
  {
    id: "2",
    text: "Will update the caption accordingly",
    sender: "You",
    timestamp: "10:35 AM",
    isUser: true,
  },
];

const sampleClientMessages: Message[] = [
  {
    id: "1",
    text: "The banner looks great! Can we adjust the timing?",
    sender: "Client",
    timestamp: "09:15 AM",
    isUser: false,
  },
  {
    id: "2",
    text: "Of course! What time would work better?",
    sender: "You",
    timestamp: "09:20 AM",
    isUser: true,
  },
];

const ContentModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingPost,
  triggerColumnId,
  allPosts = [],
}: ContentModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [assignee, setAssignee] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [activeTab, setActiveTab] = useState<"internal" | "client">("internal");
  const [messageText, setMessageText] = useState("");
  const [internalMessages, setInternalMessages] = useState<Message[]>(
    sampleInternalMessages
  );
  const [clientMessages, setClientMessages] =
    useState<Message[]>(sampleClientMessages);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (editingPost && allPosts && allPosts.length > 0) {
      const index = allPosts.findIndex((post) => post.id === editingPost.id);
      if (index !== -1) {
        setCurrentPostIndex(index);
      }
    }
  }, [editingPost, allPosts]);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || "");
      setDescription(editingPost.description || "");
      setScheduledDate(editingPost.date || "");
      setScheduledTime(editingPost.time || "");
      setAssignee(editingPost.author || "");
      setNotes(editingPost.notes || "");
      setUploadedImage(editingPost.image || "");
    } else {
      setTitle("Create Content - User Profile Page");
      setDescription("");
      setScheduledDate("Wed, Jan 17, 2025");
      setScheduledTime("07:00 AM");
      setAssignee("");
      setNotes("");
      setUploadedImage("");
    }
    setIsDirty(false);
  }, [editingPost, isOpen]);

  const handleChange = (field: string, value: string) => {
    setIsDirty(true);
    switch (field) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "scheduledDate":
        setScheduledDate(value);
        break;
      case "scheduledTime":
        setScheduledTime(value);
        break;
      case "assignee":
        setAssignee(value);
        break;
      case "notes":
        setNotes(value);
        break;
    }
  };

  const handleSubmit = () => {
    const formData: Partial<Post> = {
      id: editingPost?.id,
      title: title || "Create Content - User Profile Page",
      description,
      date: scheduledDate || "Wed, Jan 17, 2025",
      time: scheduledTime || "07:00 AM",
      platforms: ["tiktok", "instagram", "facebook"],
      image:
        uploadedImage ||
        "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
      author: assignee || "John Doe",
      likes: editingPost?.likes || 0,
      notes,
    };

    onSubmit(formData);
    setIsDirty(false);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text: messageText,
      sender: "You",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isUser: true,
    };

    if (activeTab === "internal") {
      setInternalMessages((prev) => [...prev, newMessage]);
    } else {
      setClientMessages((prev) => [...prev, newMessage]);
    }

    setMessageText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePrevious = () => {
    if (allPosts && allPosts.length > 0 && currentPostIndex > 0) {
      const prevPost = allPosts[currentPostIndex - 1];
      setCurrentPostIndex(currentPostIndex - 1);
      setTitle(prevPost.title || "");
      setDescription(prevPost.description || "");
      setScheduledDate(prevPost.date || "");
      setScheduledTime(prevPost.time || "");
      setAssignee(prevPost.author || "");
      setNotes(prevPost.notes || "");
      setUploadedImage(prevPost.image || "");
    }
  };

  const handleNext = () => {
    if (
      allPosts &&
      allPosts.length > 0 &&
      currentPostIndex < allPosts.length - 1
    ) {
      const nextPost = allPosts[currentPostIndex + 1];
      setCurrentPostIndex(currentPostIndex + 1);
      setTitle(nextPost.title || "");
      setDescription(nextPost.description || "");
      setScheduledDate(nextPost.date || "");
      setScheduledTime(nextPost.time || "");
      setAssignee(nextPost.author || "");
      setNotes(nextPost.notes || "");
      setUploadedImage(nextPost.image || "");
    }
  };

  const currentMessages =
    activeTab === "internal" ? internalMessages : clientMessages;

  const handleClose = () => {
    if (isDirty) {
      handleSubmit();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left Panel - Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={
                    currentPostIndex === 0 || !allPosts || allPosts.length <= 1
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  disabled={
                    !allPosts ||
                    currentPostIndex === allPosts.length - 1 ||
                    allPosts.length <= 1
                  }
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Post Organically
                </Button>
                <Button variant="ghost" size="sm">
                  <span className="text-xl">⋮</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              <div className="p-6">
                {/* Title - Now editable */}
                <div className="mb-8 text-center">
                  <Input
                    value={title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="text-xl font-semibold text-center border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Image Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      {uploadedImage ? (
                        <div className="relative">
                          <img
                            src={uploadedImage}
                            alt="Preview"
                            className="max-h-[200px] mx-auto rounded-lg"
                          />
                          <button
                            className="absolute top-2 right-2 bg-white rounded-full p-1"
                            onClick={() => setUploadedImage("")}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Plus className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 mb-2">
                            <span
                              className="text-blue-600 cursor-pointer"
                              onClick={() =>
                                document.getElementById("image-upload")?.click()
                              }
                            >
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">
                            PNG or JPG (max. 800x400px)
                          </p>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setUploadedImage(URL.createObjectURL(file));
                              }
                            }}
                          />
                        </>
                      )}
                    </div>

                    {/* Notes Section */}
                    <Textarea
                      placeholder="Write notes for your editors, ideas, examples..."
                      value={notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      className="min-h-[120px] resize-none border-0 bg-transparent text-gray-500 placeholder-gray-400"
                    />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Assignee */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          Assignee
                        </label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input
                        value={assignee}
                        onChange={(e) =>
                          handleChange("assignee", e.target.value)
                        }
                        placeholder="Assignee"
                        className="bg-gray-50"
                      />
                    </div>

                    {/* Caption/Description */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Caption
                      </label>
                      <Textarea
                        value={description}
                        onChange={(e) =>
                          handleChange("description", e.target.value)
                        }
                        placeholder="Write your caption..."
                        className="min-h-[100px] resize-none"
                      />
                    </div>

                    {/* Schedule */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Schedule
                      </label>
                      <div className="flex gap-3">
                        <Input
                          value={scheduledDate}
                          onChange={(e) =>
                            handleChange("scheduledDate", e.target.value)
                          }
                          className="flex-1"
                        />
                        <Input
                          value={scheduledTime}
                          onChange={(e) =>
                            handleChange("scheduledTime", e.target.value)
                          }
                          className="w-32"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Chat and Notes */}
          <div className="w-80 border-l border-gray-200 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                    activeTab === "internal"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("internal")}
                >
                  Internal Chat
                </button>
                <button
                  className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                    activeTab === "client"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("client")}
                >
                  Client Chat
                </button>
              </div>

              {activeTab === "internal" && (
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Only your team members will be able to see this chat. Use it
                  to collaborate internally.
                </p>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Smile className="w-4 h-4" />
                </Button>
                <div className="flex-1 flex">
                  <Input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Leave a comment..."
                    className="border-0 shadow-none"
                    onKeyPress={handleKeyPress}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="ml-2"
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentModal;
