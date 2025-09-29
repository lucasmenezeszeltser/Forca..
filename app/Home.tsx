import ForcaImg from "@/components/forca";
import LetterSortedList from "@/components/letterKickList";
import HiddenWorld from "@/components/hiddenWord";
import { words } from "@/constants/words";
import { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Home() {
  const [errors, setErrors] = useState(0);
  const [gameInitialized, setGameInitialized] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);
  const [word, setWord] = useState("");
  const [tip, setTip] = useState("");
  const [letterKick, setLetterKick] = useState("");
  const [lettersKickList, setLettersKickList] = useState<(string | boolean)[][]>(
    []
  );

  const startGame = () => {
    if (!gameInitialized) setGameInitialized(true);

    const segment = Math.floor(Math.random() * words.length);
    const tip = String(words[segment][0]);
    setTip(tip);

    const indexWord = Math.floor(Math.random() * words[segment][1].length);
    setWord(String(words[segment][1][indexWord]).toLowerCase());
    setErrors(0);
  };

  const restart = () => {
    setErrors(0);
    setIsLoser(false);
    setIsWinner(false);
    setLettersKickList([]);
    setLetterKick("");
    startGame();
  };

    const checkWinner = (updatedList: (string | boolean)[][]) => {
    let lettersWord = word.split("");
    let guessedLetters: string[] = [];

    updatedList.forEach((el) => {
      if (el[1] === true) guessedLetters.push(String(el[0]).toLowerCase());
    });

    let allFound = lettersWord.every((el) =>
      guessedLetters.includes(el.toLowerCase())
    );

    if (allFound) setIsWinner(true);
  };

  const kick = () => {
    if (isWinner || isLoser) {
      Alert.alert("Aviso", "Reinicie o jogo!");
      return;
    }
    if (letterKick === "") return;

    const normalizedKick = letterKick.toLowerCase();

    if (
      lettersKickList.some(
        (el) => el[0].toString().toLowerCase() === normalizedKick
      )
    ) {
      Alert.alert("Aviso", "Insira outra letra!");
      return;
    }

    if (word.includes(normalizedKick)) {
      const newList = [...lettersKickList, [normalizedKick, true]];
      setLettersKickList(newList);
      checkWinner(newList);
    } else {
      if (errors === 5) setIsLoser(true);
      const newList = [...lettersKickList, [normalizedKick, false]];
      setLettersKickList(newList);
      setErrors((prev) => prev + 1);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          {!gameInitialized && <Button onPress={startGame} title="Iniciar jogo" />}

          {(isWinner || isLoser) && (
            <View>
              <Text style={styles.text}>
                Você {isWinner ? "venceu, parabéns!" : "perdeu, tente novamente!"}
              </Text>
              <Text style={styles.text}>A palavra era: {word}</Text>
              <Button onPress={restart} title="Reiniciar" />
            </View>
          )}

          {gameInitialized && !isWinner && !isLoser && (
            <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
              <LetterSortedList letterKicks={lettersKickList} />
              <Text style={styles.text}>Tema: {tip}</Text>
              <HiddenWorld word={word} lettersKickList={lettersKickList} />
              <ForcaImg indexImg={errors} />
              <TextInput
                style={styles.input}
                value={letterKick}
                onChangeText={setLetterKick}
                placeholder="Digite uma letra"
                maxLength={1}
              />
              <Button onPress={kick} title="Chutar" />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 8,
    width: "50%",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    margin: 8,
  },
});
