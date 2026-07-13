import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function Contato() {
  const whatsappNumber = "5511999999999"; // Substitua pelo número real da Mara Oliveira
  const whatsappMessage = encodeURIComponent("Olá Tia Maroca! Gostaria de falar sobre as atividades pedagógicas.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-background font-body-md text-on-background scribble-bg min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20">
        
        <div className="bg-white rounded-[40px] cloud-shadow border border-outline-variant p-8 md:p-16 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-4">
              Fale com a <span className="text-primary italic">Gente!</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Tem alguma dúvida sobre os materiais, sugestões ou apenas quer dar um oi? Chame no WhatsApp, será um prazer conversar com você!
            </p>
          </div>

          <div className="relative rounded-[32px] overflow-hidden bg-on-secondary-fixed-variant p-10 flex flex-col items-center text-center gap-6">
            <div className="absolute inset-0 opacity-10">
              <span className="material-symbols-outlined text-[300px] text-white absolute -top-10 -left-10">chat</span>
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                  alt="WhatsApp Logo" 
                  className="w-12 h-12"
                />
              </div>
              <h2 className="font-headline-lg text-headline-lg text-white">Atendimento Rápido</h2>
              <p className="font-body-md text-white/90 max-w-md mx-auto">
                Clique no botão abaixo para ser redirecionado para o nosso WhatsApp.
              </p>
            </div>

            <div className="relative z-10 w-full mt-4">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white font-headline-md text-headline-md px-10 py-5 rounded-full inline-flex items-center gap-3 transition-all transform hover:scale-105 shadow-xl w-full justify-center md:w-auto"
              >
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  forum
                </span>
                Chamar no WhatsApp
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
