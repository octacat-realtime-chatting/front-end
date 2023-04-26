import { asyncRegister, authState } from "@/redux/reducers/authSlices";
import { useState } from "react";
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NotifToastBerhasil, NotifToastGagal } from "@/components";

const passwordSchema = yup.string()
    .required('Password wajib diisi')
    .min(8, 'Password harus lebih dari 8 karakter');

const schema = yup
    .object().shape({
        email: yup.string().email().required(),
        name: yup.string().required(),
        username: yup.string().required(),
        password: passwordSchema,
    }).required();

export const useRegister = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const { loadingAsyncRegister } = useSelector(authState);
    const {
        register, handleSubmit, formState: { errors }, reset,
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit = async (data, e) => {
        e.preventDefault();

        try {
            const response = await dispatch(asyncRegister(data));
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
        loadingAsyncRegister,
        visible,
        setVisible,
        onSubmit: handleSubmit(onSubmit),
    };
};