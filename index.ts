const dec2bin = (dec: number) => {
    return (dec >>> 0).toString(2);
};

const littleEndianNumber = 0x12345678;

export const convertNumber = (number: number): number => {
    const byte1 = (number & 0xff) << 24;
    const byte2 = (number & 0xff00) << 8;
    const byte3 = (number & 0xff0000) >> 8;
    const byte4 = (number & 0xff000000) >>> 24;
    return byte1 | byte2 | byte3 | byte4;
};

const bigEndianNumber = convertNumber(littleEndianNumber);
console.log('Big Endian: ', bigEndianNumber.toString(16));
console.log('Big Endian: ', dec2bin(bigEndianNumber));

const newLittleEndianNumber = convertNumber(bigEndianNumber);
console.log('Little Endian', newLittleEndianNumber.toString(16));
console.log('Little Endian', dec2bin(newLittleEndianNumber), '\n');

export const littleEndianToBigEndian = (number: number): number => {
    const buffer = Buffer.alloc(4);
    buffer.writeInt32LE(number, 0);
    return buffer.readInt32BE(0);
};

export const bigEndianToLittleEndian = (number: number): number => {
    const buffer = Buffer.alloc(4);
    buffer.writeInt32BE(number, 0);
    return buffer.readInt32LE(0);
};

const bigEndianNumberConvertedByTs =
    littleEndianToBigEndian(littleEndianNumber);
console.log(
    'Big Endian by Typescript: ',
    bigEndianNumberConvertedByTs.toString(16)
);
console.log(
    'Big Endian by Typescript: ',
    dec2bin(bigEndianNumberConvertedByTs)
);

const newLittleEndianNumberConvertedByTs = bigEndianToLittleEndian(
    bigEndianNumberConvertedByTs
);
console.log(
    'Little Endian by Typescript: ',
    newLittleEndianNumberConvertedByTs.toString(16)
);
console.log(
    'Little Endian by Typescript: ',
    dec2bin(newLittleEndianNumberConvertedByTs)
);

const testNumbers: number[] = [
    0x12345678, 0x35257235, 0x52725263, 0x68346125, 0x69013474, 0x25821467,
    0x25732345, 0x14353614, 0x62934501, 0x27593204
];

testNumbers.forEach((testNumber: number) => {
    console.log('Little Endian:', '0x' + testNumber.toString(16));
    const convertedToBig = convertNumber(testNumber).toString(16);

    const convertedToBigByTs = littleEndianToBigEndian(testNumber).toString(16);

    if (convertedToBig !== convertedToBigByTs) {
        console.error(
            `Converted numbers do not match\nMy convert: 0x${convertedToBig}\nTS convert: 0x${convertedToBigByTs}\n\n`
        );
    } else {
        console.log(
            `My convert: 0x${convertedToBig}\nTS convert: 0x${convertedToBigByTs}\n\n`
        );
    }
});
