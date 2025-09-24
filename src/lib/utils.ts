import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseEventDate(value?: string): number {
  if (!value) return NaN;
  const onlyDate = /^(\d{4}-\d{2}-\d{2})$/;
  if (onlyDate.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d).getTime();
  }
  const t = Date.parse(value);
  return Number.isNaN(t) ? NaN : t;
}

/**
 * Formata uma data no formato "YYYY-MM-DD" ou ISO para "Domingo, 14 de Setembro de 2025"
 */
export function formatEventDate(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
  ];

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

  const diaDaSemana = diasDaSemana[date.getDay()];
  const dia = date.getDate();
  const mes = meses[date.getMonth()];
  const ano = date.getFullYear();

  return `${diaDaSemana}, ${dia} de ${mes} de ${ano}`;
}

/**
 * Formata uma data e hora no formato "Domingo, 14 de Setembro de 2025 às 14:30"
 */
export function formatEventDateTime(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
  ];

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

  const diaDaSemana = diasDaSemana[date.getDay()];
  const dia = date.getDate();
  const mes = meses[date.getMonth()];
  const ano = date.getFullYear();
  const horas = date.getHours().toString().padStart(2, '0');
  const minutos = date.getMinutes().toString().padStart(2, '0');

  return `${diaDaSemana}, ${dia} de ${mes} de ${ano} às ${horas}:${minutos}`;
}

/**
 * Formata uma data e hora no formato compacto "DD MMM - YYYY • HH:MM"
 */
function formatCompactDateTime(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const months = [
    "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez"
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} - ${year} • ${hours}:${minutes}`;
}

/**
 * Formata o período completo do evento no formato compacto
 * Mesmo dia: "05 nov - 2025 • 08:00 > 18:00"
 * Dias diferentes: "05 nov - 2025 • 08:00 > 07 nov - 2025 • 18:00"
 */
export function formatEventPeriod(dataInicio?: string, dataFim?: string): string {
  if (!dataInicio || !dataFim) return formatEventDate(dataInicio || dataFim);

  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);

  if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
    return formatEventDate(dataInicio);
  }

  const inicioFormatted = formatCompactDateTime(inicio);
  const fimFormatted = formatCompactDateTime(fim);

  // Mesmo dia - mostrar apenas as horas no final
  if (inicio.toDateString() === fim.toDateString()) {
    const hoursInicio = inicio.getHours().toString().padStart(2, '0');
    const minutesInicio = inicio.getMinutes().toString().padStart(2, '0');
    const hoursFim = fim.getHours().toString().padStart(2, '0');
    const minutesFim = fim.getMinutes().toString().padStart(2, '0');

    const day = inicio.getDate().toString().padStart(2, '0');
    const months = [
      "jan", "fev", "mar", "abr", "mai", "jun",
      "jul", "ago", "set", "out", "nov", "dez"
    ];
    const month = months[inicio.getMonth()];
    const year = inicio.getFullYear();

    return `${day} ${month} - ${year} • ${hoursInicio}:${minutesInicio} > ${hoursFim}:${minutesFim}`;
  }

  // Dias diferentes - mostrar data completa de início e fim
  return `${inicioFormatted} > ${fimFormatted}`;
}

/**
 * Ordena por proximidade de hoje:
 * - Primeiro FUTUROS (>= hoje), do mais próximo pro mais distante
 * - Depois PASSADOS (< hoje), do mais recente pro mais antigo
 */
export function sortByDateProximity<T extends { data_inicio?: string }>(
  arr: T[],
  now = new Date()
): T[] {
  // Verifica se arr é um array válido
  if (!Array.isArray(arr)) {
    console.warn("sortByDateProximity: arr não é um array válido, retornando array vazio");
    return [];
  }

  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(); // hoje 00:00
  return [...arr].sort((a, b) => {
    const ta = parseEventDate(a.data_inicio);
    const tb = parseEventDate(b.data_inicio);
    if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
    if (Number.isNaN(ta)) return 1;
    if (Number.isNaN(tb)) return -1;

    const da = ta - base;
    const db = tb - base;

    const aFuture = da >= 0;
    const bFuture = db >= 0;

    if (aFuture && !bFuture) return -1;
    if (!aFuture && bFuture) return 1;

    if (aFuture && bFuture) return da - db;

    return tb - ta;
  });
}
