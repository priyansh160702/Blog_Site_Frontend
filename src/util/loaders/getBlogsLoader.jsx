import { GET_BLOGS } from "../Graphql";

const getBlogsLoader = async ({ request, params }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const response = await fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_BLOGS,
    }),
  });

  const resData = await response.json();

  console.log(resData);

  return null;
};

export default getBlogsLoader;
