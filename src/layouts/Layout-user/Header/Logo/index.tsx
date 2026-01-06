import { Link } from "react-router-dom";
// import { getImagePrefix } from "../../../../utils/util";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <h2 className="text-4xl font-bold text-black flex items-center gap-2">
        ED-TECH
      </h2>
    </Link>
  );
};

export default Logo;
