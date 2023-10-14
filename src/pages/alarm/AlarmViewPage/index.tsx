import "./alarm-view-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import AlarmItem from "@components/Alarm/AlarmItem";

import { useEffect, useState } from "react";

import {
  useReadAllNoti,
  useGetAllNoti,
  useGetCommentNotiCount,
  useGotoPost,
} from "@services/hooks/notification";

import { nofiUnReadCount, nofiGetAll } from "@services/api/notification";

export default function AlarmViewPage() {
  const { notiData, notiError, notiLoading, refetchNotiData } = useGetAllNoti(); // 모든 알림 가져오기
  const { notiCount, notiCountError, notiCountLoading, refetchNotiCount } =
    useGetCommentNotiCount(); // 알림개수 가져오기

  const onReadAll = useReadAllNoti(); // 모두 읽기
  const onGotoPost = useGotoPost(); // 포스트 보러 가기

  const onClickMarkBtn = async () => {
    await onReadAll();
    refetchNotiData();
    refetchNotiCount();
  };

  return (
    <div className="alarm-view-page">
      <BackNavBar middleTitle="Notification" isShare={false} />
      <div className="top-container">
        <div className="count-box">
          <span>{notiCount}</span> new notification
        </div>

        {notiCount ? (
          <div className="mark-btn active" onClick={onClickMarkBtn}>
            Mark all as read
          </div>
        ) : (
          <div className="mark-btn">Mark all as read</div>
        )}
      </div>
      <div className="alarm-item-container">
        {notiLoading ? (
          <p>로딩중...</p>
        ) : (
          <>
            {notiData.map((a: any) => (
              <AlarmItem
                alarm={a}
                key={a.id}
                onGotoPost={() => onGotoPost(a.contentId, a.id)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
