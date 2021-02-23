import React, { useCallback, useRef } from 'react';
import { 
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
    TextInput,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationsErrors';
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
import { StringLocale } from 'yup/lib/locale';


interface SignInFormData {
    email: String;
    password: string;
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null)
    const passwordInputRef = useRef<TextInput>(null)


    const handleSignIn  = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            // await signIn({
            //     email: data.email,
            //     password: data.password
            // });
            // history.push('/dashboard')

        } catch (err) {
            if (err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);

                return;
            }
            
            Alert.alert(
                'Erro na autenticação',
                'Ocorreu um erro ao fazer o login, cheque as credenciais',
            )
            
            
        }
    }, [])

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
                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input 
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="Email"
                                returnKeyType="next"
                                onSubmitEditing={() =>{
                                    passwordInputRef.current?.focus()
                                }}
                            />
                            <Input 
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />
                            <Button onPress={() => {formRef.current?.submitForm();} }>Entrar</Button>
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