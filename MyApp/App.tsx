// Yup is a schema builder for runtime value parsing and validation. Define a schema, transform a value to match, assert the shape of an existing value, or both. Yup schema are extremely expressive and allow modeling complex, interdependent validations, or value transformation.

import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState }  from 'react'
import Clipboard from '@react-native-clipboard/clipboard';

import BouncyCheckbox  from 'react-native-bouncy-checkbox'

// Form Validation 

import * as Yup from 'yup'

import { Formik } from 'formik'


const PasswordSchema = Yup.object().shape({
   passwordLength: Yup.number()
   .min(4 ,'Should be minimum of 4 Characters ').max(16 , 'Should be max of 16 Characters').required('Length is required')
})


export default function App() {

  const [password , setPassword]  = useState('');

  const [isPassGenerated , setIsPassGenerated] = useState(false)

  const [lowerCase , setLowerCase] = useState(true)
  
  const [upperCase , setupperCase] = useState(false)

  const [numbers , setNumbers] = useState(false)

  const [symbols , setSymbols] = useState(false)


  const generatePasswordString = (passwordLength:number) =>{
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';

    const digitChars = '0123456789';

    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  }


  

  const createPassword = (characters:string, passwordLength : number) =>{
         let result = ''

         for(let i=0;i<passwordLength;i++){
          const characterIndex = Math.floor(Math.random() * characters.length)
          result += characters.charAt(characterIndex)
         }

         return result
  }


  // Extra got it from AI (chatgpt)  # Learnt something new 
  const copyToClipboard = () =>{
    if(password.length==0){
      Alert.alert('Error ⚠️', 'No password to copy!');
      return;
    }

    Clipboard.setString(password)
    Alert.alert('Success 🎉', 'Password copied to clipboard!');
  }


  const resetPasswordState = () =>{

    setPassword('')
    setIsPassGenerated(false)
    setupperCase(false)
    setLowerCase(false)
    setNumbers(false)
    setSymbols(false)
  }


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#DAE0E2'}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.appContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}> Password Generator 🔐 </Text>
            <Formik
              initialValues={{passwordLength: ''}}
              validationSchema={PasswordSchema}
              onSubmit={values => {
                console.log(values);

                generatePasswordString(+values.passwordLength); // ToDo
              }}>
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleReset,
                /* and other goodies */
              }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}> Password Length :- </Text>
                      <View>
                        {touched.passwordLength && errors.passwordLength && (
                          <Text style={styles.errorText}>
                            {errors.passwordLength}
                          </Text>
                        )}
                      </View>
                    </View>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex  :-   8"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}> Include LowerCase </Text>
                    <View>
                      <BouncyCheckbox
                        disabledBuildInState
                        isChecked={lowerCase}
                        onPress={() => setLowerCase(!lowerCase)} // Toggles the state
                        fillColor="#29AB87"
                      />
                    </View>
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}> Include Uppercase :- </Text>
                    <View>
                      <BouncyCheckbox
                        disabledBuildInState
                        isChecked={upperCase}
                        onPress={() => setupperCase(!upperCase)} // Toggles the state
                        fillColor="#FFF222"
                      />
                    </View>
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}> Include Numbers :- </Text>
                    <View>
                      <BouncyCheckbox
                        disabledBuildInState
                        isChecked={numbers}
                        onPress={() => setNumbers(!numbers)} // Toggles the state
                        fillColor="#BB2CD9"
                      />{' '}
                    </View>
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}> Include Symbols :- </Text>
                    <View>
                      <BouncyCheckbox
                        disabledBuildInState
                        isChecked={symbols}
                        onPress={() => setSymbols(!symbols)} // Toggles the state
                        fillColor="#E74292"
                      />
                    </View>
                  </View>

                  <View style={styles.formActions}>
                    <TouchableOpacity
                      disabled={!isValid}
                      style={styles.primaryBtn}
                      onPress={handleSubmit}>
                      {/*If you have a method to call this is the correct way*/}
                      <Text style={styles.primaryBtnTxt}>
                        Generate Password
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.secondaryBtn}
                      onPress={() => {
                        handleReset();
                        resetPasswordState();
                      }}>
                      <Text style={styles.secondaryBtnTxt}> Reset </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
          {isPassGenerated ? (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.subTitle}> Result :- </Text>
              <Text style={styles.description}>
                {' '}
                Long Press to copy & Share{' '}
              </Text>
              <Text selectable={true} style={styles.generatedPassword}>
                {password}
              </Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={copyToClipboard}>
                <Text style={styles.copyButtonText}> Copy to Clipboard </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F4F6F8', // Light neutral background improves readability and provides subtle contrast.
    margin: 0,
    padding: 0,
  },
  formContainer: {
    margin: 20,
    paddingTop: 15,
    padding: 18,
    backgroundColor: '#FFFFFF', // White card-like container for better content separation.
    borderRadius: 12, // Rounded corners for a modern, friendly look.
    elevation: 5, // Android shadow for elevation effect.
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5, // iOS shadow styling for a subtle raised card effect.
  },
  title: {
    fontSize: 28, // Large, bold title to draw attention.
    fontWeight: '700',
    color: '#1A1A1A', // Dark color ensures high contrast and readability.
    marginBottom: 20,
    textAlign: 'center', // Centering the title aligns with most modern app UIs.
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333333', // Slightly softer than black to reduce visual strain.
    marginBottom: 4,
  },
  heading: {
    fontSize: 14,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#2C3E50', // Stylish dark blue for headings, visually distinct from body text.
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20, // Adequate spacing between input sections.
  },
  inputColumn: {
    flex: 1,
    marginRight: 8, // Spacing between input and checkbox.
  },
  inputStyle: {
    flex: 1,
    borderWidth: 3,
    borderColor: '#D3D3D3', // Light border for structure without being harsh.
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    backgroundColor: '#99AAAB', // Slightly off-white to differentiate from container.
  },
  errorText: {
    color: '#E63946', // Standard red error color for visibility.
    fontSize: 13,

    marginTop: 5, // Separation from input field.
  },
  formActions: {
    marginTop: 24, // Adds space above the buttons for breathing room.
  },
  primaryBtn: {
    backgroundColor: '#1E90FF', // Bright blue for call-to-action, universally understood as "primary."
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center', // Centers the button text horizontally.
  },
  primaryBtnTxt: {
    color: '#FFF', // White text on blue background ensures maximum readability.
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryBtn: {
    borderColor: '#1E90FF',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center', // Matches primary button layout for consistency.
  },
  secondaryBtnTxt: {
    color: '#1E90FF', // Inverse of the primary button for secondary action.
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF', // Keeps result section clearly separated.
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4, // Soft shadow to maintain a floating card look.
  },
  cardElevated: {
    marginTop: 10, // Separates the card from the form visually.
  },
  description: {
    fontSize: 14,
    color: '#6C757D', // Grayish tone used for helper text/instructions.
    marginVertical: 8,
  },
  generatedPassword: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1E1E',
    backgroundColor: '#F1F3F6', // Light gray box background makes the password stand out.
    padding: 12,
    borderRadius: 8,
    textAlign: 'center', // Password is centered for emphasis and easier copy.
  },
  copyButton: {
    backgroundColor: '#43BE31',
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
    borderRadius: 8,
  },
  copyButtonText: {
    color: '#EAF0F1',
    fontSize: 15,
    alignItems: 'center',
    fontWeight: '900',
  },
});





// Basic Beginner Way (From Chatgpt -  AI)   # Learnt something new 

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Switch,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';

// import Clipboard from '@react-native-clipboard/clipboard';

// const App = () => {
//   const [password, setPassword] = useState('');
//   const [length, setLength] = useState('8');
//   const [useUppercase, setUseUppercase] = useState(true);
//   const [useLowercase, setUseLowercase] = useState(true);
//   const [useNumbers, setUseNumbers] = useState(true);
//   const [useSymbols, setUseSymbols] = useState(false);

//   const generatePassword = () => {
//     let characterList = '';

//     if (useUppercase) characterList += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     if (useLowercase) characterList += 'abcdefghijklmnopqrstuvwxyz';
//     if (useNumbers) characterList += '0123456789';
//     if (useSymbols) characterList += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

//     // 👉 Safety Check
//     if (characterList.length === 0) {
//       Alert.alert(
//         'Error',
//         'Please select at least one option to generate password!',
//       );
//       return;
//     }

//     let generatedPassword = '';
//     for (let i = 0; i < parseInt(length); i++) {
//       const randomIndex = Math.floor(Math.random() * characterList.length);
//       generatedPassword += characterList[randomIndex];
//     }
//     setPassword(generatedPassword);
//   };

//   const copyToClipboard = () => {
//     if (password.length === 0) {
//       Alert.alert('Error', 'No password to copy!');
//       return;
//     }
//     Clipboard.setString(password);
//     Alert.alert('Success', 'Password copied to clipboard!');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Password Generator</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Length (Default 8)"
//         keyboardType="numeric"
//         value={length}
//         onChangeText={setLength}
//       />

//       <View style={styles.optionRow}>
//         <Text>Include Uppercase</Text>
//         <Switch value={useUppercase} onValueChange={setUseUppercase} />
//       </View>

//       <View style={styles.optionRow}>
//         <Text>Include Lowercase</Text>
//         <Switch value={useLowercase} onValueChange={setUseLowercase} />
//       </View>

//       <View style={styles.optionRow}>
//         <Text>Include Numbers</Text>
//         <Switch value={useNumbers} onValueChange={setUseNumbers} />
//       </View>

//       <View style={styles.optionRow}>
//         <Text>Include Symbols</Text>
//         <Switch value={useSymbols} onValueChange={setUseSymbols} />
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button title="Generate Password" onPress={generatePassword} />
//       </View>

//       {password !== '' && (
//         <>
//           <Text selectable style={styles.generatedPassword}>
//             {password}
//           </Text>

//           <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
//             <Text style={styles.copyButtonText}>Copy Password</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9F9F9',
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#DDD',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   optionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   generatedPassword: {
//     marginTop: 30,
//     fontSize: 20,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   copyButton: {
//     marginTop: 20,
//     backgroundColor: '#4CAF50',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   copyButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default App;