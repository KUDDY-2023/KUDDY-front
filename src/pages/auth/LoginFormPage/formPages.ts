// form 여러개 - 따로 파일 빼서 관리하기 !
import TypeForm from "./forms/TypeForm";
import ProfileForm from "./forms/ProfileForm";
import BasicForm from "./forms/BasicForm";
import JobForm from "./forms/JobForm";
import PersonalityForm from "./forms/PersonalityForm";
import AreaForm from "./forms/AreaForm";
import NationalityForm from "./forms/NationalityForm";
import LanguageForm from "./forms/LanguageForm";
import InterestForm from "./forms/InterestForm";

export const TravelerFormPages = [
  { type: "", component: TypeForm },
  { type: "uniqueName", component: ProfileForm },
  { type: "abirthDatege", component: BasicForm },
  { type: "job", component: JobForm },
  { type: "", component: PersonalityForm },
  { type: "nationality", component: NationalityForm },
  { type: "language", component: LanguageForm },
  { type: "", component: InterestForm },
];

export const KuddyFormPages = [
  { type: "", component: TypeForm },
  { type: "uniqueName", component: ProfileForm },
  { type: "birthDate", component: BasicForm },
  { type: "job", component: JobForm },
  { type: "", component: PersonalityForm },
  { type: "region", component: AreaForm },
  { type: "language", component: LanguageForm },
  { type: "", component: InterestForm },
];
