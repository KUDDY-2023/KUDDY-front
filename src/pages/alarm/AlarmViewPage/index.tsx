import "./alarm-view-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import AlarmItem from "@components/Alarm/AlarmItem";
import { alarmData } from "./alarmData";

import { useEffect, useState } from "react";
import { useQuery, useQueries } from "react-query";

import { nofiGetAll, nofiUnReadCount } from "@services/api/notification";
import {
  useReadAllNoti,
  useGetAllNoti,
  useGetNotiCount,
  useGotoPost,
} from "@services/hooks/notification";

export default function AlarmViewPage() {
  const { notiData, notiError, notiLoading } = useGetAllNoti(); // 모든 알림 가져오기
  const { notiCount, notiCountError, notiCountLoading } = useGetNotiCount(); // 알림개수 가져오기

  useEffect(() => {
    console.log("알림 조회 > ", notiData);
    console.log("알림 개수 > ", notiCount);
  }, [notiData, notiCount]);

  const onReadAll = useReadAllNoti(); // 모두 읽기
  const onGotoPost = useGotoPost(); // 포스트 보러 가기

  return (
    <div className="alarm-view-page">
      <BackNavBar middleTitle="Notification" isShare={false} />
      <div className="top-container">
        <div className="count-box">
          <span>{notiCount}</span> new notification
        </div>

        {notiCount ? (
          <div className="mark-btn active" onClick={onReadAll}>
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
