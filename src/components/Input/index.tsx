import React from 'react';
import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => (
    <Container>
        <Icon name="mail" size={20} color="#666360" />
        <TextInput 
            keyboardAppearance="dark"
            placeholderTextColor="#666369"
            {...rest}
        />
    </Container>
);

export default Input;