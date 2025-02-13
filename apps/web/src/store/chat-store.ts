import { atom, useRecoilState } from "recoil";

interface User {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
}

// Atom for storing users
export const usersState = atom<User[]>({
  key: 'usersState',
  default: []
});

// Hook for managing users
export const useUsers = () => {
  const [users, setUsers] = useRecoilState(usersState);

  const addUser = (newUser: User) => {
    setUsers(prevUsers => {
      if (!prevUsers.find(user => user.id === newUser.id)) {
        return [...prevUsers, newUser];
      }
      return prevUsers;
    });
  };

  return {
    users,
    addUser,
  };
};
