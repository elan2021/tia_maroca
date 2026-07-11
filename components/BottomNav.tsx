import Icon from "./Icon";

const items = [
  { label: "Início", icon: "home", active: true },
  { label: "Sobre", icon: "person", active: false },
  { label: "Atividades", icon: "school", active: false },
  { label: "Blog", icon: "menu_book", active: false },
  { label: "Contato", icon: "mail", active: false },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full z-50 md:hidden bg-surface shadow-xl border-t border-outline-variant flex justify-around items-center h-16 px-2">
      {items.map((item) => (
        <a
          key={item.label}
          href="#"
          className={
            item.active
              ? "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-3 py-1 scale-90 active:scale-100 transition-all"
              : "flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 scale-90 active:scale-100 transition-all"
          }
        >
          <Icon name={item.icon} />
          <span className="font-label-lg text-label-lg">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
