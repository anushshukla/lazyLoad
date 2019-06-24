function debounce(func, wait) {
	var timeout;
	return function() {
        var context = this;
        var args = arguments;
        if (timeout) {
            clearTimeout(timeout);
        }
        var later = function () {
            func.apply(context, args);
        };
        timeout = setTimeout(later, wait);
	};
};

function getCurrentDistanceFromTop(element) {
    return element.getBoundingClientRect().top;
}

function canLazyLoad(element, threshold, scrolledElement) {
    return scrolledElement.scrollHeight - scrolledElement.scrollTop - getCurrentDistanceFromTop(element) <= threshold;
}

function lazyLoad(element, scrolledElement) {
    var threshold = 100;
    if (canLazyLoad(element, threshold, scrolledElement)) {
        var clone = document.importNode(element.children[0].content, true);
        element.appendChild(clone);
        element.removeAttribute("class");
    }
}

function onScroll(event, scrolledElement) {
    var template = document.querySelector('.lazy-load');
    if (template) {
        return lazyLoad(template, scrolledElement);
    }
}

var debouncedOnScroll = debounce(onScroll, 100);

document.addEventListener('scroll', function (event) {
    scrolledElement = event.target;
    if (!scrolledElement.tagName) {
        scrolledElement = scrolledElement.body;
    }
    debouncedOnScroll(event, scrolledElement);
}, true);