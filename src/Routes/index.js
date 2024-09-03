import React from "react";
import { StyleSheet, Text, View,FlatList } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '/src/screens/Home';
import Details from '/src/screens/Details';


export default function App() {
 
 const stack = createStackNavigator();
 
    return (
  
    <NavigationContainer>

        <stack.Navigator>

        <stack.Screen name = 'Home' component={Home} />
        <stack.Screen name = 'Details' component={Details} />

        </stack.Navigator>

    </NavigationContainer>

   );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#141a29',
      alignItems:"center"
      
      
    },
  });
  