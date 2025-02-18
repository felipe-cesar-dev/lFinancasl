import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, ImageBackground } from 'react-native'
import React from 'react'
import styles from '@/styles/styles'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')


  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {

        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {

      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <ImageBackground source={require('../../images/backgroundHome.jpeg')} style = {styles.layoutGeral}>
    <Text style ={{
      color: 'black',
      fontSize: 20
    }}>Entre na sua conta</Text>
    <View style = {styles.layoutView}>
    <View style = {{
          borderWidth: 1,
          borderColor: 'green',
          padding: 30,
          backgroundColor: 'rgba(52, 170, 97, 0.79)',
          borderRadius: 10,
          marginBottom: 20
        }}>
      
      <Text style = {styles.layoutText}>Digite seu Email: </Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="exemplo@exemplo.com"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <Text style = {styles.layoutText}>Digite sua senha: </Text>
      <TextInput
        value={password}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button color='green' title="Entrar" onPress={onSignInPress} />
      <View>
        <Text style = {{marginTop: 2}} >Não tem uma conta?</Text>
        <Link href="/Cadastrar">
          <Text style ={{color: 'white', fontSize:15}}>Cadastre-se!</Text>
        </Link>
      </View>
    </View>
    </View>
    </ImageBackground>
  )
}