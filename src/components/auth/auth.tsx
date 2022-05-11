import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute, StorageKey } from '~/common/enums/enums';
import { storage } from '~/services/services';
import { SignInForm } from './components/sign-in-form';

export const Auth: FC = () => {
  const { pathname } = useLocation();
  const token = storage.getItem(StorageKey.TOKEN);

  if (token) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  const getForm = (path: string): JSX.Element => {
    if (path === AppRoute.SIGN_UP) {
      return <SignUpForm />;
    }
    return <SignInForm />;
  };

  return getForm(pathname);
};
