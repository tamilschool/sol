import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type WordList = {
  words: string[];
};

export const uyirLetters: string[] = ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"];

export const meiLetters: string[] = [
  "க்",
  "ங்",
  "ச்",
  "ஞ்",
  "ட்",
  "ண்",
  "த்",
  "ந்",
  "ப்",
  "ம்",
  "ய்",
  "ர்",
  "ல்",
  "வ்",
  "ழ்",
  "ள்",
  "ற்",
  "ன்",
];
const uyirMeiLetters: string[] = [
  "க",
  "கா",
  "கி",
  "கீ",
  "கு",
  "கூ",
  "கெ",
  "கே",
  "கை",
  "கொ",
  "கோ",
  "கௌ",
  "ங",
  "ஙா",
  "ஙி",
  "ஙீ",
  "ஙு",
  "ஙூ",
  "ஙெ",
  "ஙே",
  "ஙை",
  "ஙொ",
  "ஙோ",
  "ஙௌ",
  "ச",
  "சா",
  "சி",
  "சீ",
  "சு",
  "சூ",
  "செ",
  "சே",
  "சை",
  "சொ",
  "சோ",
  "சௌ",
  "ஞ",
  "ஞா",
  "ஞி",
  "ஞீ",
  "ஞு",
  "ஞூ",
  "ஞெ",
  "ஞே",
  "ஞை",
  "ஞொ",
  "ஞோ",
  "ஞௌ",
  "ட",
  "டா",
  "டி",
  "டீ",
  "டு",
  "டூ",
  "டெ",
  "டே",
  "டை",
  "டொ",
  "டோ",
  "டௌ",
  "ண",
  "ணா",
  "ணி",
  "ணீ",
  "ணு",
  "ணூ",
  "ணெ",
  "ணே",
  "ணை",
  "ணொ",
  "ணோ",
  "ணௌ",
  "த",
  "தா",
  "தி",
  "தீ",
  "து",
  "தூ",
  "தெ",
  "தே",
  "தை",
  "தொ",
  "தோ",
  "தௌ",
  "ந",
  "நா",
  "நி",
  "நீ",
  "நு",
  "நூ",
  "நெ",
  "நே",
  "நை",
  "நொ",
  "நோ",
  "நௌ",
  "ப",
  "பா",
  "பி",
  "பீ",
  "பு",
  "பூ",
  "பெ",
  "பே",
  "பை",
  "பொ",
  "போ",
  "பௌ",
  "ம",
  "மா",
  "மி",
  "மீ",
  "மு",
  "மூ",
  "மெ",
  "மே",
  "மை",
  "மொ",
  "மோ",
  "மௌ",
  "ய",
  "யா",
  "யி",
  "யீ",
  "யு",
  "யூ",
  "யெ",
  "யே",
  "யை",
  "யொ",
  "யோ",
  "யௌ",
  "ர",
  "ரா",
  "ரி",
  "ரீ",
  "ரு",
  "ரூ",
  "ரெ",
  "ரே",
  "ரை",
  "ரொ",
  "ரோ",
  "ரௌ",
  "ல",
  "லா",
  "லி",
  "லீ",
  "லு",
  "லூ",
  "லெ",
  "லே",
  "லை",
  "லொ",
  "லோ",
  "லௌ",
  "வ",
  "வா",
  "வி",
  "வீ",
  "வு",
  "வூ",
  "வெ",
  "வே",
  "வை",
  "வொ",
  "வோ",
  "வௌ",
  "ழ",
  "ழா",
  "ழி",
  "ழீ",
  "ழு",
  "ழூ",
  "ழெ",
  "ழே",
  "ழை",
  "ழொ",
  "ழோ",
  "ழௌ",
  "ள",
  "ளா",
  "ளி",
  "ளீ",
  "ளு",
  "ளூ",
  "ளெ",
  "ளே",
  "ளை",
  "ளொ",
  "ளோ",
  "ளௌ",
  "ற",
  "றா",
  "றி",
  "றீ",
  "று",
  "றூ",
  "றெ",
  "றே",
  "றை",
  "றொ",
  "றோ",
  "றௌ",
  "ன",
  "னா",
  "னி",
  "னீ",
  "னு",
  "னூ",
  "னெ",
  "னே",
  "னை",
  "னொ",
  "னோ",
  "னௌ",
];

export function getHint(value: string): string {
  if (value.length === 0) {
    return "";
  } else if (uyirLetters.includes(value)) {
    return value;
  } else if (meiLetters.includes(value)) {
    return "◌்";
  } else if (uyirMeiLetters.includes(value)) {
    return uyirLetters[uyirMeiLetters.indexOf(value) % 12];
  } else {
    return value;
  }
}

export function getUyirMei(uyir: string, selected: string): string {
  const uyirIndex = uyirLetters.indexOf(uyir);
  const meiIndex = meiLetters.indexOf(selected);

  if (uyirIndex === -1 || meiIndex === -1) {
    return selected;
  }
  // console.log(uyirIndex, meiIndex);
  return uyirMeiLetters[uyirIndex + meiIndex * 12];
}

export function getMei(value: string): string {
  if (value.length === 0) {
    return "";
  } else if (uyirLetters.includes(value) || meiLetters.includes(value)) {
    return value;
  } else if (uyirMeiLetters.includes(value)) {
    // console.log("getMei - value: ", value);
    // console.log("getMei - uyirMeiLetters.indexOf(value): ", uyirMeiLetters.indexOf(value));
    // console.log("getMei - uyirMeiLetters.indexOf(value) / 12: ", Math.floor(uyirMeiLetters.indexOf(value) / 12));
    // console.log(
    //   "getMei - meiLetters[Math.floor(uyirMeiLetters.indexOf(value) / 12)]: ",
    //   meiLetters[Math.floor(uyirMeiLetters.indexOf(value) / 12)]
    // );
    return meiLetters[Math.floor(uyirMeiLetters.indexOf(value) / 12)];
  } else {
    return value;
  }
}

export function getLetters(word: string): string[] {
  const letters: string[] = [];
  const charArray: string[] = word.split("");

  for (const char of charArray) {
    const charCode = char.charCodeAt(0);

    switch (charCode) {
      // Space, Dot
      case 32:
      case 39:
      case 44:
      case 46:
      case 58:
      case 8204:
        // Do nothing
        break;
      default:
        if (charCode >= 3006 && charCode <= 3021) {
          // Append to the last element
          letters[letters.length - 1] += char;
        } else {
          // Add as a new element
          letters.push(char);
        }
    }
  }

  return letters;
}
