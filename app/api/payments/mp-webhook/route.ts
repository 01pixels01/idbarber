import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { prisma } from "@/lib/db";

const mp = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type !== "payment") {
      return NextResponse.json({ ok: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) return NextResponse.json({ ok: true });

    const payment = await new Payment(mp).get({ id: paymentId });

    const orderId = payment.external_reference;
    if (!orderId) return NextResponse.json({ ok: true });

    const status =
      payment.status === "approved"
        ? "PAID"
        : payment.status === "pending" || payment.status === "in_process"
        ? "PENDING"
        : "CANCELLED";

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        stripeId: String(paymentId),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[MP Webhook]", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
