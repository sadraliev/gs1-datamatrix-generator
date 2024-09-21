// https://www.cleverence.ru/support/77127/
// https://www.cleverence.ru/support/139408/
// https://github.com/bwipp/postscriptbarcode/wiki
import bwipjs from "bwip-js/node";
import { error } from "console";
import { SaveAsPDF } from "./SaveAsPDF";

export default async function Home() {
  const codes = [
    `0104680678190348215PHppAexNfHTE\x1D9100C2\x1D929a8ZnTb3lzkvogz5YRQ7vcVBUbYbtlb9KX+8mFnv4YzKO8dNQnrw0b0ZJU+uDPaKZyKBJQQgOW1NKQXU3ef7kQ==`,
    `0104680678190348215I<dHcrdXE"w&\x1D9100C2\x1D92bkZ++/7L326AedZScral6iAPXB/R29wdFmFj2ki0ctGGhhCjULsJ+Tnz8M1EI2Vnc+EP0MlzNHVWoZt4QWXJNw==`,
    `0104680678190355215xjCpvcig?6W*\x1D9180C1\x1D92eyS4oCInehPfzWtQ57DExD8XoTTQ+KSQaJNhgbHCtQmin/ipkUwXFH7eqeQzrMMaVJcFI6BRK1tQOgbYT2YvBA==`,
    `0104680678190355215Na'"Vco5tSK3\x1D9180C1\x1D92zscRSgULhZ+MyvBd4KJLMLx9cRMuoSB342SvIh+t8jBXTSHRraLhlFwZmOOGTYHLxohrnwoFSyHoA4c48EKdvw==`,
    `0104680678190362215Sv=pKlVEjUoi\x1D9180C1\x1D926nMPK6PbXD+5xgQUiHwElYL7p+CBkddmUKW6HrpGY16rIr1bcaEQVTPvyn0cDFOy5sX0ajxN2FyQUULWyLTEBA==`,
  ];

  const cises = refineGS1DataMatrix(codes);

  const images = await Promise.all(
    cises.map((cis) => generateDatamatrixImage(cis))
  );

  console.log(cises);

  return (
    <div className="container">
      <div id="data-matrix-container" className="flex justify-center flex-wrap">
        {images.map((code, index) => (
          <div key={index} className="p-[100px]">
            <img width={200} src={code} alt={code} />
          </div>
        ))}
      </div>
      <SaveAsPDF />
    </div>
  );
}

function refineGS1DataMatrix(codes: string[]): string[] {
  const GS = String.fromCharCode(29);
  const FunctionCode1 = "^FNC1";

  return codes
    .map((code) => code.replace(/\\x1D/g, GS))
    .map((code) =>
      code.startsWith(FunctionCode1) ? code : `${FunctionCode1}${code}`
    );
}

async function generateDatamatrixImage(data: string): Promise<string> {
  try {
    const pngBuffer = await bwipjs.toBuffer({
      bcid: "datamatrix",
      text: data,
      scale: 3,
      parsefnc: true,
    });

    const base64Image = pngBuffer.toString("base64");
    const imgSrc = `data:image/png;base64,${base64Image}`;
    return imgSrc;
  } catch (err) {
    console.error("Ошибка при генерации DataMatrix:", err);
    throw error;
  }
}
