<template>
	<article
		class="message is-danger"
		v-if="errors.length"
	>
		<div class="message-body is-">
			<div v-if="typeof errors !== 'string'">
				<p
					v-for="error in errors"
					:key="error.origin">
					<strong>{{ error.param.toUpperCase() }} </strong> - {{ error.msg }}
				</p>
			</div>
			<p v-else>
				{{ errors }}
			</p>
		</div>
	</article>
</template>

<script>
export default {
	props: {
		errors: {
			type: Array || String,
			default: () => [],
		},
	},
};
</script>

<style scoped lang="scss">
.message-body {
	text-align: left;
}
</style>
