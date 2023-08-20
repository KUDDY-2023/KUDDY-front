type MenuType = "itinerary-feedback" | "talking-board";

type CourseType = {
  id: number;
  name: string;
};

type PostType = {
  type: menuType;
  id: number;
  title: string;
  content: string;
  courses?: courseType[];
  date: string;
  comment: number;
};
