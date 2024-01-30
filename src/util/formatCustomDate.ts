export class FormatCustomDate {
  dateTimeLocal(dateISO: Date) {
    const toDate = new Date(dateISO)
    const date = toDate.toLocaleString("pt-BR", {
      hour12: false,
      timeZone: "UTC",
    });

    return date;
  }
  dateToISOFormat() {
    const dateTimeString = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Manaus",
    });

    const [date, time] = dateTimeString.split(", ");
    const [DD, MM, YYYY] = date.split("/");
    const [HH, mm, ss] = time.split(":");
    return new Date(`${YYYY}-${MM}-${DD}T${HH}:${mm}:${ss}.040Z`);
  }
  date(dateISO: Date) {
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
      "Dezembro",
    ];
    const dd = dateISO.getDate();
    const mm = meses[dateISO.getMonth()];
    const yy = dateISO.getFullYear();

    return `${dd} de ${mm} de ${yy}`;
  }
}
