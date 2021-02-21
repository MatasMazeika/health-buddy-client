import { ref, watch } from 'vue';

export const useTextArea = () => {
	const myTextArea = ref([]);
	const content = ref('');

	watch(() => {
		if (content.value.length === 0) return;
		myTextArea.value.rows = 1; // depends on what you want initially
		const styles = window.getComputedStyle(myTextArea.value);
		const paddingTop = parseInt(styles.paddingTop, 10);
		const paddingBottom = parseInt(styles.paddingBottom, 10);
		const padding = paddingTop + paddingBottom;
		const currentHeight = parseInt(styles.height, 10) - padding;
		const initialHeight = (parseInt(styles.height, 10) - padding) / myTextArea.value.rows;
		const scrollHeight = myTextArea.value.scrollHeight - padding;
		const newRows = Math.ceil(scrollHeight / initialHeight);
		myTextArea.value.rows = newRows;
	});

	return { myTextArea, content };
};
