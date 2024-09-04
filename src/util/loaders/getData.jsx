import { defer } from "react-router-dom";

import { GET_BLOGS, GET_USER } from "../Graphql";

const getData = async ({ request, params }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const authToken = localStorage.getItem("token");

  const blogsPromise = fetch(`${api_url}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_BLOGS,
    }),
  })
    .then((response) => response.json())
    .then((data) => data.data.getBlogs);

  let user = null;

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

  return defer({ blogs: blogsPromise, user });
};

export default getData;
