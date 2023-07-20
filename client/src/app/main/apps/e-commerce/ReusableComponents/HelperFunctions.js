export const sortAlphabetically = (array, attribute) => {
    if (array?.length > 0) {
        array.sort((a, b) => {
            const nameA = a[attribute]?.toUpperCase();
            const nameB = b[attribute]?.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }
    return array
}
