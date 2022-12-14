import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { COLOR } from '../../assets/font/color'
import Toast from 'react-native-toast-message'
// component
import Error from '../../components/User/Error'

import axios from 'axios';
import baseUrl from '../../common/baseUrl';

export default function SignUp({ navigation }) {
    const [isDisplayPassword, setIsDisplayPassword] = useState(true)
    const handleDisplayPassword = () => {
        setIsDisplayPassword(!isDisplayPassword)
    }

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')


    const [error, setError] = useState('')

    const handleClickSignUp = () => {
        const user = {
            email,
            password,
            name,
            phone,
            isAdmin: false,
        }

        if (email == '' || password == '' || name == '' || phone == '') {
            setError("Please fill in your credentials")
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something went wrong",
                text2: "Please try again"
            })
        }
        else {
            axios
                .post(`${baseUrl}customers/register`, user)
                .then((res) => {
                    if (res.status === 200) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Registration Succeeded",
                            text2: "Please login into your account"
                        })
                        setTimeout(() => {
                            navigation.navigate("Login")
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    })
                })
        }
    }
    return (
        <ImageBackground
            source={require('../../assets/images/fathul-abrar-T-qI_MI2EMA-unsplash.jpg')}
            resizeMode="cover"
            style={{ flex: 1, justifyContent: 'center' }}
        >
            <LinearGradient colors={['rgba(107, 107, 107, 0.5)', 'rgba(0, 0, 0, 0.8)']} style={{ flex: 1 }}>
                <View style={styles.content}>
                    <Text style={styles.title}>Create Account</Text>
                    <View style={styles.Input}>
                        <TextInput
                            style={{ width: '100%', color: 'white' }}
                            placeholder="Name"
                            placeholderTextColor={'#ccc'}
                            value={name}
                            id={"name"}
                            name={"name"}
                            onChangeText={(text) => {
                                setName(text)
                                setError('')
                            }}
                        />
                    </View>
                    <View style={styles.Input}>
                        <TextInput
                            style={{ width: '100%', color: 'white' }}
                            placeholder="Phone"
                            placeholderTextColor={'#ccc'}
                            value={phone}
                            id={"phone"}
                            name={"phone"}
                            onChangeText={(text) => {
                                setPhone(text)
                                setError('')
                            }}
                        />
                    </View>
                    <View style={styles.Input}>
                        <TextInput
                            style={{ width: '100%', color: 'white' }}
                            placeholder="Email"
                            placeholderTextColor={'#ccc'}
                            value={email}
                            id={"email"}
                            name={"email"}
                            onChangeText={(text) => {
                                setEmail(text)
                                setError('')
                            }}
                        />
                    </View>
                    <View style={[styles.Input, { justifyContent: 'space-between' }]}>
                        <TextInput
                            style={{ width: '100%', color: 'white' }}
                            placeholder="Password"
                            placeholderTextColor={'#ccc'}
                            secureTextEntry={isDisplayPassword}
                            value={password}
                            name={"password"}
                            id={"password"}
                            onChangeText={(text) => {
                                setPassword(text)
                                setError('')
                            }}
                        />
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 20 }}
                            onPress={handleDisplayPassword}>
                            {isDisplayPassword ?
                                <Ionicons name="eye" size={24} color={'#ccc'} />
                                : <Ionicons name="eye-off" size={24} color={'#ccc'} />
                            }
                        </TouchableOpacity>
                    </View>
                    {/*<View style={[styles.Input, { justifyContent: 'space-between' }]}>*/}
                    {/*    <TextInput*/}
                    {/*        style={{ width: '100%', color: 'white' }}*/}
                    {/*        placeholder="Confirm password"*/}
                    {/*        placeholderTextColor={'#ccc'}*/}
                    {/*        secureTextEntry={isDisplayPassword}*/}
                    {/*    />*/}
                    {/*    <TouchableOpacity*/}
                    {/*        style={{ position: 'absolute', right: 20 }}*/}
                    {/*        onPress={handleDisplayPassword}>*/}
                    {/*        {isDisplayPassword ?*/}
                    {/*            <Ionicons name="eye" size={24} color={'#ccc'} />*/}
                    {/*            : <Ionicons name="eye-off" size={24} color={'#ccc'} />*/}
                    {/*        }*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}
                    {error ? <Error message={error} /> : null}
                    <TouchableOpacity
                        onPress={() => handleClickSignUp()}
                        style={styles.button}
                    >
                        <LinearGradient colors={['rgba(232, 192, 61, 1)', 'rgba(190, 100, 109, 1)']}
                            style={styles.linearColor}
                            end={{ x: 1, y: 0.5 }}
                        >
                            <Text style={{ fontSize: 20, color: 'white' }}>SignUp</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                    }}>
                        <Text style={{
                            fontSize: 15,
                            color: 'white',
                        }}>Have an account?</Text>
                        <TouchableOpacity style={{
                            height: '100%',
                            alignItems: 'center',
                            marginLeft: 5,
                        }}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                color: COLOR.secondaryColor,
                                fontSize: 18,
                            }}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    content: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        width: '100%',
        height: '80%',
        backgroundColor: COLOR.mainColor,
        bottom: 0,
        alignItems: 'center',
    },
    title: {
        marginTop: 30,
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    Input: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: '#374254',
        borderRadius: 10,
        fontSize: 20,
        marginTop: 30,
        alignItems: 'center',
        padding: 20,
    },
    linearColor: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: '90%',
        borderRadius: 35,
        marginTop: 60,
        marginBottom: 20,
    },
})
