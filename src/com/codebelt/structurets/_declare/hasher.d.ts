interface Hasher {
    prependHash;
    initialized;
    changed;
    init;
    getHash();
    getHashAsArray();
    parse();
}


interface Window { yes(); }

declare var hasher:Hasher;