import React from 'react';
function Sidebar() {
  const userName = localStorage.getItem('userName') || 'Guest User'; 
  
  return (
    <div className="w-80 bg-gray-100 p-4 flex flex-col invisible md:visible">
      {/* Header */}
      <div className="mb-4 invisible md:visible">
        <h1 className="text-2xl font-bold text-purple-800 ">Mariposa</h1>
      </div>
      {/* New Chat Button */}
      <button className="bg-purple-500 text-white px-4 py-2 mb-4 rounded invisible md:visible">NEW Chat</button>
      {/* Past Searches */}
      <div className="flex-1 overflow-y-auto invisible md:visible">
        <h3 className="mb-2">Past Searches</h3>
        <ul>
          <li className="bg-white p-2 mb-2 rounded"></li>
          <li className="bg-white p-2 mb-2 rounded"></li>
        </ul>
      </div>
      {/* User Name */}
      <div className="mt-auto text-center invisible md:visible">
        <p className="text-lg font-bold">{userName}</p>
      </div>
    </div>
  );
}
export default Sidebar;