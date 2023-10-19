interface OrderChatTextProps {
  message: string | null;
}

export default function PrimaryChatText({ message }: OrderChatTextProps) {
  return (
    <p className="text-xs text-black p-3 bg-gray-100 rounded-md w-fit max-w-sm">
      {message == null ? "送信された情報が正確に表示されません" : message}
    </p>
  );
}
