customElements.define(
	"my-input",
	class extends HTMLElement {
		static formAssociated = true;
		static get observedAttributes() {
			return ["required", "value"];
		}

		private $input: HTMLInputElement;
		private _attrs = {};
		private _internals: ElementInternals;
		private _defaultValue = "";

		constructor() {
			super();
			this._internals = this.attachInternals();
			this._internals.role = "textbox";
			this.tabindex = 0;
		}

		connectedCallback() {
			const shadowRoot = (this.attachShadow({
				mode: "open",
				delegatesFocus: true
			}).innerHTML = `<input type="text" role="none" tabindex="-1" />`);
			this.$input = this.shadowRoot.querySelector("input");
			this.setProps();
			this._defaultValue = this.$input.value;
			this._internals.setFormValue(this.value);
			this._internals.setValidity(
				this.$input.validity,
				this.$input.validationMessage,
				this.$input
			);
			this.$input.addEventListener("input", () => this.handleInput());
		}

		attributeChangedCallback(name, prev, next) {
			this._attrs[name] = next;
		}

		formDisabledCallback(disabled: boolean) {
			this.$input.disabled = disabled;
		}

		formResetCallback() {
			this.$input.value = this._defaultValue;
		}

		public checkValidity(): boolean {
			return this._internals.checkValidity();
		}

		public reportValidity(): void {
			return this._internals.reportValidity();
		}

		public get validity(): ValidityState {
			return this._internals.validity;
		}

		public get validationMessage(): string {
			return this._internals.validationMessage;
		}

		private setProps() {
			// prevent any errors in case the input isn't set
			if (!this.$input) {
				return;
			}

			// loop over the properties and apply them to the input
			for (let prop in this._attrs) {
				switch (prop) {
					case "value":
						this.$input.value = this._attrs[prop];
						break;
					case "required":
						const required = this._attrs[prop];
						this.$input.toggleAttribute(
							"required",
							required === "true" || required === ""
						);
						break;
				}
			}

			// reset the attributes to prevent unwanted changes later
			this._attrs = {};
		}

		private handleInput() {
			this._internals.setValidity(
				this.$input.validity,
				this.$input.validationMessage,
				this.$input
			);
			this._internals.setFormValue(this.value);
		}
	}
);

const form = document.getElementById("my-form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(e.target);
	console.log(`My Input Value - '${formData.get("myInput")}'`);
});
