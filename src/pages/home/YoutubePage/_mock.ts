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
        title: "",
        url: "https://www.youtube.com/embed/G0YIZnbdO5g?si=AsNh5BfSYOr_8h0h",
      },
      {
        id: 3,
        title: "what to do in seoul, south korea 🇰🇷 for FIRST-TIME visitors",
        url: "https://www.youtube.com/embed/Axu2vjhNBKk?si=nCfMV33fcTweJ0MH",
      },
      {
        id: 4,
        title: "7 days in seoul 🌸",
        url: "https://www.youtube.com/embed/xnZDGJPcWSM?si=Vu2YCIYUFu9MojR5",
      },
      {
        id: 5,
        title:
          "A week of my life in Korea | Autumn to Christmas in Seoul | Visiting cute cafes | KOREA VLOG",
        url: "https://www.youtube.com/embed/ckcE5JD2dT8?si=TZZLYWERlVjDWA1S",
      },
      {
        id: 6,
        title:
          "30 Things to Do and Know about Seoul - South Korea Travel Guide",
        url: "https://www.youtube.com/embed/paUZs41-pvY?si=Y8AyKhsKAQBfTYA1",
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
          "서울 명동 랜덤플레이댄스 KPOP RANDOM PLAY DANCE in Seoul, KOREA 2023",
        url: "https://www.youtube.com/embed/2QJo5peFVfw?si=acNI9vGtFnxPsYpw",
      },
      {
        id: 3,
        title:
          "Visiting BTS places around Seoul 🇰🇷 Cafes, BT21 line friends store + filming locations!",
        url: "https://www.youtube.com/embed/pzQNQlS3Jto?si=SbzD6lLewC-z1SRC",
      },
      {
        id: 4,
        title: "NCT 127 NEO CITY: SEOUL THE LINK+ Concert Vlog/Reaction!!",
        url: "https://www.youtube.com/embed/24_sGHD2_Vc?si=STlNpYyLG0gRldvy",
      },
      {
        id: 5,
        title:
          "🇰🇷 seoul vlog | nct dream exhibition ‘dream vibe’, smtown &store, myeongdong kpop shops",
        url: "https://www.youtube.com/embed/FbZKtJKDPBc?si=91qU9XZM8GCCxzUl",
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
      {
        id: 4,
        title: "Italian Chef tries REAL Korean food for the First Time?!",
        url: "https://www.youtube.com/embed/E87QeRn0x9s?si=lPfsZ5RJCDbghDut",
      },
      {
        id: 5,
        title: "British Highschoolers try REAL Korean Street Toast in Korea!",
        url: "https://www.youtube.com/embed/knBTg3UYHdo?si=ONmElx8IUh6xnhl7",
      },
      {
        id: 6,
        title:
          "Traditional Korean Street Food Tour at Gwangjang Market in Seoul!",
        url: "https://www.youtube.com/embed/ljf8yxDQ1d0?si=d5LLu5qbh3-Jtfhy",
      },
      {
        id: 7,
        title:
          "a cool girl's guide to GWANGJANG MARKET! best street food in Seoul 🇰🇷",
        url: "https://www.youtube.com/embed/D7oInFgaeR0?si=_jPlzW_JSn1SZHOk",
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
      {
        id: 2,
        title: "KOREA FIRST IMPRESSIONS🇰🇷",
        url: "https://www.youtube.com/embed/5kTIx6un_3c?si=rtgv2TM6seoklw4w",
      },
      {
        id: 3,
        title: "The HIGHEST bar in the World!? (123rd Floor View of Seoul😮)",
        url: "https://www.youtube.com/embed/m1OWWD4Eiug?si=RfbCBMrX9dYE23qd",
      },
      {
        id: 4,
        title:
          "We cant believe we are in KOREA 🇰🇷 | First Impressions of SEOUL, KOREA (This place is CRAZY)",
        url: "https://www.youtube.com/embed/ECnvIxl655I?si=jY3Di_t-eDsE3o67",
      },
    ],
  },
  {
    id: 4,
    category: "K-Beauty",
    youtube: [
      {
        id: 0,
        title: "I Got a K-Beauty Makeover in Korea",
        url: "https://www.youtube.com/embed/tiqkmB-tH_Y?si=L1iyKKMia6eEXRdE",
      },
      {
        id: 1,
        title:
          "Korea Travel Vlog | cafe-hopping in Seoul, 10-step skincare treatment, & hair salon",
        url: "https://www.youtube.com/embed/28dUuwuaOvo?si=y8pYqVgd832Mv7r_",
      },
      {
        id: 2,
        title: "Celebrity Makeup Artist Gives Me a K-Drama Makeover",
        url: "https://www.youtube.com/embed/2kR3VTchawM?si=wUmzI5rEyQ_0TZ9z",
      },
      {
        id: 3,
        title:
          "K-Beauty Shopping at Olive Young! Shop With Me in Korea *korean beauty recommendations*",
        url: "https://www.youtube.com/embed/ihkw-kz1Rjs?si=st1mP81sFEaOAQnE",
      },
      {
        id: 4,
        title:
          "KOREA VLOG: flight, glow up appointments, exploring seoul, shopping, + cute skincare/makeup haul",
        url: "https://www.youtube.com/embed/KUDu6vacbZg?si=adEJzTjYeghmJz1m",
      },
      {
        id: 5,
        title:
          "shopping in korea vlog 🌷 makeup & skincare haul, best selling items in summer! Oliveyoung",
        url: "https://www.youtube.com/embed/FnOQ49-uXkg?si=-SrMzaH-38zkPoVi",
      },
      {
        id: 6,
        title:
          "shopping in Korea vlog 🇰🇷 skincare & makeuphaul at oliveyoung 💕 how to get lots of free samples!",
        url: "https://www.youtube.com/embed/BT3_pKu6ljo?si=VIo0i0Ysii8VqX7U",
      },
      {
        id: 7,
        title:
          "ENG SUB✨clean girl makeup 데일리 울먹 메이크업 •아이유 잔머리펌+셀프 눈썹 리프팅 •가닥속눈썹l 인스타 셀카 메이크업 ㅣ korean makeup",
        url: "https://www.youtube.com/embed/EBm6TXyrspg?si=cZ09RKDASQDrMphm",
      },
    ],
  },
];
