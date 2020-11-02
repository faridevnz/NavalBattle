let generateRandomString = ( lang: number ): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < lang; i++ ) {
        let index = Math.floor( Math.random() * characters.length );
        result += characters.charAt(index);
    }
    return result;
}


export { generateRandomString }