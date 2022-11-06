import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../state/user";
const PersistProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let grabProfile = (token) => {
    fetch("http://127.0.0.1:3000/profile", {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
            "super-token": token
        },
      })
        .then(res => res.json())
        .then(data => {
            if (data["error"]) {
                dispatch(clearUser());
              } else {
                dispatch(setUser(data));
              }
        });
    
  };



  useEffect(() => {
    let token = localStorage.getItem("token");
    // if a super token exists and user is logged out
    if (token && !user.isAuthenticated) {
      grabProfile(token);
    }
  }, []);
  return <></>;
};
export default PersistProfile;
