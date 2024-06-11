import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const INITIAL_POSTS = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    writeup: "This is a sample post description by John Doe.",
    image: "https://via.placeholder.com/150",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    writeup: "This is a sample post description by Jane Smith.",
    image: "https://via.placeholder.com/150",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    writeup: "This is a sample post description by Alice Johnson.",
    image: "https://via.placeholder.com/150",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Brown",
    writeup: "This is a sample post description by Bob Brown.",
    image: "https://via.placeholder.com/150",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    firstName: "Charlie",
    lastName: "Davis",
    writeup: "This is a sample post description by Charlie Davis.",
    image: "https://via.placeholder.com/150",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 6,
    firstName: "Eve",
    lastName: "Martinez",
    writeup: "This is a sample post description by Eve Martinez.",
    image: "https://via.placeholder.com/150",
    avatar: "https://via.placeholder.com/50",
  },
];

const Posts = () => {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch("https://codebuddy.review/posts");
  //       const result = await response.json();
  //       setPosts(result);
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);
  return (
    <div className="mx-5 rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="rounded-lg bg-white p-4 shadow-md">
            <div className="mb-4 flex items-center">
              <img
                src={post.avatar}
                alt={`${post.firstName} ${post.lastName}`}
                className="mr-4 h-10 w-10 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {post.firstName} {post.lastName}
                </h2>
              </div>
            </div>
            <img src={post.image} alt="Post" className="mb-4 h-36 w-full rounded-md object-cover" />
            <p>{post.writeup}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
