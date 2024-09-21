"use client";
import bwipjs from "bwip-js/browser";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SaveAsPDF } from "@/app/SaveAsPDF";
import { refineCis } from "@/lib/utils";

export function BusinessCardDashboardComponent() {
  const [articul, setArticul] = useState("GTS248-1");
  const [size, setSize] = useState("46");
  const [color, setColor] = useState("БЕЛЫЙ");
  const [cis, setCis] = useState(
    "0104680678190348215PHppAexNfHTE\x1D9100C2\x1D929a8ZnTb3lzkvogz5YRQ7vcVBUbYbtlb9KX+8mFnv4YzKO8dNQnrw0b0ZJU+uDPaKZyKBJQQgOW1NKQXU3ef7kQ=="
  );
  const [uri, setUri] = useState("");

  useEffect(() => {
    setUri(generateDatamatrixImageFromCis(cis));
  }, [cis]);

  function generateDatamatrixImageFromCis(cis: string) {
    const canvas = document.createElement("canvas");

    const datamatrix = bwipjs.toCanvas(canvas, {
      bcid: "datamatrix",
      text: refineCis(cis),
      scale: 3,
      parsefnc: true,
    });
    const base64Image = datamatrix.toDataURL("image/png");
    console.log(base64Image);
    return base64Image;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Left column - Business Card Display */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-[580px] h-72 bg-gradient-to-r from-blue-400 to-blue-500 shadow-xl">
              <CardContent className="p-6 text-white flex items-stretch h-full">
                <div className=" flex  flex-col justify-between max-w-[200px]">
                  <div>
                    <h2 className="text-2xl font-bold">{articul}</h2>
                    <p className="text-sm mb-2">{size}</p>
                    <p className="text-sm font-semibold">{color}</p>
                  </div>
                  <div className="text-sm break-words">
                    <p>{cis.split(String.fromCharCode(29))[0]}</p>
                  </div>
                </div>

                <div
                  className="flex flex-grow items-center justify-center w-48 h-full bg-white p-1 rounded-lg ml-4"
                  aria-label="QR Code Placeholder"
                >
                  <Image src={uri} alt="datamatrix" width={200} height={200} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Form Inputs */}
          <div>
            <h1 className="text-2xl font-bold mb-6">
              Datamatrix Card Generator
            </h1>
            <form className="space-y-4">
              <div>
                <Label htmlFor="articul">Артикул</Label>
                <Input
                  id="articul"
                  value={articul}
                  onChange={(e) => setArticul(e.target.value)}
                  placeholder="GTS248-1"
                />
              </div>
              <div>
                <Label htmlFor="size">Размер</Label>
                <Input
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="46"
                />
              </div>
              <div>
                <Label htmlFor="color">Цвет</Label>
                <Input
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="белый"
                />
              </div>
              <div>
                <Label htmlFor="cis">КИЗ</Label>
                <Input
                  id="cis"
                  type="cis"
                  value={cis}
                  onChange={(e) => setCis(e.target.value)}
                  placeholder="01023456789..."
                />
              </div>

              <Button type="button" className="w-full" onClick={() => {}}>
                Generate Card
              </Button>
              <SaveAsPDF />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
