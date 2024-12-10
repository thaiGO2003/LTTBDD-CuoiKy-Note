import { Text, View, StyleSheet, Image , TextInput, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import Screen02 from './Screen02';
export default function Screen01({navigation}) {
  const [name, setName] = useState('');
  return (
    <View style={styles.container}>
      <Image source = {require('../assets/images/banner.png')}/>
      <View style = {{backgroundColor: 'white', borderWidth: 1, padding: 10, width: "100%"}}>
        <TextInput placeholder = "Enter your name" value = {name} onChangeText = {(text)=>setName(text)} style = {{fontSize: 20}}/>
      </View>
      <TouchableOpacity style = {{backgroundColor: 'aqua', padding: 10}}
        onPress = {()=>{navigation.navigate("Screen02", {name})}}
      >
        <Text style = {{color: 'white', fontWeight: 'bold'}}>Get started!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flex: 1,
    gap: 20
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});
