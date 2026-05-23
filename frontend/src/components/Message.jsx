export const Message = ({ messageInfo , index}) => {
  return (
    <div className="w-fit">
      <span className="text-sm text-slate-600">{messageInfo.userName}</span>
      <div className="p-2 bg-gray-100 rounded-lg shadow-md">
        {messageInfo.message}
      </div>
    </div>
  );
};
