import * as React from 'react'
import { Text, TextInput, Button, View, ImageBackground } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter, Link } from 'expo-router'
import styles from '@/styles/styles'


export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')


  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err) {

      alert("Digite um email e senha para finalizar o cadastro.")
    }
  }


  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {

      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })


      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {

        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {

      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verifique seu e-mail</Text>
        <TextInput
          value={code}
          placeholder="Digite seu código de verificação"
          onChangeText={(code) => setCode(code)}
        />
        <Button title="Verify" onPress={onVerifyPress} />
      </>
    )
  }

  return (
    <ImageBackground source={require('../../images/backgroundsignup.jpeg')} style = {styles.layoutGeral}>
    <Text style = {{fontSize: 20}}>Cadastre-se</Text>
    <View style = {styles.layoutView}>
      
    <View style = {styles.view2}>
        
        <Text style = {styles.layoutText}>Digite seu e-mail:</Text>
        <TextInput
          style = {styles.textInput}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="exemplo@exemplo.com"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <Text style = {styles.layoutText}>Digite sua senha:</Text>
        <TextInput
          style = {styles.textInput}
          value={password}
          placeholder="senha"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        
            <View>
              <Text style = {{marginTop: 2}}  >Já tem uma conta?</Text>
              <Link href="/Entrar">
                <Text style = {{color: 'white', fontSize: 15}}>Faça o login</Text>
              </Link>
            </View>
    </View>
    <Button color = 'green' title="Cadastrar" onPress={onSignUpPress} />
    </View>
    </ImageBackground>
  )
}