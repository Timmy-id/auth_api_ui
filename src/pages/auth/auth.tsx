import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
    Center, 
    VStack, 
    InputGroup, 
    Input, 
    InputRightElement, 
    Button,
    Text,
    FormControl,
    FormLabel,
    HStack,
    Link,
    useToast
} from '@chakra-ui/react'
import { useLoginUserMutation } from '../../app/services/authApi'
import { useAppDispatch } from '../../app/hooks'
import { setCredentials } from '../../features/auth/authSlice'

const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
}

const Auth = () => {
    const [show, setShow] = useState<boolean>(false)
    const [showRegister, setShowRegister] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const [
        loginUser, 
        {
            data: loginData, 
            isSuccess: loginSuccess, 
            isError: loginIsError,
            error: loginError
        }
    ] = useLoginUserMutation()

    const navigate = useNavigate()
    const toast = useToast()

    const handleClick = () => setShow(!show)

    const handleLogin = async () => {
        if (email && password) {
            await loginUser({ email, password })
        } else {
            toast({
                title: 'All fields are required',
                isClosable: true,
                status: 'error',
                duration: 3000,
                position: 'top-right'
            })
        }
    }

    useEffect(() => {
        if (loginSuccess) {
            toast({
                title: 'Login Success',
                isClosable: true,
                status: 'success',
                duration: 6000,
                position: 'top-right'
            })
            dispatch(setCredentials({ token: loginData.access_token }))
            navigate('/me')
        }
    }, [loginSuccess])

    const [formValue, setFormValue] = useState(initialState)
    const { name, email, password, passwordConfirm } = formValue

    const handleChange = (e: any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    return (
        <Center h='500px'>
            <VStack spacing='4'>
                <Text fontSize='3xl'>
                    {!showRegister ? 'Login' : 'Register'}
                </Text>
                {showRegister && (
                    <>
                        <InputGroup>
                            <FormControl variant='floating' id='name'>
                                <FormLabel>Full Name</FormLabel>
                                <Input 
                                    type='text'
                                    name='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </InputGroup>
                    </>
                )}
                <InputGroup>
                    <FormControl variant='floating' id='email'>
                        <FormLabel>Email</FormLabel>
                        <Input 
                            type='text'
                            name='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={handleChange}
                        />
                    </FormControl>
                </InputGroup>

                <InputGroup size='md'>
                    <FormControl variant='floating' id='password'>
                        <FormLabel>Password</FormLabel>
                        <Input 
                            pr='4.5rem'
                            name='password'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            value={password}
                            onChange={handleChange}
                        />
                        <InputRightElement width='3.5rem'>
                             <Button
                                h='2.4rem'
                                size='sm'
                                onClick={handleClick}
                                mt='4rem'
                            >
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </FormControl>
                </InputGroup>
                {showRegister && (
                    <InputGroup size='md'>
                        <FormControl variant='floating' id='passwordConfirm'>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input 
                                pr='4.5rem'
                                name='passwordConfirm'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter confirm password'
                                value={passwordConfirm}
                                onChange={handleChange}
                            />
                            <InputRightElement width='3.5rem'>
                                <Button
                                    h='2.4rem'
                                    size='sm'
                                    onClick={handleClick}
                                    mt='4rem'
                                >
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </FormControl>
                    </InputGroup>
                )}

                {!showRegister ? (
                    <Button onClick={() => handleLogin()} width='100%' size='md' colorScheme='blue'>Login</Button>
                ) : (
                    <Button width='100%' size='md' colorScheme='blue'>Register</Button>
                )}

                {!showRegister ? (
                    <HStack>
                        <Link>Don't have an account?</Link>
                        <Link onClick={() => setShowRegister(true)} color='blue'>Sign up</Link>
                    </HStack>
                ) : (
                    <HStack>
                        <Link>Already have an account?</Link>
                        <Link onClick={() => setShowRegister(false)} color='blue'>Login</Link>
                    </HStack>
                )}
            </VStack>
        </Center>
    )
}

export default Auth