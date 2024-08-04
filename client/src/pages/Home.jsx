import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import RecentPostsCard from "../components/RecentPostsCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/get-posts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col gap-6 p-6 sm:p-12 lg:p-24 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl xl:text-6xl">
          Welcome to my blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg">
          Discover a world of insightful articles, inspiring stories, and
          practical advice at Seven's Blog. Our blog is dedicated to bringing
          you the latest in Web Development, Software Development, Cloud
          Computing, and DevOps, with content crafted to inform, entertain, and
          engage.
        </p>
        <Link
          to="/search"
          className="text-teal-500 font-bold text-sm sm:text-base hover:underline"
        >
          View all posts
        </Link>
      </div>

      <div className="p-6 max-w-5xl mx-auto sm:p-8 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="max-w-7xl mx-auto p-6 sm:p-12">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center sm:text-3xl lg:text-4xl">
              Recent Posts
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <RecentPostsCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 hover:underline block text-center mt-6"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
