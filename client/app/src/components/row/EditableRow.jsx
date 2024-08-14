import { useForm } from 'react-hook-form';
import "../../style.css";
import ConfirmIcon from '../../assets/icon/confirmContactIcon.png';
import CancelIcon from '../../assets/icon/deleteContactIcon.png';

export default function EditableRow(props) {
    // Initialize react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            phoneName: props.editFormData.phoneName,
            phoneNumber: props.editFormData.phoneNumber
        }
    });

    const onSubmit = (data) => {
        props.editPhoneBooks(data, props.editFormData.id);
    };

    return (
        <tr className="table--font-body" key={props.editFormData.id}>
            <td className="px-6 py-4 hidden">{props.editFormData.id}</td>
            <td className="px-6 py-4">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <input
                        type="text"
                        {...register('phoneName', { required: 'Phone name is required.' })}
                        className={`border rounded px-2 py-1 ${errors.phoneName ? 'border-red-600 ring-red-600' : 'border-gray-300'}`}
                    />
                    {errors.phoneName && (
                        <p className="text-red-600 text-sm mt-1">{errors.phoneName.message}</p>
                    )}
                </form>
            </td>
            <td className="px-6 py-4">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
                        className={`border rounded px-2 py-1 ${errors.phoneNumber ? 'border-red-600 ring-red-600' : 'border-gray-300'}`}
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-600 text-sm mt-1">{errors.phoneNumber.message}</p>
                    )}
                </form>
            </td>
            {props.showManage && (
                <td className="px-6 py-3 flex">
                    <button onClick={handleSubmit(onSubmit)}>
                        <img src={ConfirmIcon} alt="Confirm" className="hover:opacity-75 cursor-pointer" />
                    </button>
                    <button onClick={props.handleCancelClick}>
                        <img src={CancelIcon} alt="Cancel" className="pl-3 hover:opacity-75 cursor-pointer" />
                    </button>
                </td>
            )}
        </tr>
    );
}