import React, { useCallback } from 'react';
import { 
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';
import { 
    Container, 
    Title, 
    ForgotPassword, 
    ForgotPasswordText, 
    CreateAccountButton, 
    CreateAccountButtonText } from './styles';


const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const handleSignIn = useCallback( (data: object)=>{
        console.log(data)
    }, []);

    return (
        <>
            <KeyboardAvoidingView 
                style={{flex:1}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled    
            >
                <ScrollView
                    contentContainerStyle={{flex:1}}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <Image source={logoImg} />
                        <View>
                            <Title>Faça seu Logon</Title>
                        </View>
                        <Form onSubmit={handleSignIn}>
                            <Input name="email" icon="mail" placeholder="Email"/>
                            <Input name="password" icon="lock" placeholder="Senha"/>
                            <Button onPress={() => {}}>Entrar</Button>
                        </Form>
                        <ForgotPassword onPress={()=>{}}>
                            <ForgotPasswordText> Esqueci minha senha </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <CreateAccountButton onPress={()=> navigation.navigate('SignUp')}>
                <Icon name="log-in" size={20} color="#ff9000" />
                <CreateAccountButtonText>Crie sua conta</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    );
}

export default SignIn;