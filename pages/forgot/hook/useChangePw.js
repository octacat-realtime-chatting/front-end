import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { asyncChange, authState } from '@/redux/reducers/authSlices';
import { NotifToastBerhasil, NotifToastGagal } from '@/components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';

const passwordSchema = yup.string()
    .required('Password wajib diisi')
    .min(8, 'Password harus lebih dari 8 karakter');

const schema = yup
    .object({
        new_password: passwordSchema,
    })
    .required();

export const useChangePassword = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { change_password } = router.query;
    const reset_token = change_password;
    const [visible, setVisible] = useState(false);
    const { loadingAsyncChange } = useSelector(authState);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (new_password) => {
        try {
            const data = {
                new_password,
                reset_token,
            };
            const response = await dispatch(asyncChange(data));
            if (response?.payload?.status) {
                NotifToastBerhasil(response?.payload?.message);
                router.push('/login');
            }

            if (!response?.payload?.status) {
                NotifToastGagal(response?.error?.message);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return {
        register,
        errors,
        loadingAsyncChange,
        visible,
        setVisible,
        reset_token,
        onSubmit: handleSubmit(onSubmit),
    };
}