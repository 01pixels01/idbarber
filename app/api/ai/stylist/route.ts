import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mediaType } = await req.json();

    if (!imageBase64 || !mediaType) {
      return NextResponse.json({ error: "Imagen requerida" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${mediaType};base64,${imageBase64}`,
                detail: "high",
              },
            },
            {
              type: "text",
              text: `Eres un experto barbero y asesor de imagen de alto nivel. Analiza la forma del rostro en esta imagen y devuelve ÚNICAMENTE un objeto JSON válido (sin texto adicional, sin markdown, sin bloques de código) con esta estructura exacta:
{
  "faceShape": "oval" | "square" | "round" | "heart",
  "faceShapeLabel": "Oval" | "Cuadrado" | "Redondo" | "Corazón",
  "cut": "nombre del corte ideal específico",
  "beard": "recomendación de barba específica y detallada",
  "products": ["producto1", "producto2", "producto3"],
  "reasoning": "explicación personal en español de por qué este estilo funciona para esta forma facial (2-3 oraciones cálidas y motivadoras)"
}

Detecta con precisión la forma facial basándote en la proporción frente-mandíbula-pómulos-longitud. Sé específico, personalizado y motivador en las recomendaciones.`,
            },
          ],
        },
      ],
    });

    const text = response.choices[0]?.message?.content?.trim();
    if (!text) throw new Error("Sin respuesta del modelo");

    const result = JSON.parse(text);
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Stylist error:", error);
    return NextResponse.json(
      { error: "Error al analizar la imagen. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
