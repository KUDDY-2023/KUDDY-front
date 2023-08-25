interface MeetUpInfoType {
  partnerName: string;
  place: string;
  placeId: number;
  date: string;
  pay: number;
}

interface ConfirmedMeetUpInfoType extends MeetUpInfoType {
  meetStatus: number;
}
