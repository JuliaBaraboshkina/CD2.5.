import * as React from 'react';
import { StyleSheet, Text, StatusBar,View,Pressable,Image} from 'react-native';

function Wellcome({ navigation }) {

  return (
  
      <View style={styles.container}>
        <Image style={styles.gif}
        source={{uri: "https://i.yapx.ru/HK5di.gif"}}  
    />
          <Pressable style={styles.button_1} onPress={() => navigation.navigate('Анимация')}>
            <Text style={styles.text}>Анимация</Text>
            </Pressable>
      </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CACACA',
      alignItems: "center",
      paddingTop: StatusBar.currentHeight,
      
    },
    gif: {
      bottom:-100,
      width:270,
      height: 230
    },

    button_1: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 40,
      backgroundColor: '#F59839',
      bottom:-110,
      width:100,
      height: 45
    },
    text: {
      fontSize: 15,
      lineHeight: 21,
      fontWeight: 'bold',
      color: 'white',
    },
  });
  
export default Wellcome;