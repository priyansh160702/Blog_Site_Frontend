import { useEffect, useState, useRef } from "react";
import { Form, useRouteLoaderData, useActionData } from "react-router-dom";
import { Avatar } from "flowbite-react";

const UserProfilePage = () => {
  const api_url = import.meta.env.VITE_API_URL;

  const [profilePhotoError, setProfilePhotoError] = useState(null);

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

  if (!user) {
    return;
  }

  return (
    <main className="container">
      <div className=" flex flex-col items-center space-y-10">
        <div className="flex flex-col space-y-7">
          <Avatar
            img={user.profilePhoto ? `${api_url}/${user.profilePhoto}` : null}
            rounded
            size="lg"
          />
          <Form method="post" encType="multipart/form-data" ref={formRef}>
            <div className="flex flex-col items-center justify-center ">
              <div>
                <input type="file" name="profilePhoto" className="ml-[8rem]" />
                {profilePhotoError && (
                  <p className="text-red-500 mt-1 text-center">
                    {profilePhotoError}
                  </p>
                )}
              </div>
              <button type="submit" className="btn-black mt-5">
                Upload
              </button>
            </div>
          </Form>
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
