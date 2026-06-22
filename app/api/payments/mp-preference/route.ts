import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const mp = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { items, clientEmail, clientName, clientPhone, orderId } = await req.json();

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://idbarber.co";

    const preference = await new Preference(mp).create({
      body: {
        external_reference: orderId,
        payer: {
          name: clientName,
          email: clientEmail,
          phone: { number: clientPhone },
        },
        items: items.map((item: { name: string; quantity: number; unitPrice: number; imageUrl?: string }) => ({
          id: item.name,
          title: item.name,
          quantity: item.quantity,
          unit_price: Math.round(item.unitPrice),
          currency_id: "COP",
          picture_url: item.imageUrl,
        })),
        back_urls: {
          success: `${siteUrl}/checkout/success`,
          failure: `${siteUrl}/checkout/failure`,
          pending: `${siteUrl}/checkout/pending`,
        },
        auto_return: "approved",
        payment_methods: {
          excluded_payment_types: [],
          installments: 12,
        },
        statement_descriptor: "IDBARBER",
        notification_url: `${siteUrl}/api/payments/mp-webhook`,
      },
    });

    return NextResponse.json({
      preferenceId: preference.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
    });
  } catch (error) {
    console.error("[MP Preference]", error);
    return NextResponse.json({ error: "Error creando pago" }, { status: 500 });
  }
}
