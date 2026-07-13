import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function Sobre() {
  return (
    <div className="bg-background font-body-md text-on-background scribble-bg min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20">
        <div className="bg-white rounded-[40px] cloud-shadow border border-outline-variant p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 rainbow-gradient opacity-10 blur-3xl rounded-full scale-125"></div>
            <div className="relative bg-white p-4 rounded-[40px] cloud-shadow border-4 border-primary-container">
              <img
                src="/mara.jpg"
                alt="Professora Mara Oliveira"
                className="rounded-[32px] w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary-container p-6 rounded-3xl shadow-xl border-4 border-white transform rotate-3">
                <p className="font-headline-md text-headline-md text-on-secondary-container">
                  Mara Oliveira
                </p>
                <p className="font-label-lg text-label-lg text-secondary">
                  Pedagoga e Psicopedagoga especialista em Tea
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary-fixed px-4 py-1 rounded-full text-on-primary-fixed font-label-lg text-label-lg">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              Sobre mim
            </div>
            
            <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight">
              Muito prazer, eu sou a <span className="text-primary italic">Tia Maroca!</span>
            </h1>
            
            <div className="font-body-lg text-body-lg text-on-surface-variant space-y-4">
              <p>
                Olá! Meu nome é Mara Oliveira. Sou pedagoga apaixonada pela educação infantil e acredito que o aprendizado deve ser uma jornada lúdica, cheia de descobertas e amor.
              </p>
              <p>
                Criei o espaço "Tia Maroca" com o objetivo de compartilhar materiais pedagógicos criativos que auxiliam professores e pais a tornarem o dia a dia das crianças mais rico e estimulante. 
              </p>
              <p>
                Aqui você encontrará atividades pensadas com muito carinho para apoiar o desenvolvimento cognitivo e motor, sempre com aquele toque especial de diversão!
              </p>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
