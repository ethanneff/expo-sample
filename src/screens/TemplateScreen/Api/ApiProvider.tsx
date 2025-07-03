import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';
import { Alert } from 'react-native';

const alertUser = (error: Error, onPress: () => void) => {
  Alert.alert('Error', error instanceof Error ? error.message : 'An unexpected error occurred', [
    { onPress, text: 'Retry' },
    { style: 'cancel', text: 'Dismiss' },
  ]);
};

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    // eslint-disable-next-line max-params
    onError: (error, _variables, _context, mutation) => {
      alertUser(error, async () => {
        if (mutation.options.mutationFn && mutation.state.variables !== undefined) {
          await mutation.options.mutationFn(mutation.state.variables);
        }
      });
    },
  }),
  queryCache: new QueryCache({
    onError: (error) => {
      alertUser(error, async () => {
        await queryClient.refetchQueries({ stale: true });
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
