import "../../style.css";
import "./searchFilter.css";

export default function SearchFilter(props) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex search-box">
        <input
          type="text"
          className="px-6 py-3.5 w-80 rounded-full search-font"
          placeholder="Search Name"
          value={props.searchQuery}
          onChange={props.onSearchChange}
        />
        <button className="flex items-center justify-center px-4">
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
