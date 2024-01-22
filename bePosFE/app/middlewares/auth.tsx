import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();
    const cookies = new Cookies();
    const token = cookies.get("idToken");

    useEffect(() => {
      if (!token) {
        router.push("/pages/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
