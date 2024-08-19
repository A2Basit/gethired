import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut(); 

const passwordReset= (email) => {
  supabase.auth.resetPasswordForEmail(email,{
    redirectTo: 'https://localhost:5173/update-password'
  })
} 

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession(({data: {session}})=>{
      setUser(session?.user ?? null);
      setAuth(!!session);
      setLoading(false);
    }
  )

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      }
      else if(event === "SIGNED_OUT"){
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, auth,loading ,login, signOut,passwordReset }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
