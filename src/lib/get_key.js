let keySet = {
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down'
};

export default function getKey(keyCode){
    return keySet[keyCode] || null;
}
