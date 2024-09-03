import { GET_BLOGS, GET_USER } from "../Graphql";

const getData = async ({ request, params }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const authToken = localStorage.getItem("token");

  const blogResponse = await fetch(`${api_url}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_BLOGS,
    }),
  });

  const blogData = await blogResponse.json();

  const blogs = blogData.data.getBlogs;

  let user;

  if (authToken) {
    const userResponse = await fetch(`${api_url}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        query: GET_USER,
      }),
    });

    const userData = await userResponse.json();

    user = userData.data.getUser;
  }

  return { blogs, user };
};

export default getData;
