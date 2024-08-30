import React, { useEffect, useState } from "react";
import { getAccountDetailsApi } from "../api/User";
import useAuthStore from "../Store";

const AdminProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const getAccountDetails = async (user, token) => {
      const response = await getAccountDetailsApi({
        userId: user.id,
        token: token,
      });

      if (response.status === 200) {
        setUserDetails(response.data);
      }
    };

    getAccountDetails(user, token);
  }, []);

  return (
    <div>
      <p>AdminProfilePage</p>
      <p>Admin Details: </p>
      <p>{userDetails?.id}</p>
      <p>{JSON.stringify(userDetails)}</p>
    </div>
  );
};

export default AdminProfilePage;
