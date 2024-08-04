import { Sidebar } from "flowbite-react";
import { HiOutlineAnnotation, HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { HiOutlineUserGroup } from "react-icons/hi2";

export const DashSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            label={currentUser.isAdmin ? "Admin" : "User"}
            labelColor="dark"
            onClick={() => handleNavigation("/dashboard?tab=profile")}
            className="cursor-pointer"
          >
            Profile
          </Sidebar.Item>
          
          {currentUser.isAdmin && (
            <>
            <Sidebar.Item
            active={tab === "posts"}
            icon={HiDocumentText}
            onClick={() => handleNavigation("/dashboard?tab=posts")}
            className="cursor-pointer"
            >
              Posts
            </Sidebar.Item>
            <Sidebar.Item
            active={tab === "users"}
            icon={HiOutlineUserGroup}
            onClick={() => handleNavigation("/dashboard?tab=users")}
            className="cursor-pointer"
            >
              Users
            </Sidebar.Item>
            <Sidebar.Item
            active={tab === "comments"}
            icon={HiOutlineAnnotation}
            onClick={() => handleNavigation("/dashboard?tab=comments")}
            className="cursor-pointer"
            >
              Comments
            </Sidebar.Item>
            </>
          )}
          
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
