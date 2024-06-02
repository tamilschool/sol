'use client'
import { Button } from "@/components/ui/button";
import { getHint, getLetters, getMei, getUyirMei } from "@/lib/utils";
import { useEffect, useState } from "react";
import Keyboard from "./keyboard";
import { Skeleton } from "@/components/ui/skeleton";
import confetti from 'canvas-confetti';

// Link copied, You're now ready!
// Mock URL
// https://run.mocky.io/v3/2e2bbaab-d24c-42d1-b0f5-ef8c1057c911
// Secret delete link
// https://designer.mocky.io/manage/delete/2e2bbaab-d24c-42d1-b0f5-ef8c1057c911/oKniuB1l6QiTwWXrOQvv22YW8Vz4BDmRqCoq
// 

export default function GamePage() {
  const [allWords, setAllWords] = useState<string[]>([]);
  const [word, setWord] = useState<string[]>([]);
  const [guess, setGuess] = useState<string[]>(new Array(word.length).fill(''));
  const [guessIndex, setGuessIndex] = useState<number>(0);
  const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
  const [validLetters, setValidLetters] = useState<string[]>([]);

  let lastGuess = previousGuesses[previousGuesses.length - 1];
  let foundWord = lastGuess && getLetters(lastGuess).every((letter, index) => letter === word[index]);


  function getRandomWordAndRemainingWords(words: string[]) {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = getLetters(words[randomIndex]);
    const remainingWords = words.filter((_word: string, index: number) => index !== randomIndex);

    return { randomWord, remainingWords };
  }

  useEffect(() => {
    fetch('https://run.mocky.io/v3/2e2bbaab-d24c-42d1-b0f5-ef8c1057c911')
      .then(response => response.json())
      .then(data => {
        if (data.words.length === 0) {
          console.error("No words found");
          return;
        } else {
          const { randomWord, remainingWords } = getRandomWordAndRemainingWords(data.words);
          setWord(randomWord);
          setGuess(new Array(randomWord.length).fill(''));
          console.log("First Word : " + randomWord);
          // Exclude the selected word
          setAllWords(remainingWords);
        }
      });
  }, []);

  useEffect(() => {
    let correctLetters: string[] = [];
    let incorrectLetters: string[] = [];
    const wordMeiLetters = word.map((letter) => getMei(letter));
    console.log("Word Mei Letters : " + wordMeiLetters);

    previousGuesses.forEach((previousGuess) => {
      let previousGuessMeiLetters = getLetters(previousGuess).map((letter) => getMei(letter));
      // console.log("Previous Guess Mei Letters : " + previousGuessMeiLetters);
      incorrectLetters.push(
        ...previousGuessMeiLetters.filter(letter => !wordMeiLetters.includes(letter))
      );
      correctLetters.push(
        ...previousGuessMeiLetters.filter(letter => wordMeiLetters.includes(letter))
      );
    });
    console.log("Correct Letters : " + correctLetters);
    console.log("Disabled Letters : " + incorrectLetters);
    setValidLetters(correctLetters);
    setDisabledLetters(incorrectLetters);
  }, [previousGuesses, word]);

  useEffect(() => {
    if (foundWord) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [foundWord]);

  function onLetterClick(letter: string): void {
    // console.log("Letter Clicked : " + letter)
    if (guessIndex < word.length) {
      let newGuess = guess.slice();
      const uyirLetter = getHint(word[guessIndex]);
      newGuess[guessIndex] = getUyirMei(uyirLetter, letter);
      setGuess(newGuess);
      setGuessIndex((guessIndex + 1));
    }
  }

  function onBackspaceClick(_event: any): void {
    // console.log("Backspace Clicked")
    if (guessIndex > 0) {
      let newGuess = guess.slice();
      newGuess[guessIndex - 1] = '';
      setGuess(newGuess);
      setGuessIndex((guessIndex - 1));
    }
  }

  function onSubmitClick(_event: any): void {
    if (guessIndex === word.length) {
      console.log("Submit Clicked: ", guess.join(''))
      setPreviousGuesses([...previousGuesses, guess.join('')]);
      setGuess(new Array(word.length).fill(''));
      setGuessIndex(0);
    }
  }

  function onResetClick(_event: any): void {
    console.log("Reset Clicked")
    setPreviousGuesses([]);
    setGuess(new Array(word.length).fill(''));
    setGuessIndex(0);
  }

  function onNextClick(_event: any): void {
    const { randomWord, remainingWords } = getRandomWordAndRemainingWords(allWords);
    setWord(randomWord);
    setGuess(new Array(randomWord.length).fill(''));
    setPreviousGuesses([]);
    setGuessIndex(0);
    setAllWords(remainingWords);
    console.log("Next Clicked: " + randomWord)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* <div className="flex items-center gap-4">
        <Label className="whitespace-nowrap" htmlFor="wordSizeSelect">Word Size</Label>
        <Select
          onValueChange={(value: number) => {
            console.log("Updating : " + wordSize + " : to : " + value)
            setWordSize(value)
          }}
          value={wordSize.toString()}
        >
          <SelectTrigger id="wordSizeSelect">
            <SelectValue placeholder="4" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      {word.length === 0 &&
        <div>
          <div className={"grid grid-flow-col auto-cols-4 gap-4 pb-2"}>
            {[1, 2, 3, 4].map((_letter, index) => (
              <Skeleton key={index} className="bg-slate-100 content-center text-center border rounded drop-shadow min-w-16 min-h-16 font-bold">
                <p className="text-xl"></p>
              </Skeleton>
            ))}
          </div>
          <div className={`grid grid-flow-col auto-cols-4 gap-4`}>
            {[1, 2, 3, 4].map((_letter, index) => (
              <Skeleton key={index} className="content-center text-center border rounded shadow min-w-16 min-h-16">
                <p className="text-xl"></p>
              </Skeleton>
            ))}
          </div>
        </div>
      }

      <div className={`grid grid-flow-col auto-cols-max gap-4`}>
        {word.map((letter, index) => (
          <div key={index} className="bg-slate-100 content-center text-center border rounded drop-shadow min-w-16 min-h-16 font-bold">
            <p className="text-xl">{getHint(letter)}</p>
          </div>
        ))}
      </div>
      {
        previousGuesses.map((previousGuess, index1) => {
          let previousGuessLetters = getLetters(previousGuess);
          let lettersNotInRightPosition = word.filter((letter, index) => letter !== previousGuessLetters[index]).map(letter => getMei(letter));

          // console.log("Previous Guess : " + previousGuessLetters);
          // console.log("Word : " + word);
          // console.log("filtered : " + word.filter((letter, index) => letter !== previousGuessLetters[index]));
          // console.log("filtered getMei : " + word.filter((letter, index) => letter !== previousGuessLetters[index]).map(letter => getMei(letter)));
          // console.log("Letters not in right position : " + lettersNotInRightPosition);

          return (
            <div key={index1} className={`grid grid-flow-col auto-cols-max gap-4`}>
              {previousGuessLetters.map((letter, index) => {
                let correctPosition = letter === word[index];
                let className = correctPosition ? 'bg-green-200' : lettersNotInRightPosition.includes(getMei(letter)) ? 'bg-yellow-200' : 'bg-red-200';

                // Remove the letter from lettersNotInRightPosition
                if (className === 'bg-yellow-200') {
                  const index = lettersNotInRightPosition.indexOf(getMei(letter));
                  if (index !== -1) {
                    lettersNotInRightPosition.splice(index, 1);
                  }
                }

                return (
                  <div key={index} className={`content-center text-center border rounded shadow min-w-16 min-h-16 ${className}`} >
                    <p className="text-xl">{letter}</p>
                  </div>
                )
              })}
            </div>
          );
        })
      }
      {
        !foundWord && (
          <div className={`grid grid-flow-col auto-cols-max gap-4`}>
            {guess.map((letter, index) => (
              <div key={index} className="content-center text-center border rounded shadow min-w-16 min-h-16">
                <p className="text-xl">{letter}</p>
              </div>
            ))}
          </div>
        )
      }
      <div>
        <Keyboard
          validLetters={validLetters}
          disabledLetters={disabledLetters}
          onLetterClick={onLetterClick} />
        <div className="grid grid-flow-col justify-stretch m-2 gap-4">
          <Button
            variant='secondary'
            disabled={previousGuesses.length === 0}
            onClick={onResetClick}>
            Reset
          </Button>
          <Button
            variant='secondary'
            disabled={guessIndex === 0}
            onClick={onBackspaceClick}>
            Delete
          </Button>
          <Button
            variant='default'
            disabled={guessIndex !== word.length}
            onClick={onSubmitClick}>
            Submit
          </Button>
          <Button
            variant={foundWord ? 'default' : 'secondary'}
            disabled={foundWord ? false : true}
            onClick={onNextClick}>
            Next Word
          </Button>
        </div>
      </div>
    </div >
  );
}
