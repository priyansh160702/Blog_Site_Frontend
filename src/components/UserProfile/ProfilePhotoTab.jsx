import { forwardRef } from "react";
import { Form } from "react-router-dom";
import { Avatar } from "flowbite-react";

const ProfilePhotoTab = forwardRef(({ user, profilePhotoError }, formRef) => {
  const api_url = import.meta.env.VITE_API_URL;

  return (
    <div className="flex flex-col space-y-7">
      <Avatar
        img={user.profilePhoto ? `${api_url}/${user.profilePhoto}` : null}
        rounded
        size="lg"
      />
      <Form method="post" encType="multipart/form-data" ref={formRef}>
        <div className="flex flex-col items-center justify-center ">
          <div>
            <input
              type="file"
              name="profilePhoto"
              className="ml-[8rem] cursor-pointer"
            />
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
  );
});

export default ProfilePhotoTab;
