import { useState } from 'react';
import "../../style.css";
import Navbar from "../navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";
import SearchFilter from "../searchFilter/SearchFilter.jsx";
import TableDataList from "../tableDataList/TableDataList.jsx";

export default function Manage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grow mx-16 my-10">
        <div className="flex mt-15">
          <div className="self-center">
            <SearchFilter searchQuery={searchQuery} onSearchChange={handleSearchChange} />
          </div>
        </div>
        <div className="flex-col mt-10">
          <TableDataList showManage={false} searchQuery={searchQuery} />
        </div>
      </div>
      <Footer />
    </div>
  );
}