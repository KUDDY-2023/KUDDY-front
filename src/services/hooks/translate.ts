import { translate } from "@services/api/translate";

// ✅ 번역 요청
export const useTranslate = () => {
  const onTranslate = async (chat: string, target: string) => {
    try {
      const res = await translate(chat, target);
      return res.data.data.translations[0].translatedText;
    } catch (err) {
      console.log(err);
    }
  };

  return onTranslate;
};
