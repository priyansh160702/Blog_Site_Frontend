import { useRouteLoaderData } from "react-router-dom";
import { Avatar } from "flowbite-react";

const UserProfilePage = () => {
  const { user } = useRouteLoaderData("root");

  return (
    <main className="container">
      <div className=" flex flex-col items-center space-y-10">
        <div className="flex flex-col space-y-7">
          <Avatar img={user.profilePhoto} rounded size="lg" />
          <form encType="multipart/form-data" className="ml-[8rem]">
            <input type="file" name="profilePhoto" />
          </form>
        </div>
        <div className="space-y-2">
          <h1>
            <span className="font-bold">Name:</span> {user.name}
          </h1>
          <h1>
            <span className="font-bold">Email:</span> {user.email}
          </h1>
        </div>
      </div>
    </main>
  );
};

export default UserProfilePage;
