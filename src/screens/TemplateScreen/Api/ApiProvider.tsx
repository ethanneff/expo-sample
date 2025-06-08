import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { Alert } from 'react-native';

const alertUser = (error: Error, onPress: () => void) => {
  Alert.alert('Error', error instanceof Error ? error.message : 'An unexpected error occurred', [
    { text: 'Retry', onPress },
    { text: 'Dismiss', style: 'cancel' },
  ]);
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      alertUser(error, () => {
        queryClient.refetchQueries({ stale: true });
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      alertUser(error, () => {
        if (
          mutation.options &&
          mutation.options.mutationFn &&
          mutation.state.variables !== undefined
        ) {
          mutation.options.mutationFn(mutation.state.variables);
        }
      });
    },
  }),
});

/**
 * Query Client Provider
 *
 * This is the provider that provides the query client to the app
 */
export const ApiProvider = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
