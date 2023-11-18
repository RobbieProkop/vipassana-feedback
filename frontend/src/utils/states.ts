export interface DateState {
  startDate: string;
  endDate: string;
}
export interface Feedback {
  additional_info: null | string;
  course_start_date: string;
  days_served: number;
  email: null | string;
  id: number;
  name: null | string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5_1: number;
  q5_2: number;
  q5_3: number;
  q5_4: number;
  submitted_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}
