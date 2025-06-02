
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'leader' | 'member';
  department: string;
  departments?: string[]; // Para colaboradores que podem estar em múltiplos departamentos
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, role: 'admin' | 'leader' | 'member', department: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Simulação de autenticação - em produção, isso seria uma chamada à API
    if (email === 'admin@igreja.com' && password === 'senha123') {
      setUser({
        id: '1',
        name: 'Administrador',
        email: 'admin@igreja.com',
        role: 'admin',
        department: 'Geral'
      });
      return true;
    } else if (email === 'lider@igreja.com' && password === 'senha123') {
      setUser({
        id: '2',
        name: 'Pastor Vavá',
        email: 'lider@igreja.com',
        role: 'leader',
        department: 'Louvor'
      });
      return true;
    } else if (email === 'membro@igreja.com' && password === 'senha123') {
      setUser({
        id: '3',
        name: 'Maria Santos',
        email: 'membro@igreja.com',
        role: 'member',
        department: 'Louvor',
        departments: ['Louvor', 'Mídia']
      });
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string, role: 'admin' | 'leader' | 'member', department: string): boolean => {
    // Simulação de registro
    setUser({
      id: Date.now().toString(),
      name,
      email,
      role,
      department
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
