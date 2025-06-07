
export interface Post {
  id: string;
  title: string;
  date: string;
  time: string;
  platforms: string[];
  image?: string;
  author: string;
  likes: number;
  description?: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: string;
}
