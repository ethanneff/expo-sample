import { Button } from 'react-native';
import { Placeholder } from '~/components/Placeholder/Placeholder';
import { useStoreAuth } from '~/store/useStoreAuth';

const SignUpScreen = () => {
  const login = useStoreAuth((state) => state.actions.login);
  return (
    <Placeholder title="Sign Up Screen">
      <Button
        title="Login"
        onPress={() => {
          login({ id: '1', name: 'John Doe', email: 'john.doe@example.com', token: '1234567890' });
        }}
      />
    </Placeholder>
  );
};

export default SignUpScreen;
