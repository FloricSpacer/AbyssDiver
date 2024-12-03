window.addEventListener('keydown', (event) => {
    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        switch (event.code) {
            case 'Space':
                console.log('Spacebar pressed!');
                break;
            case 'KeyF':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    document.documentElement.requestFullscreen();
                }
                break;
            case 'F12':
                console.log('F12 key pressed!');
                alert("Whatever you're about to do, you better not make a bug report over it...");
                break;
            default:
                break;
            }
    }
});