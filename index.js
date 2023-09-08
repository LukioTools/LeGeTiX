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

    // XAX

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

    

    // XCX

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



    // XGX


    AGT: "kysteiini",
    AGC: "kysteiini",
    AGA:  lopetus,
    AGG:  "tryptofaani",
    
    CGT: "arganiini",
    CGC: "arganiini",
    CGA: "arganiini",
    CGG: "arganiini",

    TGT: "seriini",
    TGC: "seriini",
    TGA: "arganiini",
    TGG: "arganiini",

    GGT: "glysiini",
    GGC: "glysiini",
    GGA: "glysiini",
    GGG: "glysiini",


    // XTX

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


const emt_replace_regex = /[^A|C|G|T]/g
const emt_replace_regex_no_global = /[^A|C|G|T]/


const parsed_id = "parsed";
/**
 * 
 * @param {string} str 
 * @returns 
 */
function decode_parse(str){
    let parsed_el = document.getElementById(parsed_id)
    let str_upper = str.toUpperCase();
    

    let parse_out = "";
    //let correctly_parsed = 0
    for (let index = 0; index < str_upper.length; index++) {
        const char = str_upper[index];
        //global one breaks my shit
        let test_result = emt_replace_regex_no_global.test(char);

        //log
        //console.log(emt_replace_regex_no_global, char, test_result);
        
        if(test_result){
            parse_out += `<span class="note red">${char}</span>`;
        }
        else if(char != str[index]){
            //mark yellow since wasnt caps
            parse_out += `<span class="note yellow">${char}</span>`;
        }
        else{

            parse_out += `<span class="note green /*cropped*/">${char}</span>`;

            
            /*
            correctly_parsed++;
            console.log("correctly_parsed: ", correctly_parsed);
            if(correctly_parsed == 3){
                let elements = document.getElementsByClassName("cropped");
                if(elements){
                    console.log(elements, elements.length);
                    for (let index = 0; index < elements.length; index++) {
                        const element = elements[index];
                        console.log(element, index);
                        element.classList.remove("cropped")
                    }
                }
                else{
                    console.log("no elements found")
                }
                correctly_parsed = 0;
            }
            */
            
        }
    }
    //display face

    
    parsed_el.innerHTML = parse_out;
    //parse_out = str;


    let str_parsed=str_upper.replace(emt_replace_regex, '');
    return str_parsed;
}

/**
 * 
 * @param {string} str 
 * @param {HTMLElement} output_el 
 */
function decode_emt(str, output_el) {
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
    output_el.innerHTML = "";

    let parsed_str= decode_parse(str);

    decode_emt(parsed_str, output_el)
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