export class FormatCustomDate {
  dateTimeLocal(dateISO: Date) {
    const date = dateISO.toLocaleString("pt-BR", {
      timeZone: "America/Manaus",
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
}
