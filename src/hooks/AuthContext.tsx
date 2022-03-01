import { createContext,ReactNode, useContext,useState, useEffect } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';


interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
    isVerified: boolean;
}

interface LoginData{
    email: string;
    password: string;
}

interface IAuthContextData{
    user: User;
    createUserWithEmailAndPassword({email, password} : LoginData) : Promise<FirebaseAuthTypes.UserCredential>
    forgotPassword({email}:LoginData) : Promise<void>;
    signOut(): Promise<void>;
    signIn({email,password}:LoginData): Promise<FirebaseAuthTypes.UserCredential>;
}

const AuthContext = createContext({} as IAuthContextData);


function AuthProvider({children}: AuthProviderProps){
     // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState({});
    const [userApp, setUserApp] = useState<User>({} as User);
    
    // Handle user state changes
    function onAuthStateChanged(user) {      
        setUser(user);
        if(user){
            setUserApp({
                id: user.uid,
                email: user.email,
                isVerified: user.emailVerified,
                name: user.displayName
            });
        }else{
            setUserApp(null);
        }
       
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
    if (initializing) return null;

    async function createUserWithEmailAndPassword({email, password} : LoginData): Promise<FirebaseAuthTypes.UserCredential>
    {
        const result = await auth().createUserWithEmailAndPassword(email,password).catch(error => {
            throw error;
        });         
        return result;
    }
    
    async function forgotPassword({email}: LoginData){        
        return await auth().sendPasswordResetEmail(email).catch(error => {
            throw error;
        });
    }

    async function signIn({email,password}:LoginData){
        return await auth().signInWithEmailAndPassword(email,password).catch(error => {
            throw error;
        })
    }
    async function signOut(){
        return await auth().signOut().catch(error => {
            throw error;
        });
    }

    return (
        <AuthContext.Provider value={{
            user: userApp,
            createUserWithEmailAndPassword,
            signIn,
            forgotPassword,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth}