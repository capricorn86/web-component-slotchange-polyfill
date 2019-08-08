window['slotChangePolyfill'] = Object.assign({}, { force: false }, window['slotChangePolyfill']);

if (
	window.customElements['polyfillWrapFlushCallback'] ||
	window['ShadyDOM'] ||
	!window['HTMLElement'].prototype.attachShadow ||
	window['slotChangePolyfill'].force
) {
	require('./patch/SlotChangePatch');
}
