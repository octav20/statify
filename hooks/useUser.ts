// import { useSession } from "next-auth/react";

// const useUser = () => {
//   const { data: session } = useSession();

//   if (session) {
//     // @ts-ignore
//     return session.accessToken;
//   }
// };

// export default useUser;
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const useUser = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session) {
      // @ts-ignore
      setUser(session.accessToken);
    } else {
      setUser(null);
    }
  }, [session]);

  return user;
};

export default useUser;
