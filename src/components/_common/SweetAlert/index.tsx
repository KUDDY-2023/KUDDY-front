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

export const englishIsMandatoryAlert = () => {
  Swal.fire({
    text: "English proficiency is mandatory to select.",
    icon: "warning",
    iconColor: "#FFC6C6",
    showConfirmButton: false,
  });
};

export const ticketNotUploadedYetAlert = () => {
  Swal.fire({
    text: "Upload your ticket image before request.",
    icon: "warning",
    iconColor: "#eeeeee",
  });
};

export const loginToUsePick = () => {
  Swal.fire({
    text: "Please login to 'pick' your travel",
    icon: "warning",
    iconColor: "#eeeeee",
    showCancelButton: true,
    confirmButtonText: "Login",
  }).then(res => {
    if (res.isConfirmed) window.location.replace("/auth/register");
  });
};

export const addCalendarAlert = () =>
  Swal.fire({
    text: "Do you want to add a schedule to Kakao Talk Calendar?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });

export const successAddCalendarAlert = () =>
  Swal.fire({
    text: "Successfully added the schedule.",
    icon: "success",
  });

export const accessCalendarAlert = () =>
  Swal.fire({
    text: "Access permission for Kakao Talk Calendar granted. Please click the schedule creation button again.",
    icon: "info",
  });

export const reportUserAlert = () =>
  Swal.fire({
    title: "Are you sure you want to report this user?",
    text: "False reporting may result in disadvantages.",
    icon: "warning",
    iconColor: "#FFC6C6",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes",
  });

export const reportUserSuccessAlert = () =>
  Swal.fire({
    title: "The report has been completed.",
    text: "We will process it quickly. Thank you.",
    icon: "success",
    iconColor: "#A6FE90",
  });

export const reportUserFailAlert = () =>
  Swal.fire({
    title: "Report failed.",
    text: "Please try again.",
    icon: "error",
    iconColor: "#FFC6C6",
  });

export const profileNameAlert = (alert: string) =>
  Swal.fire({
    text: alert,
    icon: "error",
  });

export const stopMakingProfileAlert = () =>
  Swal.fire({
    title: "Are you sure you want to abort creating a profile?",
    text: "If you proceed, you will be automatically logged out.",
    icon: "warning",
    iconColor: "#FFC6C6",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes",
  });

export const clipboardAlert = () =>
  Swal.fire({
    text: "The URL has been copied to the clipboard.",
    icon: "success",
  });
