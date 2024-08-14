import Swal from 'sweetalert2';
import "../../style.css";
import EditIcon from '../../assets/icon/editContactIcon.png';
import DeleteIcon from '../../assets/icon/deleteContactIcon.png';

function ReadOnlyRow(props) {
    const handleDelete = async (item) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            // Call the delete function passed from parent
            props.handleDelete(item);
            Swal.fire(
                'Deleted!',
                'Your entry has been deleted.',
                'success'
            );
        }
    };

    return (
        <tr className="table--font-body" key={props.id}>
            <td className="px-6 py-4 hidden">{props.id}</td>
            <td className="px-6 py-4">{props.phoneName}</td>
            <td className="px-6 py-4">{props.phoneNumber}</td>
            {props.showManage && (
                <td className="px-6 py-3 flex">
                    <button onClick={() => props.handleUpdate(props)}>
                        <img src={EditIcon} alt="Edit" className="hover:opacity-75 cursor-pointer" />
                    </button>
                    <button onClick={() => handleDelete(props)}>
                        <img src={DeleteIcon} alt="Delete" className="pl-3 hover:opacity-75 cursor-pointer" />
                    </button>
                </td>
            )}
        </tr>
    );
}

export default ReadOnlyRow;
