const in_id = "in";
const out_id = "out";
const decode_id = "decode";
const encode_id = "encode";

const eps_arr=[
    ['A', 'T', 'A', 'U'], 
    ['T', 'A', 'U', 'A'], 
    ['C', 'G', 'C', 'G'], 
    ['G', 'C', 'G', 'C'],
]

const eps_c_to_first={A:0, T:1, C:2, G:3}
const eps_c_to_last={U:0, A:1, G:3, C:4}

function emas_pari_siirto(char, reverse = false) {
    if(reverse){
        let index = eps_c_to_last[char];
        return eps_arr[index];
    }
    else{
        let index = eps_c_to_first[char];
        return eps_arr[index];
    }
}

const lopetus = "lopetus";

const emt_dict = {
    ATT: "isoleusiini",
    ATC: "isoleusiini",
    ATA: "isoleusiini",
    ATG: "metioniini",
    
    CTT: "leusiini",
    CTC: "leusiini",
    CTA: "leusiini",
    CTG: "leusiini",

    TTT: "fennylialaniini",
    TTC: "fennylialaniini",
    TTA: "leusiini",
    TTG: "leusiini",

    GTT: "valiini",
    GTC: "valiini",
    GTA: "valiini",
    GTG: "valiini",

    // 1/4 done .....


    ACT: "seriini",
    ACC: "seriini",
    ACA: "seriini",
    ACG: "seriini",
    
    CCT: "proliini",
    CCC: "proliini",
    CCA: "proliini",
    CCG: "proliini",

    TCT: "treoniini",
    TCC: "treoniini",
    TCA: "treoniini",
    TCG: "treoniini",

    GCT: "alaniini",
    GCC: "alaniini",
    GCA: "alaniini",
    GCG: "alaniini",

    // 2/4

    AAT: "tyrosiini",
    AAC: "tyrosiini",
    AAA: lopetus,
    AAG: lopetus,
    
    CAT: "histidiini",
    CAC: "histidiini",
    CAA: "glutamiini",
    CAG: "glutamiini",

    TAT: "asparagiini",
    TAC: "asparagiini",
    TAA: "lysiini",
    TAG: "lysiini",

    GAT: "asparagiinihapo",
    GAC: "asparagiinihapo",
    GAA: "glutamiinihappo",
    GAG: "glutamiinihappo",


    // 3/4 tehty

    AAT: "kysteiini",
    AAC: "kysteiini",
    AAA:  lopetus,
    AAG:  "tryptofaani",
    
    CAT: "arganiini",
    CAC: "arganiini",
    CAA: "arganiini",
    CAG: "arganiini",

    TAT: "seriini",
    TAC: "seriini",
    TAA: "arganiini",
    TAG: "arganiini",

    GAT: "glysiini",
    GAC: "glysiini",
    GAA: "glysiini",
    GAG: "glysiini",


}
/**
 * 
 * @param {string} a 
 * @param {string} b 
 * @param {string} c 
 * @returns {string}
 */
function emt(a,b,c){
    console.log(a+b+c)
    return emt_dict[a+b+c];
}

function encode(){
    return "Encoded successfully";
}
/**
 * 
 * @param {string} str 
 * @param {HTMLElement} output_el 
 */
function decode_emt(str, output_el) {
    str = str.replace(' ', '');
    for(let i = 0; i<str.length; i+=3){
        if(str[i+2] == undefined){
            continue;
        }
        let e = emt(str[i],str[i+1],str[i+2]);

        if(e == lopetus){
            output_el.innerHTML += "end: " +str[i] + str[i+1] + str[i+2];
            break;

        }
        if(e == undefined){
            //return "decoding failed";
            output_el.innerHTML += "("+str[i] + str[i+1] + str[i+2] + ")";
            continue;
            //break;
        }
        output_el.innerHTML += e + "   ";
    }
}

function decode(){
    let input_el = document.getElementById(in_id);
    let output_el = document.getElementById(out_id);

    /**
     * @type {string}
     */
    let str = input_el.value;
    str = str.toUpperCase();
    output_el.innerHTML = "";

    decode_emt(str, output_el)
    return "Decoded successfully";
}
function refresh_output(){
    let decode_el = document.getElementById(decode_id);
    let encode_el = document.getElementById(encode_id);
    
    //console.log("decode checked:", decode_el.checked);
    //console.log("encode checked:", encode_el.checked);

    if(decode_el.checked)
        return decode();
    else if(encode_el.checked)
        return encode();
    else{
        return "No encode / decode was selected"
    }
}