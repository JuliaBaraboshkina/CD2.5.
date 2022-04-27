
import { StyleSheet,ImageBackground,Text,Pressable, SafeAreaView,View, TouchableOpacity, ScrollView, Dimensions,Animated } from 'react-native';
import React, {useEffect, useRef} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const scrollX = new Animated.Value(0)
const springValue = new Animated.Value(1)
const imageRotateValue = new Animated.Value(0)

const interpolateScrollViewRotation = imageRotateValue.interpolate({
  inputRange: [0, 50],
  outputRange: ["0deg", "360deg"]
})

const pict = ["https://krasivosti.pro/uploads/posts/2021-04/1618114925_15-p-rizhii-retriver-sobaki-krasivo-foto-17.jpg", "https://glorypets.ru/wp-content/uploads/2020/09/risunok-2-predstavitel-pordy-akita.jpg"]

const flipAnimation = () => {
  Animated.parallel([
      Animated.sequence([
        Animated.spring(springValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(springValue, {
          toValue: 1,
          useNativeDriver: true
        })
      ]),
      Animated.sequence([
          Animated.timing(imageRotateValue, {
            toValue: 100,

            useNativeDriver: true,
          }),
          Animated.timing(imageRotateValue, {
            toValue: 0, //начальная позиция
            duration: 1900,
            useNativeDriver: true
          })
      ])
  ]).start()
}

const transitionAnimation = (index) => {
  return {
    transform: [
      { perspective: 800 },
      {
        scale: scrollX.interpolate({
          inputRange: [
            (index - 1) * windowWidth,
            index * windowWidth,
            (index + 1) * windowWidth
          ],
          outputRange: [0.25, 1, 0.25]
        })
      },
      {
        rotateX: scrollX.interpolate({
          inputRange: [
            (index - 1) * windowWidth,
            index * windowWidth,
            (index + 1) * windowWidth
          ],
          outputRange: ["45deg", "0deg", "45deg"]
        })
      },
      {
        rotateY: scrollX.interpolate({
          inputRange: [
            (index - 1) * windowWidth,
            index * windowWidth,
            (index + 1) * windowWidth
          ],
          outputRange: ["-45deg", "0deg", "45deg"]
        })
      }
    ]
  };
};

const AnimatedImageCardView = (props) => {
  return (
      <Animated.View style={[styles.scrollPage,
        {transform: [{scale: springValue}, {rotate: interpolateScrollViewRotation}]}]}>
        <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
          {props.children}
        </Animated.View>
      </Animated.View>
  );
};

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current 

  useEffect( () => {
    Animated.timing(
        fadeAnim,{
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }
    ).start()
  }, [fadeAnim])

  return ( //галерея
      <Animated.View                 
          style={{
            ...props.style,
            opacity: fadeAnim,         
          }}
      >
        {props.children}
      </Animated.View>
  );
}


export default function AppAmination() {
  return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.button}>

        </TouchableOpacity>
        <FadeInView style={styles.scrollContainer}>

          <ScrollView
              horizontal={true}
              style={styles.scrollViewStyle}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event([
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ], {useNativeDriver: false})}
              scrollEventThrottle={1}

          >
            {pict.map((image, imageIndex) => {
              return (
                  <AnimatedImageCardView
                      key={imageIndex}
                      index={imageIndex}
                  >
                    <ImageBackground source={{ uri: image }} style={styles.card}>
                    </ImageBackground>
                  </AnimatedImageCardView>
              );
            })}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {pict.map((image, imageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1)
                ],
                outputRange: [8, 16, 8],
                extrapolate: "clamp"
              });
              return (
                  <Animated.View
                      key={imageIndex}
                      style={[styles.Dot, { width }]}
                  />
              );
            })}
          </View>
        </FadeInView>
        <Pressable style={styles.button} onPress={flipAnimation}>
            <Text style={styles.text}>Анимация</Text>
        </Pressable>
      </SafeAreaView>
  );
}






const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CACACA',
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#F59839',
    bottom:440,
    width:100,
    height: 45
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 250,
    height: 300,
    borderRadius: 10,
  },
  Dot: {
    height: 7,
    width: 10,
    borderRadius: 20,
    backgroundColor: "black",
    marginHorizontal: 1
  },
  scrollPage: {
    width: windowWidth,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 0,
  },
})
