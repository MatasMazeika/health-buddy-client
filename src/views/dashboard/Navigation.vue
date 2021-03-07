<template>
	<nav
		class="navbar"
		role="navigation"
		aria-label="main navigation">
		<div class="navbar-brand">
			<a
				class="navbar-item"
				href="https://bulma.io">
			</a>

			<a
				role="button"
				class="navbar-burger"
				aria-label="menu"
				aria-expanded="false"
				data-target="navbarBasicExample">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div
			id="navbarBasicExample"
			class="navbar-menu">
			<div class="navbar-start">
				<router-link
					to="/dashboard/food"
					class="navbar-item"
				>Food
				</router-link>

				<router-link
					to="/dashboard/workout"
					class="navbar-item"
				>
					Workout
				</router-link>
				<router-link
					to="/dashboard/creator"
					class="navbar-item"
				>
					Meal & Workout creator
				</router-link>
				<router-link
					to="/dashboard/newsfeed"
					class="navbar-item"
				>
					Newsfeed
				</router-link>
			</div>

			<div class="navbar-end">
				<div
					class="navbar-item"
					@click="$router.push('/dashboard/settings')">
					<div class="is-flex is-align-items-center is-justify-content-center">
						<span class="tag is-primary is-medium">@{{ userDetails.username }} <i
							class="fas fa-user-cog ml-3"></i></span>
						<span class="icon is-small"></span>
						<figure class="image is-48x48">
							<img
								class="is-rounded img-max-height-fit"
								:src="userDetails.avatar"
							>
						</figure>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { userDataStore } from '@/store/userDataStore';

export default {
	setup() {
		const { userDetails } = userDataStore();

		return {
			userDetails,
		};
	},
};
</script>
