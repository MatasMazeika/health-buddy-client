<template>
	<div class="container p-6">
		<div class="card is-ancestor is-flex is-flex-direction-column has-text-left p-6 is-justify-content-center">
			<div class="is-flex is-justify-content-center mb-6">
				<div class="is-flex is-flex-direction-column is-align-items-center mr-6">
					<figure class="image is-128x128 is-block">
						<img
							class="is-rounded user-image"
							:src="userSettings.avatar"
						>
					</figure>
					<a @click="fileRef.click()">Change image</a>
					<input
						type="file"
						id="file"
						:ref="(el) => { fileRef = el }"
						style="display: none;"
						@change="addFile"
					/>
				</div>
				<div>
					<div class="field">
						<label class="label">Username</label>
						<div class="control has-icons-left has-icons-right">
							<input
								class="input"
								type="text"
								placeholder="Username"
								v-model.trim="userSettings.username"
							>
							<span class="icon is-small is-left"><i class="fas fa-user"></i></span>
						</div>
					</div>

					<div class="field">
						<label class="label">Email</label>
						<div class="control has-icons-left has-icons-right">
							<input
								class="input"
								type="email"
								placeholder="Email input"
								v-model.trim="userSettings.email">
							<span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
						</div>
					</div>

					<div class="field">
						<label class="label">New password</label>
						<div class="control has-icons-left has-icons-right">
							<input
								class="input"
								type="email"
								placeholder="New password"
								v-model.trim="userSettings.password">
							<span class="icon is-small is-left"><i class="fas fa-key"></i></span>
						</div>
					</div>

					<div class="field">
						<label class="label">Confirm new password</label>
						<div class="control has-icons-left has-icons-right">
							<input
								class="input"
								type="email"
								placeholder="Confirm new password"
								v-model.trim="userSettings.confirmPassword">
							<span class="icon is-small is-left"><i class="fas fa-key"></i></span>
						</div>
					</div>
				</div>
			</div>
			<ErrorAlert :errors="errors"/>
			<button
				class="button is-primary save-button"
				:class="{'is-loading': isLoadingSettingsSave}"
				@click="handleSettingsSave"
			>
				Save
			</button>
		</div>
	</div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { editUserDetailsApi, userStore } from '@/store/userStore';
import { userDataStore } from '@/store/userDataStore';
import { getErrorMessage } from '@/views/utils/errorHandler';
import ErrorAlert from '@/components/ErrorAlert.vue';
import { saveAuthToken } from '@/views/utils/tokens';

export default {
	name: 'UserSettings',
	components: { ErrorAlert },
	setup() {
		const { uploadUserImage } = userStore();
		const { userDetails } = userDataStore();
		const userSettings = ref({
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
			avatar: '',
		});
		const errors = ref([]);
		const isLoadingSettingsSave = ref(false);
		const fileRef = ref(null);
		const file = ref(null);

		const setIsLoadingSettingsSave = (value) => {
			isLoadingSettingsSave.value = value;
		};

		const addFile = async (event) => {
			userSettings.value.avatar = URL.createObjectURL(event.target.files[0]);
			// eslint-disable-next-line prefer-destructuring
			file.value = event.target.files[0];
		};

		const uploadFile = () => {
			const formData = new FormData();

			formData.append('file', file.value);

			return uploadUserImage(formData);
		};

		const handleSettingsSave = async () => {
			setIsLoadingSettingsSave(true);

			try {
				if (file.value !== null) {
					await uploadFile();
				}

				const { data } = await editUserDetailsApi({
					email: userSettings.value.email,
					username: userSettings.value.username,
					password: userSettings.value.password,
					confirmPassword: userSettings.value.confirmPassword,
				});

				saveAuthToken(data.token);
			} catch (error) {
				errors.value = getErrorMessage(error);
			} finally {
				setIsLoadingSettingsSave(false);
			}
		};

		console.log(userDetails);

		onMounted(() => {
			userSettings.value = {
				...userDetails.value,
			};
		});

		return {
			fileRef,
			file,
			userSettings,
			isLoadingSettingsSave,
			errors,
			handleSettingsSave,
			addFile,
		};
	},
};
</script>

<style scoped lang="scss">
.user-image {
	object-fit: cover;
	height: 100%;
}

.save-button {
	margin-left: auto;
}
</style>
