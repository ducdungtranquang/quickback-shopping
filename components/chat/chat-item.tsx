interface ChatListItemProps {
  avatarUrl: string;
  name: string;
  lastMessage: string;
  time: string;
  isSelected: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  avatarUrl,
  name,
  lastMessage,
  time,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center p-3 cursor-pointer ${
        isSelected ? "bg-gray-200" : "hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <img
        className="w-10 h-10 rounded-full"
        src={avatarUrl}
        alt={`${name}'s avatar`}
      />
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{name}</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-500">{lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatListItem;
