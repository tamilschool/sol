// header.tsx
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Info, Settings } from "lucide-react";

interface HeaderProps {
    keyboardColors: boolean;
    toggleKeyboardColors: () => void;
}

export default function Header(props: HeaderProps) {

    const renderButtons = (state: string) => (
        <div className={`content-center text-center border rounded shadow min-w-8 min-h-8 ${state}`} >
            <p className="text-xl"></p>
        </div>
    );

    return (
        <div className="flex justify-between items-center shadow">
            <div className="m-2">
                <h1 className="text-2xl font-bold text-slate-600">வார்த்தை விளையாட்டு</h1>
            </div>
            <div className="m-2 flex items-center gap-2">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Info />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>How to play</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                            <ul>
                                <li>எந்தெந்த உயிர் எழுத்துகள் அந்த சொல்லில் இருக்கும், அது எந்த வரிசையில் இருக்கும் என்பது கட்டங்களுக்கு மேலே குறிப்பாக தரப்பட்டுள்ளது.
                                    புள்ளி வைத்த இடத்தில் மெய் எழுத்து (உயிர் எழுத்தோடு கூட்டு சேராமல்) அப்படியே வரும் என்று அர்த்தம்.</li><br />
                                <li>Keyboardல் இருக்கும் மெய் எழுத்துகளை அழுத்தினாலே, உரிய உயிர்மெய் எழுத்தாக கட்டங்களில் நிரம்பும்.</li><br />
                                <li>நீங்கள் Submit செய்த சொல்லில், நிறம் மூலம் உங்களுக்கு வழிகாட்டும். அதாவது,</li>
                                <div className="flex gap-2 pb-2 pt-2">
                                    {renderButtons('bg-green-200')}
                                    <li>= சரியான எழுத்து சரியான கட்டத்தில் அமைந்திருப்பதை குறிக்கும்.</li>
                                </div>
                                <div className="flex gap-2 pb-2">
                                    {renderButtons('bg-yellow-200')}
                                    <li>=சரியான (மெய்)எழுத்து தவறான கட்டத்தில் இடம்பெற்றிருப்பதை குறிக்கும்.</li>
                                </div>
                                <div className="flex gap-2 pb-2">
                                    {renderButtons('bg-red-200')}
                                    <li>=அந்த எழுத்தே இடம்பெறவில்லை என்பதை குறிக்கும்.</li>
                                </div>
                            </ul>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogAction>Close</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Settings />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Settings</SheetTitle>
                        </SheetHeader>
                        <div className="flex justify-between items-center space-x-2 pt-8">
                            <Label htmlFor="keyboardHightlightSwitch">Highlight keyboard letters? </Label>
                            <Switch id="keyboardHightlightSwitch" onCheckedChange={props.toggleKeyboardColors} checked={props.keyboardColors} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};
