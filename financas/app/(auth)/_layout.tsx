import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <Redirect href={'/(lista)/lista'} />
    )
  } else if (!isSignedIn) {
      <Redirect href={'/(auth)/Entrar'} />
  }

  return <Stack />;
}