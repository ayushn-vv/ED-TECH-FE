import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600">403 - Unauthorized</h1>
      <p className="mt-2 text-gray-600">
        You do not have permission to access this page.
      </p>

      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-primary text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;
