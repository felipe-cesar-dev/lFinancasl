import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    console.log('Conta Logada')
    return (
      <Redirect href={'/'} />
    )
  } else if (!isSignedIn) {
      <Redirect href={'/(auth)/Entrar'} />
  }

  return <Stack />;
}