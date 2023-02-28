function beautifyWord(text: string) {
    let _text = text;
    if (_text.includes('-')) {
        _text = _text.replaceAll('-', ' ')
    }
    return _text[0].toUpperCase() + _text.slice(1);
}

export default beautifyWord;
