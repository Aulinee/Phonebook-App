import { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import "./tableDataList.css";
import "../../style.css";
import ReadOnlyRow from "../row/ReadOnlyRow";
import EditableRow from "../row/EditableRow";
import TablePagination from '../tablePagination/TablePagination';
import AddIcon from '../../assets/icon/addContactIcon.png';
import Swal from 'sweetalert2';

Modal.setAppElement('#root');

export default function TableDataList(props) {
    const [listOfPhoneBook, setListOfPhoneBook] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [editFormData, setEditFormData] = useState({
        id: "",
        phoneName: "",
        phoneNumber: ""
    });
    const [editPhoneBookId, setEditPhoneBookId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        fetchPhoneBooks();
    }, [currentPage, props.searchQuery]); // Include currentPage and searchQuery as dependencies

    const showNotification = (icon, title, message) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: message,
        });
    };

    const fetchPhoneBooks = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/phonebooks/?page=${currentPage}&limit=${itemsPerPage}&search=${props.searchQuery}`);
            const data = await response.json();
            setListOfPhoneBook(data.items);
            setTotalItems(data.totalItems);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.log(err);
        }
    };    

    const addPhoneBooks = async (data) => {
        // Check if the phoneName and phoneNumber already exists in the list
        const existingEntry = listOfPhoneBook.find(
            (item) => item.phoneName === data.phoneName && item.phoneNumber === data.phoneNumber
        );

        if (existingEntry) {
            showNotification('error', 'Error!', 'Phone name and phone number already exists.');
            return;
        }
        try {
            await fetch("http://127.0.0.1:8000/api/phonebooks/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            fetchPhoneBooks();  // refresh the list
            setIsModalOpen(false); // Close modal after adding phone book
            reset(); // Clear form fields
            showNotification('success', 'Success!', 'Phone book added successfully!');
        } catch (err) {
            console.log(err);
        }
    };
    const editPhoneBooks = async (formData, id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/phonebooks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update phone book');
            }
    
            const updatedData = await response.json();
            const updatedPhoneBook = listOfPhoneBook.map(item =>
                item.id === id
                    ? updatedData
                    : item
            );
            setListOfPhoneBook(updatedPhoneBook);
            setEditPhoneBookId(null);
            showNotification('success', 'Success!', 'Your phone book entry has been edited.');
        } catch (error) {
            console.error(error);
        }
    };

    const deletePhoneBooks = async (item) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/phonebooks/${item.id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete phone book');
            }
    
            // Update the local state to remove the deleted item
            const updatedPhoneBookList = listOfPhoneBook.filter(phoneBook => phoneBook.id !== item.id);
            setListOfPhoneBook(updatedPhoneBookList);
    
            // Check if we need to update the page (e.g., if the page becomes empty)
            if (updatedPhoneBookList.length === 0 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchPhoneBooks();  // Fetch data again to refresh the table and pagination
            }
    
            showNotification('success', 'Deleted!', 'Your phone book entry has been deleted.');
        } catch (error) {
            console.error(error);
        }
    };    

    const handleEditClick = (phoneBook) => {
        setEditPhoneBookId(phoneBook.id);
        setEditFormData({
            id: phoneBook.id,
            phoneName: phoneBook.phoneName,
            phoneNumber: phoneBook.phoneNumber
        });
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setEditFormData({
            ...editFormData,
            [fieldName]: fieldValue
        });
    };

    const handleCancelClick = () => {
        setEditPhoneBookId(null);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <table className="w-full">
                <thead className="bg-gray-100 text-left text-sm font-semibold">
                    <tr>
                        <th className="px-6 py-3 hidden">ID</th>
                        <th className="px-6 py-3">Phone Name</th>
                        <th className="px-6 py-3">Phone Number</th>
                        {props.showManage && (
                            <th className="px-6 py-3 flex items-center">
                                Manage
                                <img
                                    src={AddIcon}
                                    className="ml-2 hover:opacity-75 cursor-pointer"
                                    alt="icon"
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {listOfPhoneBook.map(item => (
                        <Fragment key={item.id}>
                            {editPhoneBookId === item.id ? (
                                <EditableRow
                                    editFormData={editFormData}
                                    handleEditFormChange={handleEditFormChange}
                                    handleCancelClick={handleCancelClick}
                                    editPhoneBooks={editPhoneBooks}
                                    phoneBookId={item.id}
                                    showManage={props.showManage}
                                />
                            ) : (
                                <ReadOnlyRow
                                    {...item}
                                    handleUpdate={() => handleEditClick(item)}
                                    handleDelete={() => deletePhoneBooks(item)}
                                    showManage={props.showManage}
                                />
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-10">
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="relative bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md"
                overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
            >
                <button
                    className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-gray-800"
                    onClick={() => setIsModalOpen(false)}
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4">Add New Phone Book</h2>
                <form onSubmit={handleSubmit(addPhoneBooks)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Name</label>
                        <input
                            type="text"
                            placeholder='e.g. Audrey'
                            {...register('phoneName', { required: 'Phone name is required.' })}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.phoneName ? 'border-red-600 ring-red-600' : 'border-gray-300'}`}
                        />
                        {errors.phoneName && (
                            <p className="text-red-600 text-sm mt-1">{errors.phoneName.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            placeholder="e.g. +60xx-xxxxxxx"
                            {...register('phoneNumber', {
                                required: 'Phone number is required.',
                                pattern: {
                                    value: /^\+60\d{2}-\d{7,8}$/,
                                    message: 'Phone number must be in the format +60xx-xxxxxxx.',
                                },
                            })}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.phoneNumber ? 'border-red-600 ring-red-600' : 'border-gray-300'}`}
                        />
                        {errors.phoneNumber && (
                            <p className="text-red-600 text-sm mt-1">{errors.phoneNumber.message}</p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
                        >
                            Add Contact
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}