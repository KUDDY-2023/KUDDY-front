import { atom, selector } from "recoil";

// ⭐ Itinerary 게시물 생성 atom
export const itineraryPostState = atom<ItineraryPostType>({
  key: "itineraryPostState",
  default: {
    postType: "itinerary",
    title: "",
    content: "",
    spots: [],
  },
});

// ⭐ Talking - join us 게시물 생성 atom
export const joinUsPostState = atom<JoinUsPostType>({
  key: "joinUsPostState",
  default: {
    postType: "joinus",
    title: "",
    content: "",
    people: 0,
    date: "",
    district: "",
    images: [],
  },
});

// ⭐ Talking - others 게시물 생성 atom
export const othersPostState = atom<OthersPostType>({
  key: "othersPostState",
  default: {
    postType: "others",
    title: "",
    content: "",
    subject: "",
    images: [],
  },
});
