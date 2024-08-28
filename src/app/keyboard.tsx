'use client'
import { Button } from "@/components/ui/button";
import { meiLetters, uyirLetters, uyirMeiLetters } from "@/lib/utils";
import { useState } from "react";

interface KeyboardProps {
  validLetters: string[];
  disabledLetters: string[];
  uyirMeiRow: boolean;
  onLetterClick: (letter: string) => void;
  onLetterUpdate: (letter: string) => void;
}

export default function Keyboard({ validLetters = [], disabledLetters = [], uyirMeiRow, onLetterClick, onLetterUpdate }: KeyboardProps) {
  const lettersRow2 = ['க்', 'ச்', 'ட்', 'த்', 'ப்', 'ற்', 'ய்', 'ர்', 'ல்', 'வ்', 'ழ்', 'ள்']
  const lettersRow3 = ['ங்', 'ஞ்', 'ண்', 'ந்', 'ம்', 'ன்', '', 'ஜ்', 'ஷ்', 'ஸ்', 'ஹ்', 'ஃ']
  const [dynamicLetters, setDynamicLetters] = useState<string[]>(uyirMeiRow ? new Array(12).fill('') : []);

  const renderButtons = (letters: string[]) => (
    letters.map((letter, index) => (
      <Button className="pl-1 sm:pl-2 pr-1 sm:pr-2"
        key={index}
        disabled={disabledLetters.includes(letter) || letter === ''}
        variant={validLetters.includes(letter) ? 'default' : disabledLetters.includes(letter) ? 'destructive' : 'secondary'}
        onClick={() => {
          if (uyirMeiRow) {
            if (dynamicLetters.includes(letter)) {
              onLetterUpdate(letter)
            } else {
              onLetterClick(letter)
              if (meiLetters.includes(letter)) {
                const meiIndex = meiLetters.indexOf(letter)
                const target = uyirMeiLetters.slice(meiIndex * 12, (meiIndex + 1) * 12)
                setDynamicLetters(target)
              } else {
                setDynamicLetters(new Array(12).fill(''));
              }
            }
          } else {
            onLetterClick(letter)
          }
        }}>
        {letter}
      </Button>
    ))
  );

  return (
    <div className="p-2">
      <div className="grid grid-cols-12 gap-1 sm:gap-2 m-1 sm:m-2">
        {renderButtons([...uyirLetters, ...lettersRow2, ...lettersRow3, ...dynamicLetters])}
      </div>
    </div>
  );
}