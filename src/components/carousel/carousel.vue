<template>
	<div class="carousels-wrapper" ref="container">
		<ul tag="ul" class="carousel-list" :style="{ height: ratio ? `${containerWidth * ratio}px` : '260px' }">
			<li class="carousel-item" :key="item.id" v-for="(item, index) in currentItems"
				:style="{ transform: `translateX(${(items.length > 1 ? index - 1 : 0) * containerWidth}px)` }">
				<img :class="['carousel-picture', item.link ? 'pointer' : '']"
					:src="item.picture" @click="handleClick(item)">
			</li>
		</ul>

		<ul class="indicators" v-if="indicators && items.length > 1">
			<li :class="['indicator', index === currentIndex ? 'active' : '']"
				:key="item.id || index" v-for="(item, index) in items"></li>
		</ul>

		<div class="control left-control" @click="prev" v-if="items.length > 1">
			<div class="bg-sprites icon-prev"></div>
		</div>

		<div class="control right-control" @click="next" v-if="items.length > 1">
			<div class="bg-sprites icon-next"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'carousel',
	props: {
		items: {
			type: Array,
			default: () => ([]),
		},
		autoplay: {
			type: Boolean,
			default: false,
		},
		duration: {
			type: Number,
			default: 3,
		},
		indicators: {
			type: Boolean,
			default: true,
		},
		controls: {
			type: Boolean,
			default: false,
		},
		ratio: {
			type: Number,
		},
	},
	data() {
		return {
			currentItems: [],
			currentIndex: 0,
			containerWidth: 0,
		};
	},
	mounted() {
		this.reset();
		this.init();
		window.addEventListener('resize', this.reset);
	},
	watch: {
		'items': 'init',
	},
	methods: {
		init() {
			if (Array.isArray(this.items)) {
				this.currentItems = this.items.slice();
				this.currentItems.unshift(this.currentItems.pop());
			}
		},
		reset() {
			this.containerWidth = this.$refs.container.clientWidth;
			this.clear();
			this.scroll();
		},
		scroll() {
			if (this.autoplay) {
				this.timer = setTimeout(() =>{
					this.slide(false);
					this.scroll();
				}, this.duration * 1000);
			}
		},
		prev() {
			this.slide(true);
			this.clear();
			this.scroll();
		},
		next() {
			this.slide(false);
			this.clear();
			this.scroll();
		},
		slide(reversed) {
			const item = reversed ? this.currentItems.pop() : this.currentItems.shift();
			this.currentItems = reversed ? [item].concat(this.currentItems) : this.currentItems.concat(item);

			this.currentIndex = this.currentIndex + (reversed ? -1 : 1);
			if (this.currentIndex < 0) this.currentIndex = this.items.length - 1;
			if (this.currentIndex >= this.items.length) this.currentIndex = 0;
		},
		clear() {
			if (this.timer) clearTimeout(this.timer);
		},
		handleClick(item) {
			if (item.link) {
				if (/^\/settings/.test(item.link)) {
					this.$router.push(item.link);
				} else if (/\/\//.test(item.link)) {
					window.open(item.link)
				} else {
					window.open('//' + item.link);
				}
			}
		},
	},
	beforeDestroy() {
		this.clear();
		window.removeEventListener('resize', this.reset);
	},
};
</script>

<style lang="less" scoped>
.carousels-wrapper {
	position: relative;

	&:hover {
		.control {
			display: block;
		}
	}
	.control {
		position: absolute;
		display: none;
		width: 48px;
		height: 48px;
		top: 50%;
		transform: translateY(-50%);
		background-color: rgba(51, 51, 51, .9);
		cursor: pointer;
		z-index: 10;

		&.left-control { left: -6px; }
		&.right-control { right: -6px; }
		.icon-prev,
		.icon-next {
			position: absolute;
			top: 14px;
			left: 14px;
			width: 20px;
			height: 20px;
		}
		.icon-prev { background-position: -53px -330px; }
		.icon-next { background-position: -80px -330px; }
	}
	.indicators {
		position: absolute;
		height: 20px;
		left: 50%;
		bottom: 6px;

		.indicator {
			display: inline-block;
			width: 8px;
			height: 8px;
			border: solid 1px #dcdcdc;
			border-radius: 50%;
			margin: 5px;
			background-color: #fff;

			&.active { background-color: #008dfc; }
		}
	}
}
.carousel-list {
	position: relative;
	display: block;
	width: 100%;
	list-style: none;
	margin: 20px 0;
	overflow: hidden;

	.carousel-item {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		transition: transform .5s;

		.carousel-picture {
			display: block;
			margin: 0 auto;
			width: 100%;
			height: 100%;
			max-height: 100%;
			background-color: #f1f1f1;
		}
	}
}
</style>
