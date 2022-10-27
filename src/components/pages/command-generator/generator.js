let userInit = "";
let userMain = "";
let settings = {
    wrap_commands: false,
    container: false
}

const toggle = num => num = num ? 0 : 1;
const minLength = 30;

const wrap = arr => {
    const maxHeight = 8;
    const maxLength = Math.floor((arr.length / maxHeight) / (arr.length > minLength ? 2.2 : 1));
    const z_intercept = 2;

    let x = 0;
    let y = 0;
    let z = 0;

    let output = '';

    let y_mode = 1;
    let z_mode = 1;

    let dir;
    let cd = 0;

    for (let i = 0; i < arr.length;) {
        const setDir = () => dir = !z_mode ? 'south' : '';
        cd = 0;

        setDir();

        const result = () => {
            arr[i] !== undefined ? output += `{id:command_block_minecart,Command:'setblock ~${x ? x : ''} ~${y ? y : ''} ~${(z + z_intercept) * -1} ${i === 0 ? "repeating_command_block" : "chain_command_block"}${dir ? `[facing=${dir}]` : ''}{auto:1,Command:\\'${arr[i].replaceAll('\\n', '\\\\\\\\n')}\\'}'},` : null
            i++;
        }

        const toggle_x = () => {
            z_mode = z_mode ? 0 : 1;
            dir = 'east';
            result();
            setDir();
            x = x ? 0 : 1;
            y_mode = y_mode ? 0 : 1;
            cd = 1;
        }

        const toggle_z = () => {
            z_mode = z_mode ? 0 : 1;
            y_mode ? y++ : y--;
            setDir();
            result();
        }

        if (z >= maxLength && y >= maxHeight) toggle_x();
        
        if (((z >= maxLength) || (z <= 0 && i > 1)) && !cd) dir = y_mode ? 'up' : 'down';

        result();

        if ((z >= maxLength || (z <= 0 && i > 1)) && !cd) toggle_z();


        z_mode ? z++ : z--;
    }

    return output;
}

const command = (initStr, mainStr) => {
    const init = initStr.split('\n').filter(String);
    const main = mainStr.split('\n').filter(String);

    // const glassLength = mainStr.split('\n').length / 4 < 5 ? 5 : mainStr.split('\n').length / 4;
    const glassLength = Math.floor((mainStr.split('\n').filter(String).length / 8) / (mainStr.split('\n').filter(String).length > minLength ? 2.2 : 1)) + 3;
    
    const glassWidth = mainStr.split('\n').filter(String).length > minLength ? 2 : 1;
    const glass = settings.container ? `{id:command_block_minecart,Command:'fill ~-1 ~ ~-1 ~${glassWidth} ~8 ~-${glassLength} purple_stained_glass'},{id:command_block_minecart,Command:'fill ~-1 ~9 ~-1 ~${glassWidth} ~9 ~-${glassLength} purpur_slab'},{id:command_block_minecart,Command:'fill ~-1 ~-1 ~-1 ~${glassWidth} ~-1 ~-${glassLength} purpur_block'},` : "";

    let inits = '', mains = '';

    if (initStr.length > 1) for (let i of init) inits += `{id:command_block_minecart,Command:'${i.replaceAll("'", "\\'")}'},`;

    if (mainStr.length > 1) 
        if (!settings.wrap_commands) 
            for (let index = 0; index < main.length; index++) mains += `{id:command_block_minecart,Command:'setblock ~ ~ ~-${index + 2} ${index + 2 === 2 ? "repeating_command_block" : "chain_command_block"}{auto:1,Command:${main[index].indexOf('"') > -1 ? `\\'${main[index].replaceAll("'", "\\\\\\'").replaceAll('\\n', '\\\\\\\\n')}\\'` : `"${main[index].replaceAll('\\n', '\\\\\\\\n')}"`}}'},`;
        else if (settings.wrap_commands) mains += wrap(mainStr.split('\n').filter(String));

    const cmd = `summon falling_block ~ ~1 ~ {Time:0,BlockState:{Name:redstone_block},Passengers:[{id:falling_block,Passengers:[{id:falling_block,Time:0,BlockState:{Name:activator_rail},Passengers:[${glass}${inits}${mains}{id:command_block_minecart,Command:'setblock ~ ~1 ~ repeating_command_block{auto:1,Command:"execute unless entity @e[type=command_block_minecart] run fill ~ ~ ~ ~ ~-3 ~ air"}'},{id:command_block_minecart,Command:"kill @e[type=command_block_minecart]"}]}]}]}`

    return cmd;
}

const genCmd = () => document.querySelector('#output').value = command(userInit, userMain);

document.querySelector('#init-commands').addEventListener('keyup', e => {
    userInit = e.target.value;
    genCmd();
});
document.querySelector('#main-commands').addEventListener('keyup', e => {
    userMain = e.target.value;
    genCmd();
});
