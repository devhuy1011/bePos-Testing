import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

const withAuthAdmin = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();
    const cookies = new Cookies();
    const token = cookies.get("idToken");

    useEffect(() => {
      const storedDataString: string | null = localStorage.getItem("userData");

      if (!token) {
        router.push("/pages/login");
      }
      if (storedDataString && token) {
        const userStorageData = JSON.parse(storedDataString);
        if (userStorageData.role !== "ADMIN") {
          router.push("/pages/login");
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuthAdmin;
