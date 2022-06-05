import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import bg from "./assets/bg.jpeg";
export default function App() {
  const [map, setMap] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [currentTurn, setCurrentTurn] = useState("X");
  

  const onPress = (rowIndex, columnIndex) => {
    Alert.alert("It worked", rowIndex, columnIndex);
    if (map[rowIndex][columnIndex] !== "") {
      Alert.alert("Position occupied");
      return;
    }
    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = currentTurn;
      return updatedMap;
    });

    setCurrentTurn(currentTurn === "X" ? "O" : "X");
    checkWinningState();
  };
  const checkWinningState = () => {
    // for row
    for (let i = 0; i < 3; i++) {
      const isRowXWinning = map[i].every((cell) => cell === "X");
      const isRowOWinning = map[i].every((cell) => cell === "O");

      if (isRowXWinning) {
        gameWon("X");
      }
      if (isRowOWinning) {
        gameWon("O");
      }
    }
    //for column
    for (let col = 0; col < 3; col++) {
      let isColumnXWinner = true;
      let isColumnOWinner = true;
      for (let row = 0; row < 3; row++) {
        if (map[row][col] !== "X") {
          isColumnXWinner = false;
        }
        if (map[row][col] !== "O") {
          isColumnOWinner = false;
        }
      }

      if (isColumnXWinner) {
        gameWon("X");
      }
      if (isColumnOWinner) {
        gameWon("O");
      }
    }

    // check diagonals
    let isDiagonal1OWinning = true;
    let isDiagonal1XWinning = true;
    let isDiagonal2OWinning = true;
    let isDiagonal2XWinning = true;
    for (let i = 0; i < 3; i++) {
      if (map[i][i] !== "O") {
        isDiagonal1OWinning = false;
      }
      if (map[i][i] !== "X") {
        isDiagonal1XWinning = false;
      }

      if (map[i][2 - i] !== "O") {
        isDiagonal2OWinning = false;
      }
      if (map[i][2 - i] !== "X") {
        isDiagonal2XWinning = false;
      }
    }

    if (isDiagonal1OWinning || isDiagonal2OWinning) {
      gameWon("O");
    }
    if (isDiagonal1XWinning || isDiagonal2XWinning) {
      gameWon("X");
    }
  
}
  const gameWon = (player) => {
    console.log(`Huraaay`, `Player ${player} won`, [
      {
        text: "Restart",
        onPress: resetGame,
      },
    ]);
  };
  const resetGame = () => {
    setMap([
      ["", "", ""], // 1st row
      ["", "", ""], // 2nd row
      ["", "", ""], // 3rd row
    ]);
    setCurrentTurn("x");
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMethod="auto">
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Pressable
                  onPress={() => onPress(rowIndex, columnIndex)}
                  style={styles.cell}
                >
                  {cell === "O" && <View style={styles.circle}></View>}
                  {cell === "X" && (
                    <View style={styles.crossCont}>
                      <View style={styles.crossLine}></View>
                      <View
                        style={[, styles.crossLine, styles.crossLine2]}
                      ></View>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          ))}

          {/* <View style={styles.circle}></View> */}

          {/* <View style={styles.crossCont}>
    <View style={styles.crossLine}></View>
    <View style={[,styles.crossLine,styles.crossLine2]}></View>
   
    </View> */}
        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.94,
    backgroundColor: "#242D34",
    alignItems: "center",
    justifyContent: "center",
  },
  bg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    aspectRatio: 1,
    paddingTop: 45,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    borderColor: "white",
    borderWidth: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    width: 75,
    borderRadius: 50,
  },
  crossCont: {},
  crossLine: {
    position: "absolute",

    width: 13,
    height: 75,
    top: -30,
    left: -15,
    backgroundColor: "white",
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },
  crossLine2: {
    transform: [
      {
        rotate: "-45deg",
      },
    ],
  },
});
