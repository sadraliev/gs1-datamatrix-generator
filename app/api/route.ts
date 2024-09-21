// https://www.cleverence.ru/support/77127/
// https://www.cleverence.ru/support/139408/
// https://github.com/bwipp/postscriptbarcode/wiki
import bwipjs from "bwip-js/node";

export type PostGenerateDatamatrixByCisRequest = {
  cis: string;
};

export type PostGenerateDatamatrixByCisResponse = {
  uri: string;
};

export async function POST(req: Request) {
  const { cis } = (await req.json()) as PostGenerateDatamatrixByCisRequest;

  const imageUri = await generateDatamatrixImageFromCis(cis);

  return Response.json([{ uri: imageUri }]);
}

export function refineCis(code: string): string {
  const GS = String.fromCharCode(29);
  const FunctionCode1 = "^FNC1";

  const refined = code.replace(/\\x1D/g, GS);

  return code.startsWith(FunctionCode1)
    ? refined
    : `${FunctionCode1}${refined}`;
}

async function generateDatamatrixImageFromCis(cis: string): Promise<string> {
  try {
    const pngBuffer = await bwipjs.toBuffer({
      bcid: "datamatrix",
      text: refineCis(cis),
      scale: 3,
      parsefnc: true,
    });

    const base64Image = pngBuffer.toString("base64");
    const imgSrc = `data:image/png;base64,${base64Image}`;
    return imgSrc;
  } catch (err) {
    console.error("Ошибка при генерации DataMatrix:", err);
    throw err;
  }
}
