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
  const lettersRow3 = ["ங்", "ஞ்", "ண்", "ந்", "ம்", "ன்", "ஃ", "ஜ்", "ஷ்", "ஸ்", "ஹ்", "ஃ"]

  const renderButtons = (letters: string[]) => (
    letters.map((letter, index) => (
      <Button className="pl-1 sm:pl-2 pr-1 sm:pr-2"
        key={index}
        disabled={disabledLetters.includes(letter)}
        variant={validLetters.includes(letter) ? 'default' : disabledLetters.includes(letter) ? 'destructive' : 'secondary'}
        onClick={() => onLetterClick(letter)}>
        {letter}
      </Button>
    ))
  );

  return (
    <div className="p-2">
      <div className="grid grid-cols-12 gap-1 sm:gap-2 m-1 sm:m-2">
        {renderButtons([...uyirLetters, ...lettersRow2, ...lettersRow3])}
      </div>
    </div>
  );
}