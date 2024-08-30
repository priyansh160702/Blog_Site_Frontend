const profilePhotoAction = async ({ request }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const authToken = localStorage.getItem("token");

  const formData = await request.formData();

  const profilePhoto = formData.get("profilePhoto");

  let errors = {};

  if (profilePhoto.size === 0) {
    errors.profilePhoto = "No file chosen!";
  }

  if (profilePhoto.size > 0) {
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
    const imageSizeInMb = profilePhoto.size / (1024 * 1024);

    if (!allowedMimeTypes.includes(profilePhoto.type)) {
      errors.profilePhoto = "Image must only be in jpeg/jpg/png!";
    } else if (imageSizeInMb > 5) {
      errors.profilePhoto = "Image size must not be greater than 5 MB!";
    }
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const profilePhotoData = new FormData();

  profilePhotoData.append("image", profilePhoto);

  await fetch(`${api_url}/upload/user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: profilePhotoData,
  });

  return null;
};

export default profilePhotoAction;
