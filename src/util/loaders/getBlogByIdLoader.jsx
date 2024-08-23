import { GET_BLOG_BY_ID } from "../Graphql";

const getBlogByIdLoader = async ({ request, params }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const blogId = +params.blogId;

  const response = await fetch(`${api_url}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_BLOG_BY_ID,
      variables: { blogId },
    }),
  });

  const resData = await response.json();

  const blogData = resData.data.getBlogById;

  return blogData;
};

export default getBlogByIdLoader;
