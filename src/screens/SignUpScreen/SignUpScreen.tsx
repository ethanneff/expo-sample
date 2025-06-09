import { useCallback } from 'react';
import { Button } from '~/components/Button/Button';
import { Placeholder } from '~/components/Placeholder/Placeholder';
import { useStoreAuth } from '~/store/useStoreAuth';

const SignUpScreen = () => {
  const login = useStoreAuth((state) => state.actions.login);

  const handleLogin = useCallback(() => {
    login({ email: 'john.doe@example.com', id: '1', name: 'John Doe', token: '1234567890' });
  }, [login]);

  return (
    <Placeholder title="Sign Up Screen">
      <Button onPress={handleLogin} title="Login" variant="primary" />
    </Placeholder>
  );
};

export default SignUpScreen;
