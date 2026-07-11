import Icon from "./Icon";

export default function Newsletter() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-12">
      <div className="relative rounded-[48px] overflow-hidden bg-on-secondary-fixed-variant p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="absolute inset-0 opacity-10">
          <Icon
            name="brush"
            className="text-[400px] text-white absolute -bottom-40 -left-20"
          />
          <Icon
            name="edit_note"
            className="text-[300px] text-white absolute -top-20 -right-20"
          />
        </div>

        <div className="relative z-10 w-full md:w-3/5 space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-white">
            Receba novidades no seu WhatsApp!
          </h2>
          <p className="font-body-lg text-body-lg text-white/80">
            Faça parte do nosso grupo exclusivo de educadores e receba
            atividades gratuitas e cupons de desconto todas as semanas.
          </p>
        </div>

        <div className="relative z-10 w-full md:w-auto">
          <button className="bg-[#25D366] hover:bg-[#128C7E] text-white font-headline-md text-headline-md px-12 py-5 rounded-full flex items-center gap-3 transition-all transform hover:scale-105 shadow-2xl">
            <Icon name="groups" className="text-[32px]" filled />
            Entrar no Grupo VIP
          </button>
        </div>
      </div>
    </section>
  );
}
