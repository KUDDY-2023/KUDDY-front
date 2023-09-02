export default function useCheckNickname() {
  const onCheckNickname = (nickname: string) => {
    var pattern = /^[a-zA-Z0-9_]+$/;
    return pattern.test(nickname);
  };

  return onCheckNickname;
}
