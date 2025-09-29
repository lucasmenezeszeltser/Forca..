import { StyleSheet, Text, View } from "react-native";

type props = {
  word: string;
  lettersKickList: (string | boolean)[][];
};

export default function HiddenWorld({ word, lettersKickList }: props) {
  let lettersList = word.split("");

  const guessedLetters = lettersKickList
    .filter((el) => el[1] === true)
    .map((el) => String(el[0]).toLowerCase());

  return (
    <View style={styles.container}>
      {lettersList.map((el, index) => (
        <Text key={index} style={styles.letter}>
          {guessedLetters.includes(el.toLowerCase()) ? el : "_"}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 20,
  },
  letter: {
    fontSize: 28,
    fontWeight: "bold",
    marginHorizontal: 4,
  },
});
