const originalAddEventListener = window['Element'].prototype.addEventListener;
const originalDefine = window.customElements.define;

window['Element'].prototype.addEventListener = function(name, listener, options) {
	originalAddEventListener.call(this, name, listener, options);
	if (name === 'slotchange') {
		setTimeout(() => {
			const rootNode = this.getRootNode();
			if (rootNode && rootNode.mode) {
				rootNode['__slotChangeListeners'] = rootNode['__slotChangeListeners'] || [];
				rootNode['__slotChangeListeners'].push(listener);
			}
		});
	}
};

window.customElements.define = function(name, componentClass) {
	const originalConnectedCallback = componentClass.prototype.connectedCallback;
	const originalDisconnectedCallback = componentClass.prototype.disconnectedCallback;

	componentClass.prototype.connectedCallback = function() {
		this.__slotchangeTimeout = null;
		this.__slotchangeObserver = new MutationObserver(() => {
			clearTimeout(this.__slotchangeTimeout);

			this.__slotchangeTimeout = setTimeout(() => {
				if (this.shadowRoot && this.shadowRoot['__slotChangeListeners']) {
					const slotchangeListeners = this.shadowRoot['__slotChangeListeners'];

					for (const listener of slotchangeListeners) {
						listener(
							new CustomEvent('slotchange', {
								bubbles: true,
								composed: true
							})
						);
					}
				}
			}, 1);
		});

		this.__slotchangeObserver.observe(this, { attributes: false, childList: true, subtree: true });

		if (originalConnectedCallback) {
			originalConnectedCallback.call(this);
		}
	};

	componentClass.prototype.disconnectedCallback = function() {
		this.__slotchangeObserver.disconnect();
		if (originalDisconnectedCallback) {
			originalDisconnectedCallback.call(this);
		}
	};

	originalDefine.call(this, name, componentClass);
};
