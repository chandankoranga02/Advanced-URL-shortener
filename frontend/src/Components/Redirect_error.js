import { useNavigate } from "react-router-dom";

export default function Redirect_error ({ type = "not_found" }) {
  const navigate = useNavigate();

  const errorConfig = {
    expired: {
      title: "Link Expired",
      message: "This link is no longer valid. It may have expired.",
    },
    not_found: {
      title: "Link Not Found",
      message: "The link you are looking for does not exist.",
    },
    wrong_password: {
      title: "Wrong Password",
      message: "The password you entered is incorrect.",
    },
  };

  const { title, message } = errorConfig[type];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-lg text-center w-[350px]">
        
        <h1 className="text-red-500 text-2xl font-bold mb-3">
          {title}
        </h1>

        <p className="text-gray-400 mb-6">
          {message}
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-white text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}