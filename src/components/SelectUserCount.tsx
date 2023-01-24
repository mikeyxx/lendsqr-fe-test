import { useContext, useEffect, useRef } from "react";
import filter from "../assets/filter.svg";
import more from "../assets/more.svg";
import { Users } from "./UserData";
import view from "../assets/view.svg";
import karma from "../assets/user-times.svg";
import activate from "../assets/activate.svg";
import UserModel from "./UserModel";

interface Props {
  currentUsers: Users[];
  open: boolean;
  handleUserMenu: (e: React.MouseEvent<Element, MouseEvent>) => void;
  targetId: string;
  leftPosition: number;
  topPosition: number;
  setDrop: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterTop: React.Dispatch<React.SetStateAction<number>>;
  setFilterLeft: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const SelectUserCount = ({
  currentUsers,
  open,
  handleUserMenu,
  targetId,
  leftPosition,
  topPosition,
  setDrop,
  setFilterTop,
  setFilterLeft,
  currentPage,
}: Props) => {
  const imgRef = useRef<NodeList | null>(null);

  useEffect(() => {
    setTimeout(() => {
      imgRef.current = document.querySelectorAll(".filter") as NodeList;
      imgRef.current?.forEach((img) =>
        img.addEventListener("click", handleFilterIconPress)
      );
    }, 2500);

    return () => {
      imgRef.current?.forEach((img) =>
        img.removeEventListener("click", handleFilterIconPress)
      );
    };
  }, [currentPage]);

  function handleFilterIconPress(e: any) {
    setDrop(true);
    setFilterLeft(e.pageX);
    setFilterTop(e.pageY);
  }

  return (
    <>
      {currentUsers.map((user) => (
        <div key={user.id} className="user-overview-wrapper">
          <div className="wrap">
            <div className="inner">
              <h4>Organization</h4>
              <img src={filter} alt="" className="filter" />
            </div>
            <span>{user.orgName}</span>
          </div>

          <div className="wrap">
            <div className="inner">
              <h4>Username</h4>

              <img src={filter} alt="" className="filter" />
            </div>
            <span>{user.userName}</span>
          </div>

          <div className="wrap">
            <div className="inner">
              <h4>Email</h4>

              <img src={filter} alt="" className="filter" />
            </div>
            <span>{user.email}</span>
          </div>

          <div className="wrap">
            <div className="inner">
              <h4>Phone Number</h4>

              <img src={filter} alt="" className="filter" />
            </div>
            <span>{user.phoneNumber}</span>
          </div>

          <div className="wrap">
            <div className="inner">
              <h4>Date Joined</h4>

              <img src={filter} alt="" className="filter" />
            </div>
            <span>{user.createdAt}</span>
          </div>
          <div className="wrap">
            <div className="inner">
              <h4>Status</h4>

              <img src={filter} alt="" className="filter" />
            </div>
            <span>Inactive</span>
          </div>
          <div className="dashDots">
            <div className="menu-trigger">
              <img
                src={more}
                alt=""
                id={user.id}
                onClick={(event) => handleUserMenu(event)}
              />
            </div>
          </div>
        </div>
      ))}

      {open && (
        <UserModel
          targetId={targetId}
          view={view}
          karma={karma}
          activate={activate}
          topPosition={topPosition}
          leftPosition={leftPosition}
        />
      )}
    </>
  );
};

export default SelectUserCount;
