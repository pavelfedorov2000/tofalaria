'use strict';

document.addEventListener("DOMContentLoaded", function () {
    @@include('dinamic-adapt.js')

    const burgerBtn = document.querySelector('.burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');
    const closeMenuBtn = document.querySelector('.burger-menu__close');

    burgerBtn.addEventListener('click', () => {
        burgerMenu.classList.add('burger-menu--active');
    });
    closeMenuBtn.addEventListener('click', () => {
        burgerMenu.classList.remove('burger-menu--active');
    });
});


// Spoiler
/* const spoilersCollection = document.querySelectorAll('[data-spoilers');
console.log(spoilersCollection);


if (spoilersCollection.length > 0) {
    const spoilersArray = Array.from(spoilersCollection).filter((item, index, self) => {
        return !item.dataset.spoilers.split(',')[0];
    });

    if (spoilersArray.length > 0) {
        initSpoilers(spoilersArray);
    }

    const spoilersMedia = Array.from(spoilersCollection).filter(item => {
        return item.dataset.spoilers.split(',')[0];
    });

    if (spoilersMedia.length > 0) {
        const breakpointsArray = [];
        spoilersMedia.forEach(item => {
            console.log(item);
            const params = item.dataset.spoilers;
            const breakpoint = {};
            const paramsArray = params.split(',');
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });

        // Уникальные брейкпоинты

        let mediaQueries = breakpointsArray.map(item => {
            //return `(${item.type}-width: ${item.value}px), ${item.value}, ${item.type}`
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
        });
        mediaQueries = mediaQueries.filter((item, index, self) => {
            return self.indexOf(item) === index;
        });
        console.log(mediaQueries);

        mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(',');
            console.log(paramsArray);
            const mediaBreakpoint = paramsArray[1];
            console.log(mediaBreakpoint);
            const mediaType = paramsArray[2];
            console.log(mediaType);
            const matchMedia = window.matchMedia(paramsArray[0]);
            console.log(matchMedia);

            const spoilersCollection = breakpointsArray.filter(item => {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            });
            // Событие
            matchMedia.addListener(function() {
                initSpoilers(spoilersCollection, matchMedia);
            });
            initSpoilers(spoilersCollection, matchMedia);
        });
    }

    // Инициализация
    function initSpoilers(spoilersCollection, matchMedia = false) {
        spoilersCollection.forEach(spoilersBlock => {
            spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
            if (matchMedia.matches || !matchMedia) {
                spoilersBlock.classList.add('_init');
                initSpoilerBody(spoilersBlock);
                spoilersBlock.addEventListener('click', setSpoilerAction);
            } else {
                spoilersBlock.classList.remove('_init');
                initSpoilerBody(spoilersBlock, false);
                spoilersBlock.removeEventListener('click', setSpoilerAction);
            }
        });
    }

    // Работа с контентом

    function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
        const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
        console.log(spoilerTitles);
        if (spoilerTitles.length > 0) {
            spoilerTitles.forEach(spoilerTitle => {
                if (hideSpoilerBody) {
                    spoilerTitle.removeAttribute('tabindex');
                    if (!spoilerTitle.contains('_active')) {
                        spoilerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spoilerTitle.setAttribute('tabindex', '-1');
                    spoilerTitle.nextElementSibling.hidden = false;
                }
            });
        }
    }

    function setSpoilerAction(e) {
        const el = e.target;
        if (el.hasAttribute('[data-spoiler') || el.closest('[data-spoiler')) {
            const spoilerTitle = el.hasAttribute('[data-spoiler]') ? el : el.closest('[data-spoiler]');
            const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
            const oneSpoiler = spoilersBlock.hasAttribute('[data-one-spoiler]') ? true : false;
            if (!spoilersBlock.querySelectorAll('._slide').length) {
                if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
                    hideSpoilerBody(spoilersBlock);
                }
                spoilerTitle.classList.toggle('_active');
                _slideToggle(spoilerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }
    function hideSpoilerBody(spoilersBlock) {
        const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
        if (spoilerActiveTitle) {
            spoilerActiveTitle.classList.remove('_active');
            _slideUp(spoilerActiveTitle.nextElementSibling, 500);
        }
    }
}

let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
};

let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
};

let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}; */



