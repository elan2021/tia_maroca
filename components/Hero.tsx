import Image from "next/image";
import Icon from "./Icon";
import { db } from "@/lib/db";

export default async function Hero() {
  const settings = await db.siteSetting.findMany();
  const config = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const heroBadge = config["heroBadge"] || "Recursos Educativos Criativos";
  const heroTitle = config["heroTitle"] || "Educar é um trabalho que vem do Coração!";
  const heroSubtitle = config["heroSubtitle"] || "Transforme o aprendizado em uma jornada lúdica e inesquecível com nossos materiais pedagógicos exclusivos.";

  return (
    <section className="relative px-margin-mobile md:px-margin-desktop pt-12 pb-20 overflow-hidden">
      <div className="absolute -top-10 -right-10 opacity-20 transform rotate-12">
        <Icon name="cloud" className="text-[300px] text-primary" />
      </div>
      <div className="absolute bottom-0 left-10 opacity-10">
        <Icon name="eco" className="text-[200px] text-secondary" />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary-fixed px-4 py-1 rounded-full text-on-primary-fixed font-label-lg text-label-lg">
            <Icon name="star" className="text-[18px]" filled />
            {heroBadge}
          </div>

          <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight whitespace-pre-wrap">
            {heroTitle}
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md whitespace-pre-wrap">
            {heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-primary hover:bg-on-primary-fixed-variant text-white font-headline-md text-headline-md px-10 py-4 rounded-full transition-all shadow-lg flex items-center gap-2">
              Ver Novidades
              <Icon name="rocket_launch" />
            </button>
            <button className="border-2 border-secondary text-secondary font-headline-md text-headline-md px-10 py-4 rounded-full hover:bg-secondary-container transition-all">
              Sobre Mim
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative">
          <div className="absolute inset-0 rainbow-gradient opacity-10 blur-3xl rounded-full scale-125" />
          <div className="relative bg-white p-4 rounded-[40px] cloud-shadow border-4 border-primary-container">
            <div className="relative w-full h-[500px] rounded-[32px] overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADl3GQqw2gkcvphOjFZiEMNg4I0pwD4Zo-dfTe0HKXv4rxnjc8I3SoJL6oEk2kQS3sPtwqkffTrfks8VkLA7KT_R4pRF8_uJZNpbbY7vp8ErNTovn0Z_X2PoffSJJsWJyqt5-Vca0z9wuJn5axVsUWcS6HJRURyWmDzfXtiZyaOE0i-3wAE2cETze4B8gJj-6Qxv3eGwxjDARufOYhV0Km1iD3uQhecorY08xV4hEFiOrgXjhOjMe6IHvSkbzZDOERsZw5lT-1Tm0"
                alt="Professora sorridente"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-secondary-container p-6 rounded-3xl shadow-xl border-4 border-white transform rotate-3">
              <p className="font-headline-md text-headline-md text-on-secondary-container">
                Professora Mara Oliveira
              </p>
              <p className="font-label-lg text-label-lg text-secondary">
                Pedagoga &amp; Mentora
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
