import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { useRouteLoaderData, useActionData } from "react-router-dom";

import UserInfoTab from "../components/UserProfile/UserInfoTab";
const ProfilePhotoTab = lazy(() =>
  import("../components/UserProfile/ProfilePhotoTab")
);
import LoadingSpinner from "../components/LoadingSpinner";

const UserProfilePage = () => {
  const [profilePhotoError, setProfilePhotoError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const formRef = useRef();

  const { user } = useRouteLoaderData("root");

  const errors = useActionData();

  useEffect(() => {
    if (errors) {
      setProfilePhotoError(errors.profilePhoto);

      const timeout = setTimeout(() => {
        setProfilePhotoError(null);
      }, 5000);

      return () => clearTimeout(timeout);
    } else if (formRef.current) {
      formRef.current.reset();
    }
  }, [errors]);

  const tabContent = [
    {
      title: "Profile Settings",
      component: <UserInfoTab user={user} />,
    },
    {
      title: "Profile Picture",
      component: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProfilePhotoTab user={user} profilePhotoError={profilePhotoError} />
        </Suspense>
      ),
    },
  ];

  const tabClickHandler = (index) => {
    setActiveTab(index);
  };

  if (!user) {
    return;
  }

  return (
    <main className="container">
      <h1 className="mb-4 font-semibold text-3xl">Account Settings</h1>
      <div className="flex space-x-7 text-lg mb-3">
        {tabContent.map((tab, index) => (
          <button
            key={index}
            className={`tab-btn ${index === activeTab ? "active-tab" : ""}`}
            onClick={() => tabClickHandler(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div>{tabContent[activeTab].component}</div>
    </main>
  );
};

export default UserProfilePage;
