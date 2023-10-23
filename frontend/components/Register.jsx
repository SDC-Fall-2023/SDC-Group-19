import {Text, View, TextInput, Button} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {React, useState} from 'react'

const Gyms = ["Nick", "Bakke"];
const SkillLevels = ["Beginner", "Intermediate", "Advanced"];


const Register = ({navigation, onRegisterSuccess}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [email, setEmail] = useState('')
    const [gym, setGym] = useState('')
    const [skillLevel, setSkillLevel] = useState('')

    const registerUser = () => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password, confirm, email, gym, skillLevel})
        })
        .then(response => response.json())
        .then(response => {
            if(response.status === 200) {
                console.log('User created')
                navigation.navigate('Dashboard')
            }
            else {
                console.log('User not created')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <View>
            <Text>Register</Text>
            <TextInput placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <TextInput placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <TextInput placeholder="Confirm Password" onChange={e => setConfirm(e.target.value)} />
            <TextInput placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <Picker>
                selectedValue={gym},
                onValueChange={(itemValue, itemIndex) => setGym(itemValue)}
                {Gyms.map(gym => {
                    return <Picker.Item label={gym} value={gym} key={gym} />
                })}
            </Picker>
            <Picker>
                selectedValue={skillLevel},
                onValueChange={(itemValue, itemIndex) => setSkillLevel(itemValue)}
                {SkillLevels.map(skillLevel => {
                    return <Picker.Item label={skillLevel} value={skillLevel} key={skillLevel} />
                })}
            </Picker>
            <Button title="Register" onPress={registerUser}/>
        </View>
    )
}

export default Register;