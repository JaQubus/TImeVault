export type CustomFormField = {
  title: string | null;
  due: Date | null;
  caption?: string | null;
  image?: string | null;
};

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
  customformFields: CustomFormField[] | null;
};
