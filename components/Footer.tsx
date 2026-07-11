import Icon from "./Icon";

const usefulLinks = ["Blog", "Contato", "Política de Privacidade", "Termos de uso", "Suporte (whatsapp)"];
const storeLinks = ["Início", "Minha conta", "Perdeu sua senha?", "Downloads"];
const categoryLinks = ["Alfabetização", "Educação infantil", "Kits/combos", "Matemática", "Gratuitos"];

function LinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="space-y-4">
      <h4 className="font-label-lg text-label-lg text-on-primary-container font-bold uppercase tracking-wider">
        {title}
      </h4>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-on-primary-container/80 hover:text-on-primary-container font-label-lg text-label-lg transition-colors"
          >
            {link}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary-container mt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto">
        <div className="space-y-4">
          <div className="font-headline-md text-headline-md text-on-primary-container">
            Tia Maroca
          </div>
          <p className="font-body-md text-body-md text-on-primary-container/80">
            Recursos pedagógicos criados com carinho para transformar a
            educação infantil em um momento de alegria e descoberta.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-on-primary-container hover:scale-110 transition-transform">
              <Icon name="camera" />
            </a>
            <a href="#" className="text-on-primary-container hover:scale-110 transition-transform">
              <Icon name="mail" />
            </a>
            <a href="#" className="text-on-primary-container hover:scale-110 transition-transform">
              <Icon name="video_library" />
            </a>
          </div>
        </div>

        <LinkColumn title="Links úteis" links={usefulLinks} />
        <LinkColumn title="Loja" links={storeLinks} />
        <LinkColumn title="Categorias Loja" links={categoryLinks} />
      </div>

      <div className="border-t border-on-primary-container/10 px-margin-mobile md:px-margin-desktop py-6">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="font-body-md text-body-md text-on-primary-container/60">
            © 2024 Tia Maroca por Mara Oliveira. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Icon name="payments" className="text-on-primary-container/60" />
            <Icon name="shield" className="text-on-primary-container/60" />
          </div>
        </div>
      </div>
    </footer>
  );
}
