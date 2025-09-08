pragma circom 2.0.0;

template AgeCheck() {
    signal input birthYear;   
    signal input currentYear;
    signal output isAdult;

    signal age;
    age <== currentYear - birthYear;
    isAdult <== age >= 18 ? 1 : 0;
}

component main = AgeCheck();
