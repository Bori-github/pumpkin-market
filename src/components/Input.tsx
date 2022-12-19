import styled from '@emotion/styled';

interface InputProps {
  name: string;
  label: string;
  [key: string]: string | boolean;
}

export const Input = ({ name, label, ...rest }: InputProps) => {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      {name === 'email' && (
        <InputField type="email" placeholder={label} {...rest} />
      )}
      {name === 'phone' && (
        <InputField type="number" placeholder={label} {...rest} />
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
