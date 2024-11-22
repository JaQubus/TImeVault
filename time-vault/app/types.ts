export type DefaultForm = {
  target: string | null;
  due: number;
};

// add more ypes
export type AppUser = {
  userId: string | null;
  email: string | null;
  username: string | null;
  canContinue: boolean | null;
};
