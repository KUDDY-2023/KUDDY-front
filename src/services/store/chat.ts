import { atom, selector } from "recoil";

// ⭐ 동행 요청 메세지에 필요한 필드
export const meetUpInfoState = atom({
  key: "meetUpInfoState",
  default: {
    spotContentId: null, // 장소 id
    spotName: null, // 장소 이름
    // 시간 2021-11-05 13:47:13.248
    appointmentTimeD: null, // 2021-11-05
    appointmentTimeT: null, // 13:47:13.248
    price: null, // 가격 정수로 $
  },
});
