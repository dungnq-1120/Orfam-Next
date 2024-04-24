export function customRound(numberRound: number) {
  if (numberRound % 1 === 0.5 || numberRound % 1 === -0.5) {
    return Math.floor(numberRound);
  } else {
    return Math.round(numberRound);
  }
}
