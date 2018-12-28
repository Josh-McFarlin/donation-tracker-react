export const formatters = {
    capitalize: (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    },
    capitalizeWords: (text) => {
        return text
            .trim()
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
            .join(' ');
    },
    phoneNumber: (number) => {
        if (typeof number === 'number') {
            return this.phoneNumber(number.toString(10));
        } else {
            return number
                .replace(/[^\d]+/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
    },
    price: (value) => {
        return Number.parseFloat(value).toFixed(2);
    }
};
