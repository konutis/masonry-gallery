(function () {
    var masonryContainer = document.querySelectorAll('.masonry-gallery');

    if (!masonryContainer.length) {
        return
    }

    masonryContainer.forEach(function (masonry) {
        var gap = masonry.getAttribute('data-masonry-gallery-gap');
        var columns = masonry.getAttribute('data-masonry-gallery-columns');
        var columnElements = '';
        var images = masonry.querySelectorAll('img');
        var currentImg = 0;
        var imgSources = [];

        if (!images.length) {
            return
        }

        images.forEach(function (image) {
            imgSources.push(image.src)
        });

        // delete images
        masonry.innerHTML = '';

        masonry.style.marginBottom = 0 - gap + 'px';

        columns = parseInt(columns);
        columns <= 0 ? columns = 1 : '';

        for (var i = 0; i < columns; i++) {
            var column = document.createElement('div');
            column.className = 'masonry-gallery-column';
            column.style.flexBasis = 'calc(100% /' + columns + ')';
            column.style.maxWidth = 'calc(100% /' + columns + ')';
            if (i !== columns - 1) {
                column.style.paddingRight = gap + 'px';
            }
            masonry.appendChild(column);
        }

        columnElements = masonry.querySelectorAll('.masonry-gallery-column');

        masonry.classList.add('masonry-gallery-loaded');
        loadImages();

        function loadImages() {
            var img = new window.Image();
            img.src = imgSources[currentImg];
            img.style.marginBottom = gap + 'px';
            insertImage(img);
            img.onload = imgLoadHandler.bind(this, img)
        }

        function insertImage(imgElement) {
            imgElement.className = 'masonry-gallery-img masonry-gallery-img-loading';
            var customImageProps = {
                'alt': 'alt text',
                'title': 'title'
            };
            setAttributes(imgElement, customImageProps);
            var smallestColIndex = getSmallestColumn(columnElements);
            columnElements[smallestColIndex].appendChild(imgElement)
        }

        function setAttributes(el, attrs) {
            for (var key in attrs) {
                el.setAttribute(key, attrs[key])
            }
        }

        function imgLoadHandler(imgElement) {
            imgElement.classList.remove('masonry-gallery-img-loading');
            imgElement.classList.add('masonry-gallery-img-loaded');
            currentImg++;
            if (currentImg < imgSources.length) {
                loadImages()
            }
        }

        function getSmallestColumn(cols) {
            var colHeight = [];
            cols.forEach(function (col) {
                colHeight.push(col.getBoundingClientRect().height)
            });
            return getSmallestFromArray(colHeight)
        }

        function getSmallestFromArray(arr) {
            var smallestIndex = 0;
            var smallest = arr[0];
            arr.forEach(function (height, index) {
                if (height < smallest
                ) {
                    smallest = arr[index];
                    smallestIndex = index
                }
            });
            return smallestIndex
        }
    })
})();