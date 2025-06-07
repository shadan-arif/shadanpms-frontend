
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Plus, Upload, Bold, Italic, Underline, List, Type, Smile, Paperclip, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Post } from '@/types/post';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Post>) => void;
  editingPost?: Post | null;
  triggerColumnId?: string;
}

const ContentModal = ({ isOpen, onClose, onSubmit, editingPost, triggerColumnId }: ContentModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [assignee, setAssignee] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [activeTab, setActiveTab] = useState<'internal' | 'client'>('internal');
  const [messageText, setMessageText] = useState('');
  const [internalMessages, setInternalMessages] = useState<Message[]>([]);
  const [clientMessages, setClientMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || '');
      setDescription(editingPost.description || '');
      setScheduledDate(editingPost.date || '');
      setScheduledTime(editingPost.time || '');
      setAssignee(editingPost.author || '');
      setNotes(editingPost.notes || '');
      setUploadedImage(editingPost.image || '');
    } else {
      setTitle('');
      setDescription('');
      setScheduledDate('');
      setScheduledTime('');
      setAssignee('');
      setNotes('');
      setUploadedImage('');
    }
  }, [editingPost, isOpen]);

  const handleSubmit = () => {
    const formData: Partial<Post> = {
      id: editingPost?.id,
      title: title || 'Post a Banner',
      description,
      date: scheduledDate || 'October 25, 2023',
      time: scheduledTime || '7:00 AM - 25 July',
      platforms: ['tiktok', 'instagram', 'facebook'],
      image: uploadedImage || '/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png',
      author: assignee || 'John Doe',
      likes: editingPost?.likes || 0,
      notes
    };
    
    onSubmit(formData);
    onClose();
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text: messageText,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString()
    };

    if (activeTab === 'internal') {
      setInternalMessages(prev => [...prev, newMessage]);
    } else {
      setClientMessages(prev => [...prev, newMessage]);
    }

    setMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const currentMessages = activeTab === 'internal' ? internalMessages : clientMessages;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <div className="flex h-[80vh]">
          {/* Left Panel - Content Creation */}
          <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-semibold">
                {editingPost ? 'Edit Content' : 'Create New Content'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter content title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="border border-gray-300 rounded-lg">
                  <div className="flex items-center space-x-2 p-2 border-b border-gray-200">
                    <button className="p-1 hover:bg-gray-100 rounded"><Bold className="w-4 h-4" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><Italic className="w-4 h-4" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><Underline className="w-4 h-4" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><List className="w-4 h-4" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><Type className="w-4 h-4" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><Smile className="w-4 h-4" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><Paperclip className="w-4 h-4" /></button>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 resize-none focus:outline-none"
                    rows={4}
                    placeholder="Enter content description"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Time</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select assignee</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Mike Johnson">Mike Johnson</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Click to upload or drag and drop</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploadedImage(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </div>
                {uploadedImage && (
                  <div className="mt-2">
                    <img src={uploadedImage} alt="Preview" className="w-20 h-20 object-cover rounded" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add any additional notes"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingPost ? 'Update' : 'Create'}
              </button>
            </div>
          </div>

          {/* Right Panel - Chat */}
          <div className="w-1/2 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('internal')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    activeTab === 'internal'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Internal Chat
                </button>
                <button
                  onClick={() => setActiveTab('client')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    activeTab === 'client'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Client Chat
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {currentMessages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <p>No messages yet. Start a conversation!</p>
                </div>
              ) : (
                currentMessages.map((message) => (
                  <div key={message.id} className="bg-gray-100 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-gray-900">{message.sender}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-700">{message.text}</p>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentModal;
