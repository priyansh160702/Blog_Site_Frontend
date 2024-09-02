import { DELETE_BLOG_MUTATION, EDIT_BLOG_MUTATION } from "../Graphql";

const blogAction = async ({ request }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const authToken = localStorage.getItem("token");

  const formData = await request.formData();

  const title = formData.get("title")?.trim();
  const subTitle = formData.get("subTitle")?.trim();
  const category = formData.get("category")?.trim();
  const content = formData.get("content")?.trim();
  const blogImage = formData.get("blogImage");
  const blogId = parseInt(formData.get("blogId"));
  const intent = formData.get("intent");

  const isEdit = intent === "edit";

  let errors = {};

  if (isEdit && content.length < 10) {
    errors.content = "Content must be 10 characters long!";
  }

  const allowedCategories = [
    "Technology",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
  ];

  if (isEdit && !allowedCategories.includes(category)) {
    errors.category = "Not a valid category!";
  }

  if (isEdit && blogImage.size > 0) {
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
    const imageSizeInMb = blogImage.size / (1024 * 1024);

    if (!allowedMimeTypes.includes(blogImage.type)) {
      errors.blogImage = "Image must only be in jpeg/jpg/png!";
    } else if (imageSizeInMb > 5) {
      errors.blogImage = "Image size must not be greater than 5 MB!";
    }
  }

  if (Object.keys(errors).length > 0) {
    console.log(errors);

    return { errors, success: false };
  }

  const editBlogData = {
    title,
    subTitle,
    category,
    content,
  };

  const variables = {
    blogId,
  };

  if (isEdit) {
    variables.editBlogData = editBlogData;
  }

  const response = await fetch(`${api_url}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      query: isEdit ? EDIT_BLOG_MUTATION : DELETE_BLOG_MUTATION,
      variables,
    }),
  });

  const resData = await response.json();

  // Sending BLog Image
  let imageResponse;
  if (blogImage?.size > 0) {
    const blogId = resData.data.editBlog.id;
    const imageData = new FormData();
    imageData.append("blogId", blogId);
    imageData.append("image", blogImage);

    imageResponse = await fetch(`${api_url}/upload/blog`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: imageData,
    });
  }

  if (response.ok || imageResponse.ok) {
    return { success: true };
  } else {
    return {
      success: false,
      errors: resData.errors,
    };
  }
};

export default blogAction;
