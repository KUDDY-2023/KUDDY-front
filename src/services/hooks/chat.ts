import { useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { updateAuthHeader } from "@services/api"; // axios 토큰 업데이트

import {
  chatSaveMessage,
  chatRooms,
  chatGetRoomStatus,
  chatCreateRoom,
} from "@services/api/chat";
import { meetUpInfoState } from "@services/store/chat";

// ✅ 채팅방 리스트 가져오기
export const useGetChatRooms = async () => {
  try {
    const res = await chatRooms();
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

// ✅ 메세지 저장
export const useSaveMessage = () => {
  const onSave = async (message: ISingleMessage) => {
    try {
      const res = await chatSaveMessage(message);
      return res.data.data;
    } catch (err) {
      console.log("메세지 저장 실패", err);
    }
  };

  return onSave;
};

// ✅ 동행 요청 메세지 생성 - 업데이트 훅
export const useMakeMeetUpInfo = () => {
  const [info, setInfo] = useRecoilState(meetUpInfoState);

  const onMakeMeetUpInfo = (updates: any) =>
    setInfo(info => ({
      ...info,
      ...updates,
    }));

  return onMakeMeetUpInfo;
};

// ✅ 채팅방 여부 조회 (없으면 채팅방 생성)
export const useGetRoomStatus = () => {
  const onGetRoomStatus = async (email: string, nickname: string) => {
    try {
      let res = await chatGetRoomStatus(email);

      // 채팅방 없으면 생성
      if (
        res.data.data.message ===
        "해당 유저와 생성한 채팅방이 존재하지 않습니다."
      ) {
        const memberNickname = {
          createMemberNickname: nickname,
        };
        res = await chatCreateRoom(memberNickname);
      }
      return res.data.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  return onGetRoomStatus;
};
