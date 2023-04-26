import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Membuat schema validasi untuk password
const passwordSchema = Yup.string()
  .required('Password wajib diisi')
  .min(8, 'Password harus lebih dari 8 karakter');

// Contoh penggunaan schema pada form validation
const schema = Yup.object().shape({
  password: passwordSchema,
});

function MyForm() {
  // ...
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    alert('test')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;