'use client'
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Header from "./header";
import Solliyadi from "./solliyadi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VarthaiVilaiyattu from "./varthaiVilaiyattu";

export default function GamePage() {
  const [keyboardColors, setKeyboardColors] = useState<boolean>(true);

  const toggleKeyboardColors = () => {
    console.log("Toggle Keyboard Colors: " + !keyboardColors + " -> " + keyboardColors);
    setKeyboardColors(!keyboardColors);
  };

  return (
    <div className="w-screen">
      <Header toggleKeyboardColors={toggleKeyboardColors} keyboardColors={keyboardColors} />
      <Separator />
      <Tabs defaultValue="சொல்லியடி" className="flex flex-col items-center justify-center gap-2 p-4">
        <TabsList >
          <TabsTrigger value="சொல்லியடி">சொல்லியடி</TabsTrigger>
          <TabsTrigger value="வார்த்தை விளையாட்டு">வார்த்தை விளையாட்டு</TabsTrigger>
        </TabsList>
        <TabsContent value="சொல்லியடி">
          <Solliyadi keyboardColors={keyboardColors} />
        </TabsContent>
        <TabsContent value="வார்த்தை விளையாட்டு">
          <VarthaiVilaiyattu keyboardColors={keyboardColors} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
