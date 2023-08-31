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
  TypeForm,
  ProfileForm,
  BasicForm,
  JobForm,
  PersonalityForm,
  NationalityForm,
  LanguageForm,
  InterestForm,
];

export const KuddyFormPages = [
  TypeForm,
  ProfileForm,
  BasicForm,
  JobForm,
  PersonalityForm,
  AreaForm,
  LanguageForm,
  InterestForm,
];
