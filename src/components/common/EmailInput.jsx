import { useFormContext } from 'react-hook-form';
import TextInput from './TextInput';

export default function EmailInput({ name = 'email' }) {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <TextInput
      label="Email Address"
      type="email"
      inputRef={register(name, {
        required: 'Email is required',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Invalid email address'
        }
      }).ref}
      error={errors[name]}
      helperText={errors[name]?.message}
    />
  );
}