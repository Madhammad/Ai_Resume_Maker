import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="font-bold  text-4xl">
      <span className="px-2 py-1 border-2 ml-5 border-green-800 hover:border-green-600 rounded-lg text-xl dark:text-white text-slate-700">
        Ai Resume
      </span>
      <span className="text-green-800 text-xl">Maker</span>
    </Link>
  );
}
