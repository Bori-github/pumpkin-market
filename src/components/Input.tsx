import styled from '@emotion/styled';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  name: string;
  label: string;
  register: UseFormRegisterReturn;
  errors?: FieldError;
}

export const Input = ({ name, label, register, errors }: InputProps) => {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      {name === 'email' && (
        <div>
          <InputField type="email" placeholder={label} {...register} />
          <ErrorText>{errors?.message}</ErrorText>
        </div>
      )}
      {name === 'phone' && (
        <div>
          <InputField type="number" placeholder={label} {...register} />
          <ErrorText>{errors?.message}</ErrorText>
        </div>
      )}
    </>
  );
};

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
`;

const InputField = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 2px solid #000;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const ErrorText = styled.span`
  display: inline-block;
  margin: 6px 0 0 6px;
  color: #f85a2b;
  font-size: 13px;
  font-weight: bold;
`;
