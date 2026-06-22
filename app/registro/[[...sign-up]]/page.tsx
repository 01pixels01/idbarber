import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Crear cuenta — Barber Shop Pro",
};

export default function RegistroPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#0A0A0A] font-bold text-lg">
              ✂️
            </div>
            <span className="font-bold text-xl">
              Barber<span className="text-[#D4AF37]">Shop</span> Pro
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Crea tu cuenta</h1>
          <p className="text-[#888888]">Reserva citas, acumula puntos y compra productos</p>
        </div>

        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-[#111111] border border-white/10 shadow-2xl rounded-2xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "bg-[#1A1A1A] border border-white/10 text-white hover:bg-[#222222] hover:border-white/20 transition-all",
              dividerLine: "bg-white/10",
              dividerText: "text-[#888888]",
              formFieldLabel: "text-white text-sm font-medium",
              formFieldInput:
                "bg-[#0A0A0A] border border-white/10 text-white placeholder-[#888888] focus:border-[#D4AF37]/60 rounded-xl",
              formButtonPrimary:
                "bg-[#D4AF37] text-[#0A0A0A] font-semibold hover:bg-[#E8C84A] transition-all rounded-xl",
              footerActionLink: "text-[#D4AF37] hover:text-[#E8C84A]",
              formFieldErrorText: "text-red-400",
            },
          }}
        />
      </div>
    </div>
  );
}
