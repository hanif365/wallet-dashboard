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

// Demo user for testing
export const demoUser = {
  email: 'demo@example.com',
  password: 'password123',
  name: 'Demo User'
}; 