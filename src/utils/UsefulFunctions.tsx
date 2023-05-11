export const getBase64FromUrl = async (url: string) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        }
    });
}

// last index included. 5 unique random numbers array.
export const generateRandomNumber = (lastIndex: number) => {
    let randomNumberArr: Array<number> = [];
    while (randomNumberArr.length < 1) {
        let r = Math.floor(Math.random() * (lastIndex + 1))
            randomNumberArr.push(r);
    }
    return randomNumberArr[0]
}
