import type { NextPage } from 'next';
import { useState } from 'react';
import TwitterIcon from '../assets/twitter.svg';
import GithubIcon from '../assets/github.svg';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Input } from '../components/Input';
import { FormButtom } from '../components/FormButton';
import { useForm } from 'react-hook-form';

interface EnterFromProps {
  email?: string;
  phone?: number;
}

const Enter: NextPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EnterFromProps>();
  const [method, setMethod] = useState<'email' | 'phone'>('email');

  const handleMethod = (method: 'email' | 'phone') => {
    reset();
    setMethod(method);
  };

  const onSubmit = (data: EnterFromProps) => {
    console.log(data);
  };

  return (
    <Section>
      <Title>Enter to Pumpkin</Title>
      <MethodTab>
        <EmailTabButton
          type="button"
          onClick={() => handleMethod('email')}
          method={method}
        >
          Email
        </EmailTabButton>
        <PhoneTabButton
          type="button"
          onClick={() => handleMethod('phone')}
          method={method}
        >
          Phone
        </PhoneTabButton>
      </MethodTab>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {method === 'email' && (
          <Input
            register={register('email', {
              required: '* Email address is required.',
            })}
            name="email"
            label="Email address"
            errors={errors.email}
          />
        )}
        {method === 'phone' && (
          <Input
            register={register('phone', {
              required: '* Phone number is required.',
            })}
            name="phone"
            label="Phone number"
            errors={errors.phone}
          />
        )}
        <FormButtom
          type="submit"
          text={method === 'email' ? 'Get login link' : 'Get one-time password'}
        />
      </Form>
      <OtherMethodContainer>
        <OtherMethodText>Or enter with</OtherMethodText>
      </OtherMethodContainer>
      <ButtonContainer>
        <OtherMethodButton>
          <TwitterIcon width="20px" />
        </OtherMethodButton>
        <OtherMethodButton>
          <GithubIcon width="20px" />
        </OtherMethodButton>
      </ButtonContainer>
    </Section>
  );
};

export default Enter;

const Section = styled.section`
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 34px;
`;

const MethodTab = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow: hidden;
  border: 2px solid #000;
  border-radius: 40px;
`;

const TabButtonStyle = css`
  height: 40px;
  border-radius: 40px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.2s color 0.2s;
`;

const EmailTabButton = styled.button<{ method: string }>`
  ${TabButtonStyle}
  background-color: ${({ method }) =>
    method === 'email' ? '#00c6ad' : 'transprent'};
  color: ${({ method }) => (method === 'email' ? '#fff' : 'transprent')};
`;

const PhoneTabButton = styled.button<{ method: string }>`
  ${TabButtonStyle}
  background-color: ${({ method }) =>
    method === 'phone' ? '#00c6ad' : 'transprent'};
  color: ${({ method }) => (method === 'phone' ? '#fff' : 'transprent')};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px 0;
`;

const OtherMethodContainer = styled.div`
  position: relative;
  margin: 10px 0 30px;
  text-align: center;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    z-index: -1;
    width: 100%;
    height: 1px;
    background-color: #000;
  }
`;

const OtherMethodText = styled.span`
  padding: 0 10px;
  background-color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
`;

const OtherMethodButton = styled.button`
  height: 38px;
  border: 2px solid #000;
  border-radius: 8px;
  font-size: 0;
  transition: all 0.2s;

  &:hover {
    background-color: #000;

    svg {
      fill: #fff;
    }
  }
`;
