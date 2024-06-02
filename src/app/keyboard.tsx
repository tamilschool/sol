'use client'
import { Button } from "@/components/ui/button";
import { uyirLetters } from "@/lib/utils";

interface KeyboardProps {
  validLetters: string[];
  disabledLetters: string[];
  onLetterClick: (letter: string) => void;
}

export default function Keyboard({ validLetters = [], disabledLetters = [], onLetterClick }: KeyboardProps) {
  const lettersRow2 = ["க்", "ச்", "ட்", "த்", "ப்", "ற்", "ய்", "ர்", "ல்", "வ்", "ழ்", "ள்"]
  const lettersRow3 = ["ங்", "ஞ்", "ண்", "ந்", "ம்", "ன்", "ஜ்", "ஷ்", "ஸ்", "ஹ்"]

  const renderButtons = (letters: string[]) => (
    letters.map((letter, index) => (
      <Button
        key={index}
        disabled={disabledLetters.includes(letter)}
        variant={validLetters.includes(letter) ? 'default' : disabledLetters.includes(letter) ? 'destructive' : 'secondary'}
        onClick={() => onLetterClick(letter)}>
        {letter}
      </Button>
    ))
  );

  return (
    <div className="pt-2 pb-2">
      <div className="grid grid-cols-12 gap-2 m-2">
        {renderButtons(uyirLetters)}
      </div>
      <div className="grid grid-cols-12 gap-2 m-2">
        {renderButtons(lettersRow2)}
      </div>
      <div className="grid grid-cols-10 gap-2 m-2">
        {renderButtons(lettersRow3)}
      </div>
    </div >
  );
}