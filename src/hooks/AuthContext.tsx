import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';


interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextDATA {
    user: object;
    loading: boolean;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextDATA>({} as AuthContextDATA);

export const AuthProvider: React.FC = ({ children }) => {
    const [ data, setData ] = useState<AuthState>({} as AuthState);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function loadStorageData(): Promise<void>{
            const [token, user] = await AsyncStorage.multiGet([
                '@GoBarber:token',
                '@GoBarber:user'
            ]);
        
            if (token[1] && user[1]){
                setData({ token: token[1], user: JSON.parse(user[1]), })

            }

            setLoading(false);
        }
        
        loadStorageData();
    },[]);

    const signIn = useCallback( async ({email, password})=>{
        const response = await api.post('sessions', {
            email,
            password,
        });
        
        const { token, user } = response.data;
        await AsyncStorage.multiSet([
            ['@GoBarber:token', token],
            ['@GoBarber:user', JSON.stringify(user) ]
        ])

        setData({token, user})
    },[])
    
    const signOut = useCallback(async()=>{
        await AsyncStorage.multiRemove([
            '@GoBarber:token',
            '@GoBarber:user'    
        ]);

        
        setData({} as AuthState)
        
    },[])


    return (
        <AuthContext.Provider value={{user: data.user, signIn, loading,  signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextDATA {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { useAuth }