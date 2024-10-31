window.customElements.define(
	'newsletter-select',
	class NewsletterSelect extends HTMLElement {
		static formAssociated = true;

		constructor() {
			super();
			this.internals = this.attachInternals();
		}

		connectedCallback() {
			this.setAttribute('name', 'newsLetters');
			const NewsletterData = (window.data =
				(window && window.data) || {});
			const shadow = (this.attachShadow({ mode: 'open' }).innerHTML = `
				<input id='nl-select' class='select' type='checkbox' checked value='${newsletterData.newsletterId}' />
				<label class='nl-select-label' for='nl-select'>${newsletterData.newsletterName}</label>`);
			this.internals.setFormValue([
				newsletterData.newsletterId,
			]);
			const style = document.createElement('style');
			style.textContent = `
				:host {
					display: flex;
					align-items: flex-start;
					flex-basis: 100%;
					margin-bottom: 20px;
				}
				@media(min-width: 992px) {
					:host {
						justify-content: center;
					}
				}
				#nl-select {
					width: 23px;
					height: 23px;
					margin-right: 8px;
					accent-color: var(--brand-primary);
				}
				@media(min-width: 992px) {
					.nl-select-label {
						font-size: 18px;
						font-weight: 500;
					}
				}
			`;
			this.shadowRoot.appendChild(style);
			const input = this.shadowRoot.querySelector('input');
			input.addEventListener('change', () => {
				const errorDiv =
					this.internals.form.querySelector('.error-message');
				if (input.checked) {
					input.setAttribute('checked', 'checked');
					input.value = newsletterData.newsletterId;
					this.internals.setFormValue(input.value);
					errorDiv.innerHTML = '';
					errorDiv.style.display = 'none';
					this.internals.setValidity({});
				} else {
					input.removeAttribute('checked');
					input.value = '';
					this.internals.setFormValue('');
					errorDiv.innerHTML = 'Select a newsletter';
					errorDiv.style.display = 'block';
					this.internals.setValidity(
						{ valueMissing: true },
						' ',
						input,
					);
				}
			});
		}
	},
);
