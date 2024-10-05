import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCommentAlt,
  faNewspaper,
  faCalendar,
  faBell,
  faHandshake,
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./sideBar.css";
import { signin } from "../../service/signIn/signInService";
import { useNavigate } from "react-router-dom";
import { getUserByToken } from "../../service/userService";
import MenuCard from "./menuCard";

const SideBar = () => {
  const [userData, setUserData] = useState(null);
  const [welcomeGreet, setwelcomeGreet] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  const getGreeting = () => {
    const currentHour = new Date().getHours(); // Get the current hour
    let greeting;

    if (currentHour < 12) {
      greeting = "Good Morning";
    } else if (currentHour < 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }

    return greeting;
  };

  const following =
    userData && userData.length > 0 ? userData[0].following.length : 0;
  const followers =
    userData && userData.length > 0 ? userData[0].followers.length : 0;

  const user = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const data = await getUserByToken();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    const greeting = getGreeting();
    setwelcomeGreet(greeting);
    user();
  }, []);

  return (
    <div className="menuContainer">
      {loading ? (
        <div className="loading">Loading...</div> // Display this while loading
      ) : (
        <>
          <div className="menuTop">
            <div className="menuImg">
              {userData && <img src={userData[0].imageURL}></img>}
            </div>
            <div className="menuName">
              <span id="greeting">{welcomeGreet}</span>
              <br></br>
              {userData && (
                <>
                  <span id="uname">{userData[0].name}</span>
                </>
              )}
            </div>
          </div>
          <div className="stats">
            <div className="followingStat">
              <span id="followingCount">{following}</span>
              <br></br>
              <span id="followingTitle">Following</span>
            </div>
            <div className="followingStat">
              <span id="followingCount">{followers}</span>
              <br></br>
              <span id="followingTitle">Followers</span>
            </div>
            <div className="followingStat">
              <span id="followingCount">34</span>
              <br></br>
              <span id="followingTitle">Swaps</span>
            </div>
          </div>
          <div className="menuItems">
            <MenuCard
              icon={faNewspaper}
              title="Community"
              path={`/main/community/${userData[0]._id}`}
            />
            <MenuCard
              icon={faCommentAlt}
              title="Chats"
              path={`/main/chat/${userData[0]._id}`}
            />
            <MenuCard icon={faCalendar} title="Calender" />
            <MenuCard icon={faHandshake} title="Agreements" />
            <MenuCard icon={faBell} title="Notification" />
            <MenuCard icon={faUserCircle} title="User Profile" />
          </div>
          <div className="logOut">
            <MenuCard icon={faSignOutAlt} title="LogOut" />
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
