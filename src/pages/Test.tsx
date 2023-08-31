import { apiClient } from "@services/api";

export default function Test() {
  const test = () => {
    console.log("axios 객체", apiClient.defaults);
    console.log(
      "Authorization Header:",
      apiClient.defaults.headers.common.Authorization,
    );

    apiClient
      .get("~")
      .then(res => console.log("?"))
      .catch(e => console.log(e));
  };
  return (
    <div>
      <button onClick={test}>axios 객체 검사</button>
    </div>
  );
}
