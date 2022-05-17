import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignUpUserDto } from '~/common/types/types';
import { signUpUser } from '~/validation-schemas/validation-schemas';
import { useAppDispatch } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { InputName } from '~/common/enums/enums';
import { TextInput } from '~/components/common/common';

export const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = useForm<SignUpUserDto>({
    resolver: joiResolver(signUpUser),
  });
  const {
    name: nameError,
    login: loginError,
    password: passwordError,
  } = formState.errors;

  const handleSignUp = (payload: SignUpUserDto): void => {
    dispatch(authActions.signUp(payload));
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <h2>Sign Up</h2>
      <TextInput
        formRegisterValues={register(InputName.NAME)}
        errorMessage={nameError?.message}
      />
      <TextInput
        formRegisterValues={register(InputName.LOGIN)}
        errorMessage={loginError?.message}
      />
      <TextInput
        formRegisterValues={register(InputName.PASSWORD)}
        errorMessage={passwordError?.message}
      />
      <button>Sign Up</button>
    </form>
  );
};
