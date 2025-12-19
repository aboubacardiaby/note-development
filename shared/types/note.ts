export type MeetingType = 'development' | 'technical' | 'general' | 'doctor-patient';

export interface Note {
  id: string;
  title: string;
  content: string;
  meetingType: MeetingType;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNoteDTO {
  title: string;
  content: string;
  meetingType: MeetingType;
}

export interface UpdateNoteDTO {
  title?: string;
  content?: string;
  meetingType?: MeetingType;
}
