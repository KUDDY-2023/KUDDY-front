import Swal from "sweetalert2";

export const confirmAddAlert = () =>
  Swal.fire({
    title: "톡캘린더 또는 구글 캘린더에 일정을 추가할까요?",
    text: "캘린더로 일정을 관리하세요",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });

export const completeAlert = () =>
  Swal.fire(
    "캘린더에 일정을 추가했어요",
    "약속을 잊지 않도록 리마인드 해드릴게요",
    "success",
  );

export const refundAlert = () => {
  Swal.fire("어쩌구저쩌구", "?", "success");
  console.log();
};
