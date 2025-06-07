
import { useState } from 'react';
import { ChevronDown, Search, Inbox, Settings, Plus, Users } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: (page: string) => void;
}

const Sidebar = ({ collapsed, onToggle, onNavigate }: SidebarProps) => {
  const [socialSpacesExpanded, setSocialSpacesExpanded] = useState(true);

  const handleInboxClick = () => {
    if (onNavigate) {
      onNavigate('inbox');
    }
  };

  const handleMyContentClick = () => {
    if (onNavigate) {
      onNavigate('board');
    }
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            {!collapsed && (
              <div>
                <div className="font-semibold text-gray-900">Flux Corporation</div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            )}
          </div>
          <button onClick={onToggle} className="p-1 hover:bg-gray-100 rounded">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="px-4 space-y-4">
          <nav className="space-y-1">
            <button 
              onClick={handleMyContentClick}
              className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left"
            >
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
              <span>My content</span>
            </button>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Search className="w-5 h-5 text-gray-400" />
              <span>Search</span>
            </a>
            <button 
              onClick={handleInboxClick}
              className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left"
            >
              <Inbox className="w-5 h-5 text-gray-400" />
              <span>Inbox</span>
              <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">3</span>
            </button>
          </nav>

          <div>
            <button
              onClick={() => setSocialSpacesExpanded(!socialSpacesExpanded)}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${socialSpacesExpanded ? '' : '-rotate-90'}`} />
                <span className="text-sm font-medium">Social Spaces</span>
              </div>
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
            
            {socialSpacesExpanded && (
              <div className="ml-6 mt-1 space-y-1">
                <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg bg-blue-50 border-r-2 border-blue-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-blue-600 font-medium">Beyond UI</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Marketing</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>HR</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        {!collapsed && (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2 text-yellow-800 text-sm">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <span>7 days left in trial</span>
                <button className="ml-auto text-blue-600 font-medium">Upgrade</button>
              </div>
            </div>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5 text-gray-400" />
              <span>Support</span>
            </a>
            <div className="flex items-center space-x-3 px-3 py-2 mt-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <div className="text-sm font-medium text-gray-900">Anna Taylor</div>
                <div className="text-xs text-gray-500">anna@email.com</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
