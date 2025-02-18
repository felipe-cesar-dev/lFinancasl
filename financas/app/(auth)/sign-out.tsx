import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Button } from 'react-native'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('./Entrar'))
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return <Button color="green" title="Encerrar Sessão" onPress={handleSignOut} />
}