<template>
	<div class="container p-6">
		<div class="tile is-ancestor">
			<div class="tile is-4 is-vertical is-parent">
				<div class="tile is-child box is-flex-grow-0 mb-6">
					<DailyCaloricIntake />
				</div>
				<div class="tile is-child is-flex-grow-0">
					<DatePicker
						v-model="date"
						:masks='{ input:["L", "YYYY-MM-DD", "YYYY/MM/DD"] }'/>
				</div>
			</div>
			<div class="tile is-parent">
				<div class="tile is-child box">
					<FoodTable/>
				</div>
			</div>
		</div>
		<div
			id="barcode-scanner"
			class="size">
			<video
				autoplay="true"
				preload="auto"></video>
		</div>
		<img :src="imgUrl"/>
	</div>
</template>

<script>
import Quagga from 'quagga';
import { ref, watch } from 'vue';
import { DatePicker } from 'v-calendar';
import { userDataStore } from '@/store/userDataStore';
import FoodTable from '@/views/dashboard/FoodTable.vue';
import DailyCaloricIntake from '@/views/dashboard/DailyCaloricIntake';
import { DateTime } from 'luxon';
import axios from 'axios';

export default {
	name: 'Dashboard',
	components: {
		FoodTable, DatePicker, DailyCaloricIntake,
	},
	data() {
		return {
			hasDetected: false,
			code: null,
			imgUrl: null,
		};
	},
	setup() {
		const {
			getUserFood,
			isLoadingUserData,
		} = userDataStore();
		const date = ref(new Date());

		watch(date, (newDate, previousDate) => {
			const startDate = DateTime.fromJSDate(newDate).startOf('day');
			const endDate = DateTime.fromJSDate(newDate).endOf('day');
			getUserFood(startDate, endDate);
		});

		return {
			date,
			isLoadingUserData,
		};
	},
	mounted() {
		Quagga.init({
			inputStream: {
				name: 'Live',
				type: 'LiveStream',
				target: document.querySelector('#barcode-scanner'),
				constraints: {
					width: 520,
					height: 400,
					facingMode: 'user', // "environment" for back camera, "user" front camera
				},
			},
			decoder: {
				readers: ['ean_reader'],
			},

		}, (err) => {
			if (err) {
				return;
			}

			Quagga.start();

			Quagga.onDetected((result) => {
				if (!this.hasDetected) {
					axios.get(
						`https://world.openfoodfacts.org/api/v0/product/${result.codeResult.code}.json`,
					).then((resultt) => {
						if (resultt.data.status !== 0) {
							this.hasDetected = true;
						}

						// eslint-disable-next-line camelcase
						this.imgUrl = resultt?.data?.product?.image_front_url;
					});
				}
			});
		});
	},
};
</script>
