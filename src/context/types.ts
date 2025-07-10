export type User = {
  email: string;
  name: string;
};

export type AuthContextProps = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};