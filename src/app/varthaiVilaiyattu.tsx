import { useEffect, useRef, useState } from "react";
import SkeletonWord from "./skeletonWord";
import { getHint, getLetters, getMei, getUyirMei } from "@/lib/utils";
import confetti from "canvas-confetti";
import { ScrollArea } from "@/components/ui/scroll-area";
import KeyboardComponent from "./keyboardComponent";

interface VarthaiVilaiyattuProps {
    keyboardColors: boolean;
}

export default function VarthaiVilaiyattu(props: VarthaiVilaiyattuProps) {
    const domain = "https://raw.githubusercontent.com"
    const account = "dreamuth/sol"
    const path = "main/public/words.json"
    const dataUrl = `${domain}/${account}/${path}`

    const [allWords, setAllWords] = useState<string[]>([]);
    const [word, setWord] = useState<string[]>([]);
    const [guess, setGuess] = useState<string[]>(new Array(word.length).fill(''));
    const [guessIndex, setGuessIndex] = useState<number>(1);
    const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);
    const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
    const [validLetters, setValidLetters] = useState<string[]>([]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollRefP = useRef<HTMLDivElement>(null);

    let lastGuess = previousGuesses[previousGuesses.length - 1];
    let previousGuessLetters: string[] = [];
    let lastGuessMeiLetters: string[] = [];
    
    if (lastGuess) {
      previousGuessLetters = getLetters(lastGuess);
      lastGuessMeiLetters = getLetters(lastGuess).map((letter) => getMei(letter));
    }
    
    let foundWord = !!lastGuess && word.every((letter, index) => 
      (letter === previousGuessLetters[index]) || lastGuessMeiLetters.includes(getMei(letter))
    );

    function getRandomWordAndRemainingWords(words: string[]) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = getLetters(words[randomIndex]);
        const remainingWords = words.filter((_word: string, index: number) => index !== randomIndex);

        return { randomWord, remainingWords };
    }

    useEffect(() => {
        fetch(dataUrl)
            .then(response => response.json())
            .then(data => {
                if (data.words.length === 0) {
                    console.error("No words found");
                    return;
                } else {
                    const { randomWord, remainingWords } = getRandomWordAndRemainingWords(data.words);
                    setWordValue(randomWord)

                    console.log("First Word : " + randomWord);
                    // Exclude the selected word
                    setAllWords(remainingWords);
                }
            });
    }, []);

    function setWordValue(word: string[]) {
        setWord(word);
        setGuessValue(word);
    }

    function setGuessValue(word: string[]) {
        const newGuess = new Array(word.length).fill('');
        newGuess[0] = word[0];
        setGuess(newGuess);
        setGuessIndex(1);
        setPreviousGuesses([]);
    }

    useEffect(() => {
        let correctLetters: string[] = [];
        let incorrectLetters: string[] = [];
        const wordMeiLetters = word.map((letter) => getMei(letter));
        // console.log("Word Mei Letters : " + wordMeiLetters);

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
        // console.log("Correct Letters : " + correctLetters);
        // console.log("Disabled Letters : " + incorrectLetters);
        if (props.keyboardColors) {
            setValidLetters(correctLetters);
            setDisabledLetters(incorrectLetters);
        } else {
            setValidLetters([]);
            setDisabledLetters([]);
        }
    }, [previousGuesses, word, props.keyboardColors]);

    useEffect(() => {
        if (foundWord) {
            confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, [foundWord]);


    useEffect(() => {
        if (scrollRef.current && scrollRefP.current) {
            const element = scrollRef.current;
            const elementP = scrollRefP.current;
            if (elementP.scrollHeight > elementP.clientHeight) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [previousGuesses]);

    function onLetterClick(letter: string): void {
        // console.log("Letter Clicked : " + letter)
        if (guessIndex < word.length) {
            let newGuess = guess.slice();
            newGuess[guessIndex] = letter;
            setGuess(newGuess);
            setGuessIndex((guessIndex + 1));
        }
    }

    function onLetterUpdate(letter: string): void {
        // console.log("Letter Clicked : " + letter)
        if ((guessIndex - 1) < word.length) {
            let newGuess = guess.slice();
            newGuess[guessIndex - 1] = letter;
            setGuess(newGuess);
        }
    }

    function onBackspaceClick(_event: any): void {
        // console.log("Backspace Clicked")
        if (guessIndex > 1) {
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
            const newGuess = new Array(word.length).fill('');
            newGuess[0] = word[0];
            setGuess(newGuess);
            setGuessIndex(1);
        }
    }

    function onResetClick(_event: any): void {
        console.log("Reset Clicked")
        setGuessValue(word);
    }

    function onNextClick(_event: any): void {
        const { randomWord, remainingWords } = getRandomWordAndRemainingWords(allWords);
        setWordValue(randomWord);
        setAllWords(remainingWords);
        console.log("Next Clicked: " + randomWord)
    }



    return (
        <div className="flex flex-col items-center justify-center gap-2 p-4">
            <SkeletonWord word={word} />
            <div className="flex flex-col justify-start gap-2">
                <ScrollArea className="max-h-[350px] rounded-md overflow-auto gap-2" ref={scrollRefP}>
                    {
                        previousGuesses.map((previousGuess, index1) => {
                            let previousGuessLetters = getLetters(previousGuess);
                            let meiLetters = previousGuessLetters.map((letter) => getMei(letter));
                            console.log('meiLetters', meiLetters, previousGuess)

                            // console.log("Previous Guess : " + previousGuessLetters);
                            // console.log("Word : " + word);
                            // console.log("filtered : " + word.filter((letter, index) => letter !== previousGuessLetters[index]));
                            // console.log("filtered getMei : " + word.filter((letter, index) => letter !== previousGuessLetters[index]).map(letter => getMei(letter)));
                            // console.log("Letters not in right position : " + lettersNotInRightPosition);
                            
                            

                            return (
                                <div key={index1} className={`grid grid-flow-col auto-cols-max gap-2 pb-2`} ref={index1 === previousGuesses.length - 1 ? scrollRef : null}>
                                    {word.map((letter, index) => {
                                        let correctPosition = (letter === previousGuessLetters[index]) || meiLetters.includes(getMei(letter));
                                        console.log('Loop', letter, index, previousGuessLetters[index], getMei(letter), meiLetters.includes(getMei(letter)), correctPosition)
                                        //let className = correctPosition ? 'bg-green-200' : lettersNotInRightPosition.includes(getMei(letter)) ? 'bg-yellow-200' : 'bg-red-200';


                                        return (
                                            <div key={index} className={`content-center text-center border rounded drop-shadow min-w-12 min-h-8 sm:min-w-16 sm:min-h-16 `} >
                                                <p className="text sm:text-xl">{correctPosition ? word[index] : ''}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            );
                        })
                    }
                </ScrollArea>
                {
                    !foundWord && (
                        <div className={`grid grid-flow-col auto-cols-max gap-2`}>
                            {guess.map((letter, index) => (
                                <div key={index} className="content-center text-center border rounded shadow min-w-12 min-h-8 sm:min-w-16 sm:min-h-16">
                                    <p className="text sm:text-xl">{letter}</p>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
            <KeyboardComponent
                uyirMeiRow={true}
                validLetters={validLetters}
                disabledLetters={disabledLetters}
                previousGuesses={previousGuesses}
                word={word}
                guessIndex={guessIndex}
                foundWord={foundWord}
                onLetterClick={onLetterClick}
                onLetterUpdate={onLetterUpdate}
                onResetClick={onResetClick}
                onBackspaceClick={onBackspaceClick}
                onSubmitClick={onSubmitClick}
                onNextClick={onNextClick}
            />
        </div >
    );
}