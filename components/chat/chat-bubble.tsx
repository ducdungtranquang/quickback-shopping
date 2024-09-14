interface ChatBubbleProps {
  avatarUrl: string;
  name: string;
  time: string;
  message: string;
  status: string;
  isCurrentUser: boolean; // Thêm thuộc tính xác định người dùng hiện tại
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  avatarUrl,
  name,
  time,
  message,
  status,
  isCurrentUser,
}) => {
  return (
    <div
      className={`flex items-start gap-2.5 ${
        isCurrentUser ? "justify-end" : ""
      }`}
    >
      {!isCurrentUser && (
        <img
          className="w-8 h-8 rounded-full"
          src={avatarUrl}
          alt={`${name}'s avatar`}
        />
      )}
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700 ${
          isCurrentUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "rounded-bl-none"
        }`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {time}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900">{message}</p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {status}
        </span>
      </div>
      {isCurrentUser && (
        <img
          className="w-8 h-8 rounded-full"
          src={avatarUrl}
          alt={`${name}'s avatar`}
        />
      )}
    </div>
  );
};

export default ChatBubble
