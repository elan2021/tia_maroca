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
                  Pedagoga e Psicopedagoga Especialista em Tea
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
              Muito prazer, eu sou a <span className="text-primary italic">Mara Oliveira!</span>
            </h1>
            
            <div className="font-body-lg text-body-lg text-on-surface-variant space-y-4">
              <p>
                Minha jornada na educação começou em 2017, quando me formei em Pedagogia e descobri minha verdadeira vocação: transformar a forma como as crianças aprendem. De lá para cá, minha trajetória foi marcada pelo estudo constante e por uma paixão profunda pelo desenvolvimento infantil.
              </p>
              <p>
                Ah, e caso você esteja se perguntando, <strong>Tia Maroka</strong> é como as crianças com as quais eu trabalho me chamam carinhosamente, e eu adotei esse nome com muito amor!
              </p>
              <p>
                Sou pós-graduada em Psicopedagogia e, hoje, dedico meus dias ao atendimento psicopedagógico educacional de crianças autistas em uma associação no contraturno escolar, onde atendo diferentes níveis de suporte. Mas eu queria ir além: por amar tanto esse público, estou cursando minha segunda graduação, agora em Terapia Ocupacional, para oferecer um olhar ainda mais completo e terapêutico para nossas crianças neurodivergentes.
              </p>
              
              <h2 className="font-headline-md text-headline-md text-primary pt-4">Como tudo começou?</h2>
              <p>
                Enquanto estava em sala de aula, senti na pele a falta de materiais adaptados. Eu precisava de algo que fosse, ao mesmo tempo, prático, eficiente e que respeitasse o tempo de aprendizagem dos meus alunos. Como eu não encontrava esses recursos prontos na internet, comecei a desenvolver minhas próprias atividades.
              </p>
              <p>
                Foi um divisor de águas! Quando comecei a aplicar, percebi que não estava apenas facilitando minha rotina, mas criando caminhos reais para o aprendizado. Logo, colegas e pais começaram a me pedir esses materiais, e foi assim que nasceu o meu propósito: <strong>facilitar a vida de quem educa.</strong>
              </p>
              
              <h2 className="font-headline-md text-headline-md text-primary pt-4">Por que faço o que faço?</h2>
              <p>
                Eu acredito que toda criança merece estímulos adequados. Sei que muitas famílias enfrentam desafios na escola e, muitas vezes, não encontram o suporte necessário. Por isso, decidi abrir minhas atividades para você. Seja você um profissional da educação que busca otimizar seu tempo ou um pai/mãe que quer proporcionar um desenvolvimento estruturado para seu filho — seja ele neurodivergente ou típico — estou aqui para entregar o recurso que você precisa.
              </p>
              <p>
                O meu objetivo é que, através de atividades lúdicas e bem estruturadas, possamos juntos construir conquistas diárias.
              </p>
              <p className="font-bold text-secondary text-xl pt-2">
                Seja bem-vindo(a) ao meu mundo de aprendizado com amor!
              </p>
            </div>
            
            <div className="pt-6 border-t border-outline-variant mt-8">
              <p className="font-body-md text-on-surface-variant mb-4">
                Quer acompanhar mais sobre meu trabalho e ver essas atividades na prática?
              </p>
              <a 
                href="https://instagram.com/psicopedagoga.maraoliveira" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-6 py-3 rounded-full font-label-lg hover:opacity-90 transition-opacity shadow-md"
              >
                Siga-me no Instagram @psicopedagoga.maraoliveira
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
