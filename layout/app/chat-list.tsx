import ChatListItem from "@/components/chat/chat-item";

interface ChatListProps {
  conversations: {
    id: number;
    avatarUrl: string;
    name: string;
    lastMessage: string;
    time: string;
  }[];
  selectedChatId: number | null;
  onSelectChat: (chatId: number) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  conversations,
  selectedChatId,
  onSelectChat,
}) => {
  return (
    <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
      {conversations.map((chat) => (
        <ChatListItem
          key={chat.id}
          avatarUrl={chat.avatarUrl}
          name={chat.name}
          lastMessage={chat.lastMessage}
          time={chat.time}
          isSelected={chat.id === selectedChatId}
          onClick={() => onSelectChat(chat.id)}
        />
      ))}
    </div>
  );
};

export default ChatList;
