import { Link } from "react-router-dom";

export function Home() {
  return (
    <section className="bg-nozama py-16">
      <div className="nozama-container px-6 py-8 lg:grid-cols-2 lg:gap-12 lg:px-10 grid grid-cols-1 items-center gap-10 rounded-2xl">
        <div className="max-w-2xl space-y-5">
          <h1 className="text-4xl font-bold leading-14 text-nozama-light md:text-5xl">
            Entre para a Nozama e transforme seu jeito de comprar online.
          </h1>

          <p className="text-lg text-nozama-light/60 md:text-xl">
            Na Nozama voce encontra os melhores precos do mercado, ofertas reais
            e entrega rapida para todo o Brasil.
          </p>

          <div>
            <Link
              to="/registro"
              className="inline-flex items-center rounded-md bg-nozama-accent px-6 py-3 text-base font-bold text-nozama-deep no-underline transition duration-200 hover:brightness-95"
            >
              Criar conta agora →
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-nozama-muted/20 bg-nozama-light shadow-nozama-soft">
          <img
            src="/src/assets/home-photo.png"
            alt="Operador preparando encomenda da Nozama"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
