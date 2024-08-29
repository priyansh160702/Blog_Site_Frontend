import { redirect } from "react-router-dom";
import { CREATE_BLOG_MUTATION } from "../Graphql";

const createBlogAction = async ({ request, params }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const authToken = localStorage.getItem("token");

  const formData = await request.formData();

  const title = formData.get("title").trim();
  const subTitle = formData.get("subTitle").trim();
  const category = formData.get("category").trim();
  const content = formData.get("content").trim();
  const blogImage = formData.get("blogImage");

  const requiredErrorString = "This field is required!";

  let errors = {};

  if (title.length === 0) {
    errors.title = requiredErrorString;
  }

  if (content.length === 0) {
    errors.content = requiredErrorString;
  } else if (content.length < 10) {
    errors.content = "Content must be 10 characters long!";
  }

  const allowedCategories = [
    "Technology",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
  ];

  if (category.length === 0) {
    errors.category = requiredErrorString;
  } else if (!allowedCategories.includes(category)) {
    errors.category = "Not a valid category!";
  }

  if (blogImage.size > 0) {
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

  const blogData = {
    title,
    subTitle,
    category,
    content,
  };

  const blogDataResponse = await fetch(`${api_url}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      query: CREATE_BLOG_MUTATION,
      variables: { blogData },
    }),
  });

  const createdBlog = await blogDataResponse.json();

  // Sending BLog Image
  if (blogImage.size > 0) {
    const blogId = createdBlog.data.createBlog.id;
    const imageData = new FormData();
    imageData.append("blogId", blogId);
    imageData.append("image", blogImage);

    await fetch(`${api_url}/upload/blog`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: imageData,
    });
  }

  return { success: true };
};

export default createBlogAction;
