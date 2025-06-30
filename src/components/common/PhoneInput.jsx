import { useFormContext } from 'react-hook-form';
import TextInput from './TextInput';

export default function PhoneInput({ name = 'phone' }) {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <TextInput
      label="Phone Number"
      inputRef={register(name, {
        required: 'Phone is required',
        pattern: {
          value: /^[0-9]{10,15}$/,
          message: 'Invalid phone number (10-15 digits)'
        }
      }).ref}
      error={errors[name]}
      helperText={errors[name]?.message}
    />
  );
}