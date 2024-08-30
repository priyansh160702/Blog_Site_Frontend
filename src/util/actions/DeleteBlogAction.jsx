import { DELETE_BLOG_MUTATION } from "../Graphql";

const deleteBlogAction = async ({ request }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const authToken = localStorage.getItem("token");

  const formData = await request.formData();

  const blogId = parseInt(formData.get("blogId"));

  const response = await fetch(`${api_url}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      query: DELETE_BLOG_MUTATION,
      variables: { blogId },
    }),
  });

  const resData = await response.json();

  console.log(resData);

  return null;
};

export default deleteBlogAction;
