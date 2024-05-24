import { useLocation } from "react-router-dom";
import "./Profile.css";
export const Profile = () => {
  const location = useLocation();
  const data = location.state.data;
  return (
    <div className="profile-box">
      <div className="profile-headings">
        <div className="flex" style={{ fontSize: "5vh" }}>
          My Profile
        </div>
      </div>

      <div className="profile-headings">
        <div className="p-heading">Name:-</div>
        <div className="p-heading val">
          {data.userName.charAt(0) + data.userName.slice(1).toLowerCase()}
        </div>
      </div>
      {data.userId && (
        <div className="profile-headings">
          <div className="p-heading">UserId:-</div>
          <div className="p-heading val">{data.userId}</div>
        </div>
      )}
      {data.Tid && (
        <div className="profile-headings">
          <div className="p-heading">TeacherId:</div>
          <div className="p-heading val">{data.Tid}</div>
        </div>
      )}
      {data.branch && (
        <div className="profile-headings">
          <div className="p-heading">Branch:-</div>
          <div className="p-heading val">
            {data.branch.charAt(0) + data.branch.slice(1).toLowerCase()}
          </div>
        </div>
      )}
      {data.semester && (
        <div className="profile-headings">
          <div className="p-heading">Semester:-</div>
          <div className="p-heading val">{data.semester}</div>
        </div>
      )}
      {data.year && (
        <div className="profile-headings">
          <div className="p-heading">Year:-</div>
          <div className="p-heading val">{data.year}</div>
        </div>
      )}
      {data.dept && (
        <div className="profile-headings">
          <div className="p-heading">Department:-</div>
          <div className="p-heading val">{data.dept}</div>
        </div>
      )}
    </div>
  );
};
