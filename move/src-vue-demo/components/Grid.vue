<template>
	<div id="grid" :style="{width: `${containerWidth}px`}">
		<div v-for="(column, index) in columns" ref="lists" class="grid-column" :style="{width: `${columnWidth}px`, marginRight: `${imgMargin}px`}">
			<figure v-for="image in column" class="loaded" :style="{marginBottom: `${imgMargin}px`}">
					<img :src="image.webp">
			</figure>
		</div>
	</div>
</template>


<script>
  export default {
    name: 'grid',
    data() {
      return {
        margin: 48,
        imgWidth: 300,
        imgMargin: 24,
        outerWidth: 0,
        containerWidth: 0,
        columnCount: 0,
        columnWidth: 0,
        windowWidth: window.innerWidth,
        url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC',
        columns: [],
      }
    },
    methods: {
      setColumns() {
        /**
        * calculate the maximum columns we can set
        * based on grid margin and image settings (width and margin)
        */
        const maxW = this.windowWidth - this.margin;
        // avoid columns being zero
        const newColumns = Math.floor(maxW / this.outerWidth) || 1;
        // reset grid only if there is more/less space for one column
        if (this.columnCount !== newColumns) {
          this.columnCount = newColumns;
          this.columnWidth = newColumns === 1 ? this.imgWidth * 2 : this.imgWidth;
          // handle mobile: 1 column
          const w = newColumns === 1 ? this.outerWidth * 2 : this.outerWidth;
          this.containerWidth = newColumns === 1 ? this.imgWidth * 2 : (newColumns * w) - this.imgMargin;

          this.columns = [];
          this.updateImageArr();
        }
      },

      updateImageArr() {
        let i = this.columnCount;

        while (i-- !== 0) {
          const emptyArr = [];
          this.columns.push(emptyArr);
        }

        this.images.forEach((image, j) => {
          const target = image.images.original;
          const imageObj = {
            url: target.url,
            webp: target.webp,
            width: target.width,
            height: target.height,
          }
          const columnIndex = j % this.columnCount;
          this.columns[columnIndex].push(imageObj);
        });
      },

      getImages() {
        fetch(this.url)
          .then(blob => blob.json())
          .then(data => {
            this.images = data.data;
            this.setColumns();
          });
      },

      handleResize() {
        this.windowWidth = window.innerWidth;
        this.setColumns();
      }
    },
    created: function() {
      this.outerWidth = this.imgWidth + this.imgMargin;
      window.addEventListener('resize', this.handleResize);
      this.getImages();
    },
    beforeDestroy: function() {
      window.removeEventListener('resize', this.handleResize)
    },
}
</script>



<style lang="scss">
	$c-background: #E8E8E8;

	#grid {
		display: flex;
		margin: 0 auto;
		max-width: 100%;
	}

  #grid .grid-column {
    list-style: none;
  }

	#grid .grid-column:last-child {
		margin-right: 0 !important;
	}

	#grid .grid-column figure {
		background-color: $c-background;
	}

	#grid .grid-column figure.loaded {
		background-color: transparent;
		box-shadow: none;
	}

	#grid .grid-column figure img {
		width: 100%;
		will-change: opacity;
		opacity: 0;
	}

	#grid .grid-column figure.loaded img {
		transition: opacity 200ms;
		opacity: 1;
	}
</style>
