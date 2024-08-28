'use client'
import { Button } from "@/components/ui/button";
import Keyboard from "./keyboard";

interface KeyboardComponentProps {
  uyirMeiRow: boolean;
  validLetters: string[];
  disabledLetters: string[];
  previousGuesses: string[];
  word: string[];
  guessIndex: number;
  foundWord: boolean;
  onLetterClick: (letter: string) => void;
  onLetterUpdate: (letter: string) => void;
  onResetClick: (_event: any) => void;
  onBackspaceClick: (_event: any) => void;
  onSubmitClick: (_event: any) => void;
  onNextClick: (_event: any) => void;
}

export default function KeyboardComponent(props: KeyboardComponentProps) {

  return (
    <div style={{ position: 'fixed', bottom: 10, width: '100%', maxWidth: '800px' }}>
      <Keyboard
        validLetters={props.validLetters}
        disabledLetters={props.disabledLetters}
        uyirMeiRow={props.uyirMeiRow}
        onLetterClick={props.onLetterClick}
        onLetterUpdate={props.onLetterUpdate} />
      <div className="grid grid-flow-col justify-stretch m-2 gap-4">
        <Button
          variant='secondary'
          disabled={props.previousGuesses.length === 0}
          onClick={props.onResetClick}>
          Reset
        </Button>
        <Button
          variant='secondary'
          disabled={props.guessIndex === 0}
          onClick={props.onBackspaceClick}>
          Delete
        </Button>
        <Button
          variant='default'
          disabled={props.guessIndex !== props.word.length}
          onClick={props.onSubmitClick}>
          Submit
        </Button>
        <Button
          variant={props.foundWord ? 'default' : 'secondary'}
          disabled={props.foundWord ? false : true}
          onClick={props.onNextClick}>
          Next Word
        </Button>
      </div>
    </div>

  );
}