import { addZero } from './supScript.js';

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoMute = document.querySelector('.video-mute');

    const videoFullscreen = document.querySelector('.video-fullscreen');
    let prevVolume = 1;

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.add('fa-pause');
        }
    };
    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    videoFullscreen.addEventListener('click', () => {
        // videoPlayer.webkitEnterFullScreen();
        videoPlayer.requestFullscreen();
    });

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let seccondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let seccondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(seccondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(seccondsTotal)}`;
    });

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });
    videoPlayer.volume = 0.5;
    videoVolume.value = videoPlayer.volume * 100;

    videoPlayerInit.stopPlayer = () => {
        if (!videoPlayer.paused) {
            // stopPlay();
            videoPlayer.pause();
            toggleIcon();
        }
    };
    videoMute.addEventListener('click', () => {
        if (videoPlayer.volume) {
            prevVolume = videoPlayer.volume;
            videoPlayer.volume = 0;
        } else {
            videoPlayer.volume = prevVolume;
        }
    });
};