interface SaudacaoProps {
    nome: string;
    idade?: number;
}

export function Saudacao({ nome, idade }: SaudacaoProps) {
    return(
        <div>
            <h1> Olá {nome}! </h1>
            {idade && <p>Você tem {idade} anos.</p>}
        </div>
    );
}