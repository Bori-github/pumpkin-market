import styled from '@emotion/styled';

interface FormButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  text: string;
}

export const FormButtom = ({ type, text }: FormButtonProps) => {
  return <Button type={type}>{text}</Button>;
};

const Button = styled.button`
  height: 40px;
  border: 2px solid #000;
  border-bottom-width: 4px;
  border-radius: 8px;
  background-color: #1747e7;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
