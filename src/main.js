import { ImageSearch } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// DOM Elements
const { form, search, loader, loadButton, gallery } = querySelectors({
	form: 'form',
	search: '.search_bar',
	loader: '.loader',
	loadButton: '.load',
	gallery: '.gallery',
});

// API Configuration
const config = {
	source: 'https://pixabay.com/api/?',
	options: new URLSearchParams({
		key: '46749030-b6cef6a6b69e043ecf4444c1b',
		image_type: 'photo',
		orientation: 'horizontal',
		per_page: 12,
	}),
};

// Messages
const messages = {
	noMatchError:
		'Sorry, there are no images matching your search query. Please try again!',
	collectionEndMessage:
		"We're sorry, but you've reached the end of search results.",
};

// Global Variables
let page;

// Event Listeners
form.addEventListener('submit', handleFormSubmit);
loadButton.addEventListener('click', handleLoadMore);

// Main Functions
function handleFormSubmit(event) {
	event.preventDefault();
	const searchValue = getSearchValue();
	if (!searchValue) return;

	showLoadBtn(false);
	resetGallery();
	showLoader(true);
	initializeSearch(searchValue);
}

function initializeSearch(searchValue) {
	config.options.set('page', page);
	config.options.set('q', searchValue);
	performSearch();
}

function handleLoadMore() {
	showLoader(true);
	incrementPage();
	performSearch();
	setTimeout(scrollToNextImages, 800);
}

function performSearch() {
	ImageSearch(config.source, config.options)
		.then(posts => handleImageSearch(posts))
		.catch(error => {
			console.error('API Error:', error);
			raiseError(
				error.message || 'An unexpected error occurred. Please try again.'
			);
		})
		.finally(() => {
			showLoader(false);
			resetSearch();
		});
}

// Smooth Scroll Function
function scrollToNextImages() {
	const galleryCard = document.querySelector('.gallery .gallery_item');
	if (galleryCard) {
		const cardHeight = galleryCard.getBoundingClientRect().height;
		window.scrollBy({
			top: cardHeight * 2 + 20,
			left: 0,
			behavior: 'smooth',
		});
	}
}

// Helper Functions
function handleImageSearch(posts) {
	if (posts.total) {
		renderGallery(posts.hits);
		showLoadBtn(true);
		checkIfEndOfResults(posts.total);
	} else {
		raiseError(messages.noMatchError);
	}
}

function checkIfEndOfResults(totalResults) {
	const currentItemsCount =
		parseInt(config.options.get('per_page')) *
		parseInt(config.options.get('page'));
	if (currentItemsCount > totalResults) {
		hideLoadButton();
		raiseInfo(messages.collectionEndMessage);
	}
}

function getSearchValue() {
	return search.value.trim();
}

function resetGallery() {
	page = 1;
	gallery.innerHTML = '';
}

function resetSearch() {
	search.value = '';
}

function showLoader(isVisible) {
	loader.style.display = isVisible ? 'block' : 'none';
}

function showLoadBtn(isVisible) {
	loadButton.style.display = isVisible ? 'block' : 'none';
}

function incrementPage() {
	config.options.set('page', ++page);
}

function hideLoadButton() {
	loadButton.style.display = 'none';
}

// Function to query DOM elements
function querySelectors(selectors) {
	const elements = {};
	Object.entries(selectors).forEach(([key, selector]) => {
		elements[key] = document.querySelector(selector);
	});
	return elements;
}

// Toast Notification Functions
function raiseError(error) {
	iziToast.error({
		message: error,
		position: 'topRight',
		color: 'red',
		theme: 'dark',
	});
}

function raiseInfo(info) {
	iziToast.info({
		message: info,
		position: 'topRight',
		color: 'blue',
		theme: 'dark',
	});
}