import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { setProfileData } from "@/core/store/user/profileData";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const refreshToken = useSelector((state) => state.authentication.refreshToken);
  const roleName = useSelector((state) => state.authentication.roleName);

  React.useEffect(() => {
    try {
      if (accessToken !== null) {
        localStorage.setItem(
          "tokens",
          JSON.stringify({
            accessToken: accessToken,
            refreshToken: refreshToken
          })
        );
        localStorage.setItem('roleName', roleName)

        const userData = jwtDecode(accessToken);
        dispatch(setProfileData(userData));
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      navigate("/login", { replace: true });
    }
  }, [accessToken]);
};

export default useAuth;
