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

        columns = parseInt(columns);
        columns <= 0 ? columns = 1 : '';

        for (var i = 0; i < columns; i++) {
            var column = document.createElement('div');
            column.className = 'masonry-gallery-column';
            masonry.appendChild(column)
        }

        columnElements = masonry.querySelectorAll('.masonry-gallery-column');

        loadImages();

        function loadImages() {
            var img = new window.Image();
            img.src = imgSources[currentImg];
            insertImage(img);
            img.onload = imgLoadHandler.bind(this)
        }

        function insertImage(imgElement) {
            imgElement.className = 'vce-image-masonry-gallery-img';
            var customImageProps = {
                'alt': 'alt text',
                'title': 'title'
            };
            setAttributes(imgElement, customImageProps);
            var smallestColIndex = getSmallestColumn(columnElements);
            console.log(imgElement)
            columnElements[smallestColIndex].appendChild(imgElement)
        }

        function setAttributes(el, attrs) {
            for (var key in attrs) {
                el.setAttribute(key, attrs[key])
            }
        }

        function imgLoadHandler() {
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