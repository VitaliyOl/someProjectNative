import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import AddUserImage from "../../Components/AddUserImage";
import { registerDB } from "../../redux/auth/AuthOperation";
import { useDispatch } from "react-redux";

const registrationState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [image, setImage] = useState(null);
  const [state, setState] = useState(registrationState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [emailError, setEmailError] = useState("");

  const { height, width } = useWindowDimensions();

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLoadImage = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
        console.log(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveImage = async () => {
    if (image) {
      try {
        await FileSystem.deleteAsync(image, { idempotent: true });
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFocus = (input) => setIsFocused(input);
  const handleBlur = () => setIsFocused(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    if (!validateEmail(state.email)) {
      setEmailError("Невірний формат електронної пошти");
      return;
    }

    setEmailError("");
    setState(registrationState);
    dispatch(registerDB({ ...state, avatar: image }));
  };

  return (
    <ImageBackground
      source={require("../../assets/img/bgImage.jpg")}
      style={{ position: "absolute", width: width, height: height }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -206 : -206}
        >
          <View style={styles.thumb}>
            <AddUserImage
              onImage={image}
              onLoad={handleLoadImage}
              onDelete={handleRemoveImage}
            />

            <Text style={styles.titleRegistration}>Реєстрація</Text>

            <View style={styles.form}>
              <TextInput
                style={[
                  styles.input,
                  isFocused === "login" && styles.inputFocus,
                ]}
                placeholder="Логін"
                value={state.login}
                onChangeText={(value) =>
                  setState((prev) => ({ ...prev, login: value }))
                }
                onFocus={() => {
                  handleFocus("login");
                }}
                onBlur={handleBlur}
              />
              <TextInput
                style={[
                  styles.input,
                  isFocused === "email" && styles.inputFocus,
                ]}
                placeholder="Адреса електронної пошти"
                value={state.email}
                onChangeText={(value) => {
                  setState((prev) => ({
                    ...prev,
                    email: value,
                  }));
                  setEmailError("");
                }}
                onFocus={() => {
                  handleFocus("email");
                }}
                onBlur={handleBlur}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    isFocused === "password" && styles.inputFocus,
                  ]}
                  placeholder="Пароль"
                  secureTextEntry={secureTextEntry}
                  value={state.password}
                  onChangeText={(value) => {
                    setState((prev) => ({
                      ...prev,
                      password: value,
                    }));
                  }}
                  onFocus={() => {
                    handleFocus("password");
                    Keyboard.dismiss;
                  }}
                  onBlur={handleBlur}
                />

                <TouchableOpacity
                  style={styles.passwordButton}
                  onPress={toggleSecureTextEntry}
                >
                  <Text style={styles.passwordTitle}>
                    {secureTextEntry ? "Показати" : "Приховати"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.registerTitle}>Зареєстуватися</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            >
              <Text style={styles.loginTitle}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  thumb: {
    paddingTop: 92,
    paddingBottom: 78,
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#FFFFFF",
  },

  titleRegistration: {
    marginBottom: 32,
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    lineHeight: 35,
    textAlign: "center",
  },
  form: {
    gap: 16,
  },
  input: {
    padding: 16,
    height: 50,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    backgroundColor: "#F6F6F6",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  registerTitle: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
  },
  passwordContainer: {
    marginBottom: 43,
  },

  passwordButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 16,
  },
  passwordTitle: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
  },
  loginTitle: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    lineHeight: 19,
    color: "#1B4371",
  },
  inputFocus: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
});

export default RegistrationScreen;
