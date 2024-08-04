import { Link } from "react-router-dom";

const RecentPostsCard = ({ post }) => {
  return (
    <div className="group relative w-full h-[250px] border overflow-hidden border-teal-500 hover:border-2 transition-all rounded-lg sm:w-[300px]">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[150px] w-full object-cover group-hover:h-[100px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-2 flex flex-col gap-1">
        <p className="text-md font-semibold line-clamp-1">{post.title}</p>
        <span className="italic text-xs">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-150px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-1 rounded-md m-2"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default RecentPostsCard;
