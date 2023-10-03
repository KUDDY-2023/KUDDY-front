type youtubeType = {
  id: number;
  title: string;
  url: string;
};
type ktubeType = {
  id: number;
  category: string;
  youtube: youtubeType[];
};

export const ktubeList: ktubeType[] = [
  {
    id: 0,
    category: "K-Tour",
    youtube: [
      {
        id: 0,
        title: "【Seoul】 Travel Guide - Top 10 Seoul | Korea Travel",
        url: "https://www.youtube.com/embed/eVFMDMpY36o?si=DnbwL2ug4OjsK1mY",
      },
      {
        id: 1,
        title: "50 Things to do in Seoul, Korea Travel Guide",
        url: "https://www.youtube.com/embed/vGZ9Bmxgz8w?si=74w_t2jjXxm7Nf7q",
      },
      {
        id: 2,
        title: "what to do in seoul, south korea 🇰🇷 for FIRST-TIME visitors",
        url: "https://www.youtube.com/embed/Axu2vjhNBKk?si=nCfMV33fcTweJ0MH",
      },
      {
        id: 3,
        title: "7 days in seoul 🌸",
        url: "https://www.youtube.com/embed/xnZDGJPcWSM?si=Vu2YCIYUFu9MojR5",
      },
      {
        id: 4,
        title:
          "A week of my life in Korea | Autumn to Christmas in Seoul | Visiting cute cafes | KOREA VLOG",
        url: "https://www.youtube.com/embed/ckcE5JD2dT8?si=TZZLYWERlVjDWA1S",
      },
    ],
  },
  {
    id: 1,
    category: "K-Pop",
    youtube: [
      {
        id: 0,
        title: "Feel the Rhythm of KOREA: SEOUL",
        url: "https://www.youtube.com/embed/3P1CnWI62Ik?si=_aJXYMt7PhF2hrL_",
      },
      {
        id: 1,
        title: "🍇9 Kpop Stores In Seoul (2022 Ver.)",
        url: "https://www.youtube.com/embed/vQ4rNtOEiJ0?si=UkgYxtc_SSRZ_HPV",
      },
      {
        id: 2,
        title:
          "Visiting BTS places around Seoul 🇰🇷 Cafes, BT21 line friends store + filming locations!",
        url: "https://www.youtube.com/embed/pzQNQlS3Jto?si=SbzD6lLewC-z1SRC",
      },
    ],
  },
  {
    id: 2,
    category: "K-Food",
    youtube: [
      {
        id: 0,
        title: "MOST VISITED Street Food Spot in Seoul",
        url: "https://www.youtube.com/embed/ww3XgG3ISIA?si=NDOqJ_VzootRr06d",
      },
      {
        id: 1,
        title:
          "KOREAN STREET FOOD - Gwangjang Market Street Food Tour in Seoul South Korea | BEST Spicy Korean Food",
        url: "https://www.youtube.com/embed/cVZheE7mNR4?si=8XgBuFQ5y6vm7hEo",
      },
      {
        id: 2,
        title:
          "15 Incredible Must Eats in Seoul — Seoul Food Guide, South Korea | The Travel Intern",
        url: "https://www.youtube.com/embed/HWPy6r8iXiE?si=X4c_jIAXkY5GFmV7",
      },
      {
        id: 3,
        title:
          "BEST Korean Traditional Market for Street Food!? My New Favorite Spot in Seoul",
        url: "https://www.youtube.com/embed/7MmaZGiMCnI?si=kjNMyz7WDh9HXVkp",
      },
    ],
  },
  {
    id: 3,
    category: "K-Culture",
    youtube: [
      {
        id: 0,
        title: "22+ things to know before going to South Korea 🇰🇷",
        url: "https://www.youtube.com/embed/k2v3WDsDbrw?si=gNsUciLd-MY41egx",
      },
      {
        id: 1,
        title: "11 Things NOT to do in South Korea - MUST SEE BEFORE YOU GO!",
        url: "https://www.youtube.com/embed/ALW-To76E44?si=QYUSJoBlnCS_oAAy",
      },
    ],
  },
  {
    id: 4,
    category: "K-....",
    youtube: [],
  },
];
