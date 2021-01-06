import React, { useContext } from 'react';

export const AuthContext = React.createContext({ loggedIn: false });

export const useAuth = () => useContext(AuthContext);
