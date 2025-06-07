
import { useState, useMemo } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { Post } from '@/types/post';
import ContentModal from './ContentModal';

const TableView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Post>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample posts data - in a real app, this would come from a store/API
  const samplePosts: Post[] = [
    {
      id: '1',
      title: 'Summer Campaign Launch',
      date: '2025-01-15',
      time: '10:00 AM',
      platforms: ['instagram', 'facebook'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop',
      author: 'John Doe',
      likes: 45,
      description: 'Launch our summer campaign across social platforms',
      notes: 'Remember to include hashtags'
    },
    {
      id: '2',
      title: 'Product Announcement',
      date: '2025-01-22',
      time: '2:00 PM',
      platforms: ['tiktok', 'instagram'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop',
      author: 'Jane Smith',
      likes: 32,
      description: 'Announce our new product line',
      notes: 'Use trending music'
    },
    {
      id: '3',
      title: 'Holiday Special',
      date: '2025-01-08',
      time: '9:00 AM',
      platforms: ['facebook', 'tiktok'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop',
      author: 'Mike Johnson',
      likes: 67,
      description: 'Special holiday promotion',
      notes: 'Include discount code'
    }
  ];

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = samplePosts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof Post) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleModalSubmit = (formData: Partial<Post>) => {
    console.log('Table modal submit:', formData);
    handleModalClose();
  };

  const getPlatformIcons = (platforms: string[]) => {
    return platforms.map(platform => (
      <span key={platform} className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
    ));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Content Table</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">
                    <button
                      onClick={() => handleSort('title')}
                      className="flex items-center space-x-1 font-medium text-gray-700 hover:text-gray-900"
                    >
                      <span>Title</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <button
                      onClick={() => handleSort('author')}
                      className="flex items-center space-x-1 font-medium text-gray-700 hover:text-gray-900"
                    >
                      <span>Author</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center space-x-1 font-medium text-gray-700 hover:text-gray-900"
                    >
                      <span>Date</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <button
                      onClick={() => handleSort('time')}
                      className="flex items-center space-x-1 font-medium text-gray-700 hover:text-gray-900"
                    >
                      <span>Time</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4">Platforms</th>
                  <th className="text-left py-3 px-4">
                    <button
                      onClick={() => handleSort('likes')}
                      className="flex items-center space-x-1 font-medium text-gray-700 hover:text-gray-900"
                    >
                      <span>Likes</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedPosts.map((post) => (
                  <tr
                    key={post.id}
                    onClick={() => handlePostClick(post)}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-8 h-8 rounded object-cover"
                          />
                        )}
                        <span className="font-medium text-gray-900">{post.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{post.author}</td>
                    <td className="py-3 px-4 text-gray-700">{post.date}</td>
                    <td className="py-3 px-4 text-gray-700">{post.time}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {getPlatformIcons(post.platforms)}
                        <span className="text-sm text-gray-600 ml-1">
                          {post.platforms.length}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{post.likes}</td>
                    <td className="py-3 px-4 text-gray-700 max-w-xs truncate">
                      {post.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAndSortedPosts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No posts found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      <ContentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        initialData={selectedPost || undefined}
      />
    </>
  );
};

export default TableView;
