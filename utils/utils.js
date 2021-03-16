export function getMonthName(number) {
    switch (number) {
        case 1:
            return 'stycznia'
        case 2:
            return 'lutego'
        case 3:
            return 'marca'
        case 4:
            return 'kwietnia'
        case 5:
            return 'maja'
        case 6:
            return 'czerwca'
        case 7:
            return 'lipca'
        case 8:
            return 'sierpnia'
        case 9:
            return 'września'
        case 10:
            return 'pażdziernika'
        case 11:
            return 'listopada'
        case 12:
            return 'grudnia'
        default:
            break;
    }
}

export function getWeekName(number) {
    switch (number) {
        case 1:
            return 'poniedziałek'
        case 2:
            return 'wtorek'
        case 3:
            return 'środa'
        case 4:
            return 'czwartek'
        case 5:
            return 'piątek'
        case 6:
            return 'sobota'
        case 7:
            return 'niedziela'
        default:
            break;
    }
}