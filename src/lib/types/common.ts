// Bu TypeScript’dagi index signature bo‘lib, obyektning kalitlari oldindan noma’lum bo‘lsa ishlatiladi.
// T — ichida istalgan nomdagi property bo‘lishi mumkin bo‘lgan obyekt
export interface T {
    [key: string]: any;
}