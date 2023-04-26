import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { asyncChange, authState } from '@/redux/reducers/authSlices';
import { NotifToastBerhasil, NotifToastGagal } from '@/components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';

const schema = yup
    .object({
        new_password: yup.string().required(),
    })
    .required();

export const useChangePassword = () => {
    const dispatch = useDispatch();
    const { query } = useRouter();
    const { change_password } = query;
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
            const response = await dispatch(asyncChange(new_password, reset_token));
            if (response?.payload?.status) {
                NotifToastBerhasil(response?.payload?.message);
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