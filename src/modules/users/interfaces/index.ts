export interface IUsers {
  email: string;
  password: string;
}

export interface IBasicProfile {
  userId: string;
  firstName: string;
  lastName: string;
  companyName: string;
}
export interface IUpdateProfile {
  firstName: string;
  lastName: string;
  telephone: string;
  companyName: string;
  industry: string;
}
export interface Iotp {
  user_id: string;
  code: number;
}

