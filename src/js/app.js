import * as functions from "./modules/functions.js";

functions.isWebp();

const video = document.querySelector('.video');
const videos = document.querySelectorAll('.video__item');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const height = document.querySelector('.section').clientHeight;

let center = 0
let activeSection = document.querySelector('.section_1');

const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.setAttribute('data-top', section.offsetTop)
})

let oldScrollY = window.scrollY;
let scrollDirection = 'down'

window.addEventListener('scroll', () => {
    // detect scroll direction
    if(oldScrollY < window.scrollY){
        scrollDirection = "down";
    } 
    if(oldScrollY > window.scrollY) {
        scrollDirection = "up";
    }
    oldScrollY = window.scrollY;

    // change active section
    if(scrollDirection === 'down'){
        sections.forEach(section => {
            if((video.offsetTop + video.clientHeight) >= section.offsetTop && section.offsetTop >= window.scrollY){
                activeSection = section
            }
        })
    }
    if(scrollDirection === 'up'){
        sections.forEach(section => {
            if(video.offsetTop >= section.offsetTop && section.offsetTop <= window.scrollY){
                activeSection = section
            }
        })
    }

    // change position of active image to add some effect
    const activeVideo = document.querySelector(activeSection.getAttribute('data-video'))
    if(scrollDirection === 'up'){
        if(activeVideo.offsetTop <= 0){
            const activeSectionPosition = activeSection.offsetTop + activeSection.clientHeight
            const distance = ((video.offsetTop - (video.clientHeight / 2)) - activeSectionPosition)
            activeVideo.style.bottom = `calc(100% + ${distance}px)`
            activeVideo.style.top = 'auto'
            const tag = activeVideo.querySelector('video')
            if(tag.offsetTop >= 0){
                tag.style.top = `calc(100% - ${activeVideo.offsetTop + activeVideo.clientHeight}px)`
                tag.style.bottom = 'auto'
            }
            if(tag.offsetTop < 0){
                tag.style.top = '0'
            }
        }
        if(activeVideo.offsetTop > 0){
            activeVideo.style.bottom = '0'
        }
    }
    if(scrollDirection === 'down'){
        if(activeVideo.offsetTop >= 0){
            const activeSectionPosition = activeSection.offsetTop 
            const videoBottomY = video.offsetTop + (video.clientHeight / 2)
            const distance = videoBottomY - activeSectionPosition
            activeVideo.style.top = `calc(100% - ${distance}px)`
            activeVideo.style.bottom = 'auto'
            const tag = activeVideo.querySelector('video')
            if(activeVideo.offsetTop > 0){
                tag.style.top = `-${activeVideo.offsetTop}px`
            }
            if(activeVideo.offsetTop < 0){
                tag.style.top = '0'
            }
        }
        if(activeVideo.offsetTop < 0){
            activeVideo.style.top = '0'
        }
    }
    

    // add active class to active image
    if(!document.querySelector(activeSection.getAttribute('data-video')).classList.contains('active')){
        videos.forEach(video => {
            video.classList.remove('active')
            video.classList.remove('next')
            video.style.zIndex = 0
        })
        document.querySelector(activeSection.getAttribute('data-video')).classList.add('active')
        if(scrollDirection === 'up'){
            if(document.querySelector(activeSection.getAttribute('data-video')).nextElementSibling){
                document.querySelector(activeSection.getAttribute('data-video')).nextElementSibling.style.zIndex = 9
            }
        }
        if(scrollDirection === 'down'){
            if(document.querySelector(activeSection.getAttribute('data-video')).previousElementSibling){
                document.querySelector(activeSection.getAttribute('data-video')).previousElementSibling.style.zIndex = 9
            }
        }
        document.querySelector(activeSection.getAttribute('data-video')).style.zIndex = 10
    }

    // fix video to center
    if(window.scrollY > header.clientHeight && (window.scrollY + center * 2) < footer.offsetTop){
        video.style.top = `${window.scrollY + center}px`
    }
})

window.addEventListener('load', () => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    video.style.top = `${header.clientHeight + (height / 2)}px`
    center = video.offsetTop - header.clientHeight
    document.querySelector('#video1').classList.add('active');
    if(window.scrollY > header.clientHeight && (window.scrollY + center * 2) < footer.offsetTop){
        video.style.top = `${window.scrollY + center}px`
    }
})