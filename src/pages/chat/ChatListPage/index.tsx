import "./chatlistpage.scss";
import BackNavBar from "@components/_common/backnavbar";
import { useState, useEffect } from "react";

import { chatListData } from "./chatListData";
export default function ChatListPage() {
  const [chatList, setChatList] = useState(chatListData);

  return (
    <div className="chat-list-page">
      <BackNavBar middleTitle="Chat" />

      <div className="chat-list-container">
        {chatList.map(c => {
          let chatStyle = c.unRead ? "unread" : "read";

          return (
            <div className="chat-list">
              <div className="profile">
                <img src={c.imgUrl} alt="profile-img" />
                {c.unRead && <span></span>}
              </div>
              <div className="info">
                <div id="name">jane</div>
                <div className="flex">
                  <p className={chatStyle}>Made andsf</p>
                  <p id="time">5 minute ago</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
