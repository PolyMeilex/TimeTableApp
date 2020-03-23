export interface PlanJSON {
  name: string;
  generated: string;
  description: string;
  typeName: string;
  days: Day[];
}

export interface Day {
  name: string;
  hours: Period[];
}

export interface Period {
  start: Time;
  end: Time;
  lessons: Lesson[];
  splited: boolean;
}

export interface Lesson {
  teacher: Teacher;
  room: Room;
  className: Class;
  subject: string;
  grp: number | null;
  key: string;
}

export interface Teacher extends Data {}
export interface Room extends Data {}
export interface Class extends Data {}

export interface Data {
  name: string;
  value: number;
}

export interface Time {
  str: string;
  h: number;
  m: number;
}
